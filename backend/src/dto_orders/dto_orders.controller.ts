import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DtoOrdersService } from './dto_orders.service';
import { CreateDtoOrderDto } from './dto/create-dto_order.dto';
import { UpdateDtoOrderDto } from './dto/update-dto_order.dto';
import { AuthGuard } from 'src/authguards';

@Controller('dto-orders')
export class DtoOrdersController {
  constructor(private readonly dtoOrdersService: DtoOrdersService) {}
  
  @Post()
  create(@Body() createDtoOrderDto: CreateDtoOrderDto) {
    return this.dtoOrdersService.create(createDtoOrderDto);
  }
  
  @Get()
  // @UseGuards(AuthGuard)
  findAll() {
    return this.dtoOrdersService.findAll();
  }

  // @Get('orders-detail')
  // findAllOrderDetail() {
  //   return this.dtoOrdersService.ordersWithDetail();
  // }

  @Get('orders-detail-views')
  findAllOrderDetailViews() {
    return this.dtoOrdersService.orderWithDetailViews();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDtoOrderDto: UpdateDtoOrderDto,
  ) {
    return this.dtoOrdersService.update(+id, updateDtoOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoOrdersService.remove(+id);
  }
}
