import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { AddAdsDto } from './dto/AddAds.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  getAll() {
    return this.adsService.getAll();
  }

  @Get(':slug')
  getSingle(@Param('slug') slug: string) {
    return this.adsService.getSingle(slug);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  addAds(
    @Body() adsData: AddAdsDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    image: Express.Multer.File[],
  ) {
    return this.adsService.addAd(adsData, image);
  }

  @Delete('/:adId')
  deleteAd(@Param('adId') adId: string) {
    return this.adsService.deleteAd(adId);
  }
}
