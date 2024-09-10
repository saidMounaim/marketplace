import { Controller, Get } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  getAll() {
    return this.adsService.getAll();
  }
}
