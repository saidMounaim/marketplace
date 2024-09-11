import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { AddAdsDto } from './dto/AddAds.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Category } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  getAll(@Query('query') query: string, @Query('category') category: Category) {
    return this.adsService.getAll(query, category);
  }

  @Get(':slug')
  getSingle(@Param('slug') slug: string) {
    return this.adsService.getSingle(slug);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(JwtAuthGuard)
  addAds(
    @Body() adsData: AddAdsDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    image: Express.Multer.File[],
    @Req()
    req: any,
  ) {
    const userId = req.user.id;
    return this.adsService.addAd(adsData, image, userId);
  }

  @Delete('/:adId')
  deleteAd(@Param('adId') adId: string) {
    return this.adsService.deleteAd(adId);
  }
}
