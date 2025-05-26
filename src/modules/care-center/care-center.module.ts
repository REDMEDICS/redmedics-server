import { Module } from '@nestjs/common';
import { CareCenterService } from './care-center.service';
import { CareCenterController } from './care-center.controller';

@Module({
  controllers: [CareCenterController],
  providers: [CareCenterService],
})
export class CareCenterModule {}
