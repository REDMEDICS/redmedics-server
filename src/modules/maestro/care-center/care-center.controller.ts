import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CareCenterService } from './care-center.service';
import { CreateCareCenterDto } from './dto/create-care-center.dto';
import { UpdateCareCenterDto } from './dto/update-care-center.dto';
import { AccessAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { ExpressRequestWithJWT } from 'src';
import { RegisterCareCenterDto } from './dto/register-care-center.dto';
@UseGuards(AccessAuthGuard)
@Controller('care-center')
export class CareCenterController {
  constructor(private readonly careCenterService: CareCenterService) {}

  @Post('register')
  register(@Body() registerCareCenterDto: RegisterCareCenterDto, @Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.careCenterService.register(registerCareCenterDto, id);
  }

  @Post()
  create(@Body() createCareCenterDto: CreateCareCenterDto, @Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.careCenterService.create(createCareCenterDto, id);
  }

  @Get()
  findAll(@Req() req: ExpressRequestWithJWT) {
    const { id } = req.user;
    return this.careCenterService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careCenterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareCenterDto: UpdateCareCenterDto, @Req() req: ExpressRequestWithJWT) {
   
    return this.careCenterService.update(id, updateCareCenterDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careCenterService.remove(+id);
  }
}
