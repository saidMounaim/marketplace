"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("slugify");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let AdsService = class AdsService {
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async getAll(query, category) {
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
                userId: true,
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
    async getSingle(slug) {
        const ad = await this.prisma.ads.findUnique({
            where: { slug },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                category: true,
                contact: true,
                user: {
                    select: {
                        email: true,
                    },
                },
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
            throw new common_1.BadRequestException('Ad not found');
        }
        return ad;
    }
    async addAd(adsData, images, userId) {
        let slug = (0, slugify_1.default)(adsData.title, {
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
        let imageUrls = [];
        if (images && images.length > 0) {
            for (const image of images) {
                try {
                    const uploadResult = await this.cloudinaryService.uploadImage(image);
                    imageUrls.push(uploadResult.url);
                }
                catch (error) {
                    throw new common_1.HttpException(`Error uploading image: ${error.message}`, 401);
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
    async deleteAd(adId) {
        const ad = await this.prisma.ads.findUnique({ where: { id: adId } });
        if (!ad) {
            throw new common_1.BadRequestException('Ad not found');
        }
        await this.prisma.ads.delete({ where: { id: adId } });
        return { message: 'Ad deleted successfully' };
    }
};
exports.AdsService = AdsService;
exports.AdsService = AdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], AdsService);
//# sourceMappingURL=ads.service.js.map