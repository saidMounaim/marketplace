import { AdsService } from './ads.service';
import { AddAdsDto } from './dto/AddAds.dto';
import { Category } from '@prisma/client';
export declare class AdsController {
    private adsService;
    constructor(adsService: AdsService);
    getAll(query: string, category: Category): Promise<{
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
    addAds(adsData: AddAdsDto, image: Express.Multer.File[]): Promise<{
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
