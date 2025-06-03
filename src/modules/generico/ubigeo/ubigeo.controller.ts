import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { CreateUbigeoDto } from './dto/create-ubigeo.dto';
import { AccessAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { ApiQuery } from '@nestjs/swagger';
@UseGuards(AccessAuthGuard)
@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) { }

  @Post()
  create(@Body() createUbigeoDto: CreateUbigeoDto) {
    return this.ubigeoService.create(createUbigeoDto);
  }

  @Get()
  @ApiQuery({ name: 'department', required: false })
  @ApiQuery({ name: 'province', required: false })
  findAll(@Query() { department, province }) {
    return this.ubigeoService.findAll({ department, province });
  }

  @Get('search')
  async search(@Query('q') query: string, @Query('limit') limit: number) {
    return this.ubigeoService.searchAll(query, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubigeoService.findOne(id);
  }

}
