import { Module } from '@nestjs/common';
import { product_category } from 'models';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductcategoryController } from './productcategory.controller';
import { ProductcategoryService } from './productcategory.service';

@Module({
  imports: [SequelizeModule.forFeature([product_category])],
  controllers: [ProductcategoryController],
  providers: [ProductcategoryService],
})
export class ProductcategoryModule {}
