import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramacionPersonalService } from './programacion-personal.service';
import { CreateProgramacionPersonalDto } from './dto/create-programacion-personal.dto';
import { UpdateProgramacionPersonalDto } from './dto/update-programacion-personal.dto';

@Controller('programacion-personal')
export class ProgramacionPersonalController {
  constructor(private readonly programacionPersonalService: ProgramacionPersonalService) {}

  @Post()
  create(@Body() createProgramacionPersonalDto: CreateProgramacionPersonalDto) {
    return this.programacionPersonalService.create(createProgramacionPersonalDto);
  }

  @Get()
  findAll() {
    return this.programacionPersonalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programacionPersonalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramacionPersonalDto: UpdateProgramacionPersonalDto) {
    return this.programacionPersonalService.update(+id, updateProgramacionPersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programacionPersonalService.remove(+id);
  }
}
