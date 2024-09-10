import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';

@Module({
  providers: [AdsService],
  controllers: [AdsController]
})
export class AdsModule {}
