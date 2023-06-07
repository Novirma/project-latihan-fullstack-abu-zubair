import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer } from 'models';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [SequelizeModule.forFeature([customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
