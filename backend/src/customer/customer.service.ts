import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getAll(): string {
    return 'Hello World Service';
  }
}
