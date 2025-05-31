import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { PermissionService } from './permission.service';
import { AccessAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permission')
@UseGuards(AccessAuthGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() permissionDto: CreatePermissionDto) {
    return this.permissionService.create(permissionDto);
  }

  @Post('/insert')
  seedPermissions() {
    this.permissionService.generateAndInsertPermissions();
    return 'Permisos generados correctamente';
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() permissionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, permissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
