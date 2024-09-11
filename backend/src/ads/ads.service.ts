import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAdsDto } from './dto/AddAds.dto';
import slugify from 'slugify';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from '@prisma/client';

@Injectable()
export class AdsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll(query?: string, category?: Category) {
    const ads = await this.prisma.ads.findMany({
      where: {
        OR: query
          ? [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ]
          : undefined,
        category: category ? category : undefined,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        price: true,
        contact: true,
        category: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
    return ads;
  }

  async getSingle(slug: string) {
    const ad = await this.prisma.ads.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        contact: true,
        createdAt: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!ad) {
      throw new BadRequestException('Ad not found');
    }

    return ad;
  }

  async addAd(
    adsData: AddAdsDto,
    images: Express.Multer.File[],
    userId: string,
  ) {
    let slug = slugify(adsData.title, {
      lower: true,
      strict: true,
    });

    let slugExists = await this.prisma.ads.findUnique({ where: { slug } });
    let count = 1;

    while (slugExists) {
      slug = `${slug}-${count}`;
      count++;
      slugExists = await this.prisma.ads.findUnique({ where: { slug } });
    }

    let imageUrls: string[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        try {
          const uploadResult = await this.cloudinaryService.uploadImage(image);
          imageUrls.push(uploadResult.url);
        } catch (error) {
          throw new HttpException(
            `Error uploading image: ${error.message}`,
            401,
          );
        }
      }
    }

    const adWithSlug = {
      ...adsData,
      slug,
      price: Number(adsData.price),
      userId,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
    };

    return await this.prisma.ads.create({ data: adWithSlug });
  }

  async deleteAd(adId: string) {
    const ad = await this.prisma.ads.findUnique({ where: { id: adId } });

    if (!ad) {
      throw new BadRequestException('Ad not found');
    }

    await this.prisma.ads.delete({ where: { id: adId } });

    return { message: 'Ad deleted successfully' };
  }
}
