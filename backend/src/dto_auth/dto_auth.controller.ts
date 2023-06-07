import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoAuthService } from './dto_auth.service';
import { CreateDtoAuthDto } from './dto/create-dto_auth.dto';
import { UpdateDtoAuthDto } from './dto/update-dto_auth.dto';
import { DtoUserService } from 'src/dto_user/dto_user.service';

@Controller('dto-auth')
export class DtoAuthController {
  constructor(private readonly dtoAuthService: DtoAuthService) {}

  @Post()
  create(@Body() createDtoAuthDto: CreateDtoAuthDto) {
    return this.dtoAuthService.create(createDtoAuthDto);
  }

  @Post('login')
  login(@Body() createDtoAuthDto: CreateDtoAuthDto) {
    return this.dtoAuthService.validateUser(createDtoAuthDto);
  }

  @Get()
  findAll() {
    return this.dtoAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoAuthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDtoAuthDto: UpdateDtoAuthDto) {
    return this.dtoAuthService.update(+id, updateDtoAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoAuthService.remove(+id);
  }
}
