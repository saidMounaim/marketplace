import { PrismaService } from 'src/prisma/prisma.service';
import { AddAdsDto } from './dto/AddAds.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from '@prisma/client';
export declare class AdsService {
    private readonly prisma;
    private cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    getAll(query?: string, category?: Category): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        userId: string;
        images: {
            id: string;
            url: string;
        }[];
    }[]>;
    getSingle(slug: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        createdAt: Date;
        images: {
            id: string;
            url: string;
        }[];
        user: {
            email: string;
        };
    }>;
    addAd(adsData: AddAdsDto, images: Express.Multer.File[], userId: string): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    deleteAd(adId: string): Promise<{
        message: string;
    }>;
}
