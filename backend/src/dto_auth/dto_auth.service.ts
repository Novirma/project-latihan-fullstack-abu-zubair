import { Injectable } from '@nestjs/common';
import { CreateDtoAuthDto } from './dto/create-dto_auth.dto';
import { UpdateDtoAuthDto } from './dto/update-dto_auth.dto';
import { DtoUserService } from 'src/dto_user/dto_user.service';
import { users } from 'models';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const messageHelper = (result:any, status:any, message:any, expire:any) => {
  return {
    result: result,
    status: status,
    message: message,
    expire: expire

  };
};

@Injectable()
export class DtoAuthService {
  constructor(private usersService: DtoUserService) {}

  async validateUser(dataBody: any): Promise<any> {
    try {
      const user = await users.findOne({
        where: {
          username: dataBody.username,
        },
      });
      if (user === null) throw new Error('User Tidak ditemukan');
      const matchPassword = await bcrypt.compare(
        dataBody.password,
        user.password,
      );
      if (matchPassword) {
        const expiresIn = "10s";

        const accessToken = jwt.sign(
          { username: user.username ,roles:user.roles},
          process.env.ACCESS_TOKEN_RAHASIA,
          {
            expiresIn,
          },
        );

        return messageHelper(accessToken, 200, 'Selamat Telah Berhasil Login',expiresIn);
      } else {
        throw new Error('Password Salah Bro!!');
      }
    } catch (error) {
      return error.message;
    }
  }

  create(createDtoAuthDto: CreateDtoAuthDto) {
    return 'This action adds a new dtoAuth';
  }

  findAll() {
    return `This action returns all dtoAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dtoAuth`;
  }

  update(id: number, updateDtoAuthDto: UpdateDtoAuthDto) {
    return `This action updates a #${id} dtoAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} dtoAuth`;
  }
}
