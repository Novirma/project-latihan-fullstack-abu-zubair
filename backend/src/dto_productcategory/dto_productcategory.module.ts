import { Module } from '@nestjs/common';
import { DtoProductcategoryService } from './dto_productcategory.service';
import { DtoProductcategoryController } from './dto_productcategory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product, product_category } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([product_category, product])],
  controllers: [DtoProductcategoryController],
  providers: [DtoProductcategoryService],
})
export class DtoProductcategoryModule {}
