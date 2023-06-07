import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DtoProductService } from './dto_product.service';
import { CreateDtoProductDto } from './dto/create-dto_product.dto';
import { UpdateDtoProductDto } from './dto/update-dto_product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const storage = {
  storage: diskStorage({
    destination: 'public/gambar',
    filename: (req, file, cb) => {
      const timeStamp = new Date().getTime();
      const originalName = file.originalname;
      cb(null, `Product-${timeStamp}-${originalName}`);
    },
  })
}

@Controller('dto-product')
export class DtoProductController {
  constructor(private readonly dtoProductService: DtoProductService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('gambar',storage ),
  )
  postfile(
    @Body() dataBody: CreateDtoProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file)
    return this.dtoProductService.create(dataBody, file);
  }

  // create(
  //   @Body() createDtoProductDto: CreateDtoProductDto,
  //   @Body() file: any
  //   ) {
  //   return this.dtoProductService.create(createDtoProductDto, file)
  // }

  @Get()
  findAll() {
    return this.dtoProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoProductService.findOne(+id);
  }

  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('gambar',storage ),
  )
  update(
    @Param('id') id: number,
    @Body() updateDtoProductDto: UpdateDtoProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file)
    // return file;
    return this.dtoProductService.update(id, updateDtoProductDto, file);
  }

  // @Patch(':id')
  // update(){
  //   return 'hallo'
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoProductService.remove(+id);
  }
}
