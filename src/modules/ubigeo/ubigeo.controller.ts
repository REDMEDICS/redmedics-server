import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { CreateUbigeoDto } from './dto/create-ubigeo.dto';
import { UpdateUbigeoDto } from './dto/update-ubigeo.dto';

@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @Post()
  create(@Body() createUbigeoDto: CreateUbigeoDto) {
    return this.ubigeoService.create(createUbigeoDto);
  }

  @Get()
  findAll() {
    return this.ubigeoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubigeoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbigeoDto: UpdateUbigeoDto) {
    return this.ubigeoService.update(+id, updateUbigeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubigeoService.remove(+id);
  }
}
