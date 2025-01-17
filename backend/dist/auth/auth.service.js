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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (password && !bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
    async register(userInfo) {
        const user = await this.prisma.user.findUnique({
            where: { email: userInfo.email },
        });
        if (user) {
            throw new common_1.HttpException('User already exist', 401);
        }
        const hashedPassword = bcrypt.hashSync(userInfo.password, 10);
        const newUser = this.prisma.user.create({
            data: {
                ...userInfo,
                password: hashedPassword,
            },
        });
        return newUser;
    }
    async getLoggedInUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                ads: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        userId: true,
                        images: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map