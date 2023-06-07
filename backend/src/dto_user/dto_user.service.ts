import { Injectable } from '@nestjs/common';
import { CreateDtoUserDto } from './dto/create-dto_user.dto';
import { UpdateDtoUserDto } from './dto/update-dto_user.dto';
import * as bcrypt from 'bcrypt';
import { users } from 'models';
import { customer } from 'models';
// import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DtoUserService {
  constructor(private sequelize: Sequelize) {}
  async create(dataBody: CreateDtoUserDto) {
    let data: any = '';
    let data2: any = '';
    try {
      let salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(dataBody.password, salt);

      data = await users.create({
        username: dataBody.username,
        password: hashed,
        // roles: dataBody.roles
      });

      data2 = await customer.create({
        user_id: data.id,
        firstname: dataBody.firstname,
        lastname: dataBody.lastname,
      });

      return {
        status: 200,
        message:'data users berhasil dibuat'
      };

    } catch (error) {
      if (data) {
        users.destroy({
          where: {
            id: data.id,
          },
        });
      }
      return error.message;
    }
  }

  async findAll(): Promise<users[]> {
    try {
      const result = await users.findAll();

      return result;
    } catch (error) {
      return error;
    }
  }

  async getUsersCustomers(): Promise<any> {
    try {
      const result = await users.findAll({
        include: { model: customer },
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getUsersCustomersView(): Promise<any> {
    try {
      const query = `select * from viewSelectUsersCustomerwithid`;
      const result = await this.sequelize.query(query);
      return result; 
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.sequelize.query(`select users.id,users.username,users.password,customer.firstname,customer.lastname from users join customer on customer.user_id = users.id where users.id=${id}`)
      if (!result) throw new Error('Data Users Tidak Ada!!');
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, dataBody: UpdateDtoUserDto) {
    try {
      const idBody = await users.findByPk(id);
      if (!idBody) throw new Error('Data Users Tidak diTemukan!!');

      let salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(dataBody.password, salt);

      const update = await users.update(
        {
          username: dataBody.username,
          password: hashed,
        },
        {
          where: {
            id: idBody.id,
          },
        },
      );

      return 'sukses';
    } catch (error) {
      return error.message;
    }
  }

  async updateUserCustomer(dataBody: UpdateDtoUserDto, id: number): Promise<any>{
    try {
      const idBody = await users.findByPk(id)
      if (!idBody) throw new Error('Data Users Tidak diTemukan!!');

      let salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(dataBody.password, salt);

      const dataUsers = await users.update({
        username: dataBody.username,
        password: hashed,
        // roles: dataBody.roles
      },{
        where:{
          id:idBody.id
        }, returning: true
      })
      const dataCustomer = await customer.update({
        firstname: dataBody.firstname,
        lastname: dataBody.lastname
      },{
        where:{
          user_id: idBody.id
        },returning: true
      })

      return {status:200, message: 'data users berhasil diupdate'}

    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      const idBody = await users.findByPk(id);
      if (!idBody) throw new Error('Data Users Tidak diTemukan!!');
      const result = await users.destroy({
        where: {
          id: idBody.id,
        },
      });
      return {message: "Sukses Delete Data Users!"};
    } catch (error) {
      return error.message;
    }
  }
}
