import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoUserService } from './dto_user.service';
import { CreateDtoUserDto } from './dto/create-dto_user.dto';
import { UpdateDtoUserDto } from './dto/update-dto_user.dto';
import { Roles } from 'src/auth/metaData';

@Controller('dto-user')
export class DtoUserController {
  constructor(private readonly dtoUserService: DtoUserService) {}

  @Post()
  create(@Body() createDtoUserDto: CreateDtoUserDto) {
    console.log(createDtoUserDto);
    
    return this.dtoUserService.create(createDtoUserDto);
  }

  @Get()
  findAll() {
    return this.dtoUserService.findAll();
  }

  @Get('users-customers')
  // @Roles('admin')
  findUsersCustomers() {
    return this.dtoUserService.getUsersCustomers();
  }

  @Get('users-customers-views')
  findUsersCustomersviews() {
    return this.dtoUserService.getUsersCustomersView();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDtoUserDto: UpdateDtoUserDto) {
    return this.dtoUserService.update(+id, updateDtoUserDto);
  }

  @Patch('updateUser/:id')
  updateUser(@Param('id') id: number, @Body() updateDtoUserDto: UpdateDtoUserDto){
    return this.dtoUserService.updateUserCustomer(updateDtoUserDto,id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoUserService.remove(+id);
  }
}
