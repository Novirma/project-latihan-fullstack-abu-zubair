import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductcategoryService } from './productcategory.service';

@Controller('productcategory')
export class ProductcategoryController {
  constructor(
    private readonly productcategoryService: ProductcategoryService,
  ) {}

  @Get()
  getAll(): any {
    return this.productcategoryService.getProductCategory();
  }

  @Get(':id')
  getPCById(@Param('id') id: any): any {
    return this.productcategoryService.getProductCategoryById(id);
  }

  @Post()
  insertProductCategory(@Body() dataBody: string): any {
    return this.productcategoryService.insertProductCategory(dataBody);
  }

  @Put(':id')
  updateProductCategory(
    @Param('id') id: number,
    @Body() dataBody: string,
  ): any {
    return this.productcategoryService.updateProductCategory(id, dataBody);
  }

  @Delete(':id')
  deleteProductCategory(
    @Param('id') id: number,
    @Body() dataBody: string,
  ): any {
    return this.productcategoryService.deleteProductCategory(id, dataBody);
  }
}
