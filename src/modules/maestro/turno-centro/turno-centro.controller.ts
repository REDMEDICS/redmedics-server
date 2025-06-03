import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurnoCentroService } from './turno-centro.service';
import { CreateTurnoCentroDto } from './dto/create-turno-centro.dto';
import { UpdateTurnoCentroDto } from './dto/update-turno-centro.dto';
import { FilterTurnosDto } from './dto/filter-turnos.dto';

@Controller('turno-centro')
export class TurnoCentroController {
  constructor(private readonly turnoCentroService: TurnoCentroService) {}

  @Post()
  create(@Body() createTurnoCentroDto: CreateTurnoCentroDto) {
    return this.turnoCentroService.create(createTurnoCentroDto);
  }

  @Get()
  findAll(@Query() filters: FilterTurnosDto) {
    return this.turnoCentroService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnoCentroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoCentroDto: UpdateTurnoCentroDto) {
    return this.turnoCentroService.update(+id, updateTurnoCentroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnoCentroService.remove(+id);
  }
}
