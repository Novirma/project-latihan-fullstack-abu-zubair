import { Injectable } from '@nestjs/common';
import { CreateDtoOrderDto } from './dto/create-dto_order.dto';
import { UpdateDtoOrderDto } from './dto/update-dto_order.dto';
import { orders } from 'models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DtoOrdersService {
  constructor(private sequelize: Sequelize) {}
  async create(dataBody: any) {
    try {
      const datas = dataBody;
      let totalproduct = 0;
      let totalprice = 0;
      let user_id = 0;
      datas.map((data) => {
        user_id = data.user_id;
        totalprice += data.quantity * data.price;
        totalproduct += data.quantity;
      });
      let dt = {
        user_id: user_id,
        totalproduct: totalproduct,
        totalprice: totalprice,
      };
      const paramdt = `[${JSON.stringify(dt)}]`;
      const paramdatas = `${JSON.stringify(datas)}`;
      const query = `CALL InsertOrderDetail ('${paramdt}' , '${paramdatas}')`;
      const result = await this.sequelize.query(query);

      return result;
    } catch (error) {
      return error.message;
    }
  }

  // async updateOrderWithDetail(dataBody: any) {
  //   try {
  //     const datas = dataBody;
  //     let totalproduct = 0;
  //     let totalprice = 0;
  //     let user_id = 0;
  //     datas.map((data) => {
  //       user_id = data.user_id;
  //       totalprice += dataBody.quantity * dataBody.price;
  //       totalproduct += dataBody.quantity;
  //     });
  //     let dt = {
  //       user_id: user_id,
  //       totalproduct: totalproduct,
  //       totalprice: totalprice,
  //     };
  //     const paramdt = `[${JSON.stringify(dt)}]`;
  //     const paramdatas = `${JSON.stringify(datas)}`;
  //     const query = `CALL InsertOrderDetail ('${paramdt}' , '${paramdatas}')`;
  //     const result = await this.sequelize.query(query);

  //     return result
  //   } catch (error) {
  //     return error.message
  //   }
  // }

  async findAll() {
    try {
      const result = await orders.findAll();

      return result;
    } catch (error) {}
  }

  // async ordersWithDetail() {
  //   try {
  //     const result = await orders.findAll({
  //       include:{model:order_detail}
  //     })
  //     return result
  //   } catch (error) {
  //     return error.message
  //   }
  // }

  async orderWithDetailViews() {
    try {
      const query = `select * from vieworderswithalldetail`;
      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number): string {
    return `This action returns a #${id} dtoOrder`;
  }

  update(id: number, updateDtoOrderDto: UpdateDtoOrderDto) {
    return `This action updates a #${id} dtoOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} dtoOrder`;
  }
}
