import { Injectable } from '@nestjs/common';
import { CreateDtoProductcategoryDto } from './dto/create-dto_productcategory.dto';
import { UpdateDtoProductcategoryDto } from './dto/update-dto_productcategory.dto';
import { product, product_category } from 'models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DtoProductcategoryService {
  constructor(private sequelize: Sequelize) {}

  async create(dataBody: CreateDtoProductcategoryDto) {
    try {
      const result = await product_category.create({
        name: dataBody.name,
        description: dataBody.description,
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<product_category[]> {
    try {
      const result = await product_category.findAll();

      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getProductCategoryWithChild(): Promise<any> {
    try {
      const result = await product_category.findAll({
        include: { model: product },
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getProductCategoryWithChildViews(): Promise<any> {
    try {
      const query = `select * from viewselectproductcategorywithchild`;
      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const result = await product_category.findByPk(id);
      // const result = await product_category.findOne({
      //     where:{
      //         id:id
      //     }
      // })
      if (result === null) throw new Error('Data Produk Category Tidak Ada!!');
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, dataBody: UpdateDtoProductcategoryDto) {
    try {
      const result = await product_category.update(
        {
          name: dataBody.name,
          description: dataBody.description,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );
      return `Sukses di update Boss`;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const data = await product_category.destroy({
        where: {
          id: id,
        },
      });
      return 'Sukses';
    } catch (error) {
      return error.message;
    }
  }
}
