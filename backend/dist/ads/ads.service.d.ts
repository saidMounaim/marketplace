import { PrismaService } from 'src/prisma/prisma.service';
import { AddAdsDto } from './dto/AddAds.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class AdsService {
    private readonly prisma;
    private cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    getAll(): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        images: {
            id: string;
            url: string;
        }[];
    }[]>;
    getSingle(slug: string): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addAd(adsData: AddAdsDto, images: Express.Multer.File[]): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        contact: string;
        category: import(".prisma/client").$Enums.Category;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAd(adId: string): Promise<{
        message: string;
    }>;
}
