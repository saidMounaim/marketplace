import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [PrismaModule, AdsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
