import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@ApiTags('Document Type')
@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Get()
  findAll() {
    return this.documentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentTypeService.findOne(id);
  }

  @Post()
  create(@Body() documentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.create(documentTypeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() documentTypeDto: UpdateDocumentTypeDto,
  ) {
    return this.documentTypeService.update(id, documentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentTypeService.remove(id);
  }
}
