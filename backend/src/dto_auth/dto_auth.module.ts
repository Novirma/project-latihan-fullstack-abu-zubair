import { Module } from '@nestjs/common';
import { DtoAuthService } from './dto_auth.service';
import { DtoAuthController } from './dto_auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer, users } from 'models';
import { DtoUserService } from 'src/dto_user/dto_user.service';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [DtoAuthController],
  providers: [DtoAuthService, DtoUserService],
})
export class DtoAuthModule {}
