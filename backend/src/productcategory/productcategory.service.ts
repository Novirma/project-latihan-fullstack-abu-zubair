import { Injectable } from '@nestjs/common';
import { product_category } from 'models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductcategoryService {
  constructor(private sequelize: Sequelize) {}

  async getProductCategory(): Promise<product_category[]> {
    try {
      const result = await product_category.findAll();

      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getProductCategoryById(id: any): Promise<any> {
    try {
      const result = await product_category.findByPk(id);
      // const result = await product_category.findOne({
      //     where:{
      //         id:id
      //     }
      // })
      if (result === null) throw new Error('Data Product Category Tidak Ada!!');
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async insertProductCategory(dataBody: any): Promise<any> {
    try {
      let result = await product_category.create({
        name: dataBody.name,
        description: dataBody.description,
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async updateProductCategory(id: number, dataBody: any): Promise<any> {
    try {
      const data = await product_category.update(
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
      return 'Sukses';
    } catch (error) {
      return error.message;
    }
  }

  async deleteProductCategory(id: number, dataBody: any): Promise<any> {
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
