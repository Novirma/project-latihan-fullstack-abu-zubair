import { Module } from '@nestjs/common';
import { DtoUserService } from './dto_user.service';
import { DtoUserController } from './dto_user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer, users } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([users, customer])],
  controllers: [DtoUserController],
  providers: [DtoUserService],
})
export class DtoUserModule {}
