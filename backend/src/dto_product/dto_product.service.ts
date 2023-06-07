import { Injectable } from '@nestjs/common';
import { CreateDtoProductDto } from './dto/create-dto_product.dto';
import { UpdateDtoProductDto } from './dto/update-dto_product.dto';
import { product } from 'models';
import { promises as fsPromises } from 'fs';
import { log } from 'console';

const messageHelper = (result:any, status:any, message:any) => {
  return {
    result: result,
    status: status,
    message: message,
  };
};

@Injectable()
export class DtoProductService {
  async create(dataBody: CreateDtoProductDto, file: any) {
    try {
      const result = await product.create({
        name: dataBody.name,
        description: dataBody.description,
        category_id: dataBody.category_id,
        price: dataBody.price,
        image_character: file.filename,
      });
      return {
        message:'sukses buat datanya'
      };
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await product.findAll();

      return messageHelper(result,200,"Data Sukses di ambil");
      // const ehe = {
      //   data:result,
      //   status: 200,
      //   mesagge: "yey"
      // }
      // return ehe;

    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await product.findByPk(id);
      if (!result) throw new Error('Data Produk Tidak diTemukan!')
      return result
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number,dataBody: UpdateDtoProductDto,file: any): Promise<any> {
    console.log(id, dataBody, file)
    try {
      const idBody = await product.findByPk(id);
      if (!idBody) throw new Error('Data Product Tidak DiTemukan!!');
      const path = './public/gambar/' + idBody.image_character;
      if (fsPromises.access(path)) {
        await fsPromises.unlink(path);
      }
      // console.log(dataBody,id);
      const data = await product.update(
        {
          name: dataBody.name,
          description: dataBody.description,
          category_id: dataBody.category_id,
          price: dataBody.price,
          image_character: file.filename,
        },
        {
          where: {
            id: idBody.id,
          },
        },
      );
      
      return {
        message:'sukses update'
      }
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) :Promise<any> {
    try {
     const idBody = await product.findByPk(id)
     if(!idBody) throw new Error('Data Product Tidak DiTemukan!')
     const path = './public/gambar/' + idBody.image_character;
      if (fsPromises.access(path)) {
        await fsPromises.unlink(path);
      }
    const data = await product.destroy({
      where:{
        id: idBody.id
      }
    })
    return `Data Product id ${idBody.id} Telah di hapus`
    } catch (error) {
      return error.message
    }
  }
}
