import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoProductcategoryService } from './dto_productcategory.service';
import { CreateDtoProductcategoryDto } from './dto/create-dto_productcategory.dto';
import { UpdateDtoProductcategoryDto } from './dto/update-dto_productcategory.dto';

@Controller('dto-productcategory')
export class DtoProductcategoryController {
  constructor(
    private readonly dtoProductcategoryService: DtoProductcategoryService,
  ) {}

  @Post()
  create(@Body() createDtoProductcategoryDto: CreateDtoProductcategoryDto) {
    return this.dtoProductcategoryService.create(createDtoProductcategoryDto);
  }

  @Get()
  findAll() {
    return this.dtoProductcategoryService.findAll();
  }

  @Get('all-product-category')
  findAllProductCategory() {
    return this.dtoProductcategoryService.getProductCategoryWithChild();
  }

  @Get('all-product-category-views')
  findAllProductCategoryViews() {
    return this.dtoProductcategoryService.getProductCategoryWithChildViews();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoProductcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDtoProductcategoryDto: UpdateDtoProductcategoryDto,
  ) {
    return this.dtoProductcategoryService.update(
      +id,
      updateDtoProductcategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoProductcategoryService.remove(+id);
  }
}
