import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello1();
  }

  @Get('hello2')
  getHello2(): string {
    return this.appService.getHello2();
  }
}
