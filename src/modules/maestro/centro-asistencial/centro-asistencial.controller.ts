import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CentroAsistencialService } from './centro-asistencial.service';
import { CreateCentroAsistencialDto } from './dto/create-centro-asistencial.dto';
import { UpdateCentroAsistencialDto } from './dto/update-centro-asistencial.dto';
import { RegisterCentroAsistencialDto } from './dto/register-centro-asistencial.dto';
import { ExpressRequestWithJWT } from 'src';
import { AccessAuthGuard } from '@common/guard';

@UseGuards(AccessAuthGuard)
@Controller('centro-asistencial')
export class CentroAsistencialController {
  constructor(private readonly centroAsistencialService: CentroAsistencialService) { }


  @Post('register')
  register(@Body() registerCareCenterDto: RegisterCentroAsistencialDto, @Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.centroAsistencialService.register(registerCareCenterDto, id);
  }

  @Post()
  create(@Body() createCentroAsistencialDto: CreateCentroAsistencialDto, @Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.centroAsistencialService.create(createCentroAsistencialDto, id);
  }

  @Get()
  findAll(@Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.centroAsistencialService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroAsistencialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCentroAsistencialDto: UpdateCentroAsistencialDto) {
    return this.centroAsistencialService.update(+id, updateCentroAsistencialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroAsistencialService.remove(+id);
  }
}
