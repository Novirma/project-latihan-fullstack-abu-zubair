import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello1(): string {
    return 'Hello World 1 2023';
  }

  getHello2(): string {
    return 'Hello World 2 2023';
  }
}
