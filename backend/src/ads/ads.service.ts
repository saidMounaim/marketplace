import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const ads = await this.prisma.ads.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
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
}
