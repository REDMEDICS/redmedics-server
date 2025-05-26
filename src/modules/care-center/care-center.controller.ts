import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CareCenterService } from './care-center.service';
import { CreateCareCenterDto } from './dto/create-care-center.dto';
import { UpdateCareCenterDto } from './dto/update-care-center.dto';

@Controller('care-center')
export class CareCenterController {
  constructor(private readonly careCenterService: CareCenterService) {}

  @Post()
  create(@Body() createCareCenterDto: CreateCareCenterDto) {
    return this.careCenterService.create(createCareCenterDto);
  }

  @Get()
  findAll() {
    return this.careCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careCenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareCenterDto: UpdateCareCenterDto) {
    return this.careCenterService.update(+id, updateCareCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careCenterService.remove(+id);
  }
}
