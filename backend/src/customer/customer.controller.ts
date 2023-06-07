import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly custService: CustomerService) {}

  @Get()
  getAll(): string {
    return this.custService.getAll();
  }
}
