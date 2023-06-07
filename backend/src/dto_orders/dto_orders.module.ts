import { Module } from '@nestjs/common';
import { DtoOrdersService } from './dto_orders.service';
import { DtoOrdersController } from './dto_orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_detail, orders } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders, order_detail])],
  controllers: [DtoOrdersController],
  providers: [DtoOrdersService],
})
export class DtoOrdersModule {}
