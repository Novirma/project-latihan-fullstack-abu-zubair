import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDtoProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  price: string;
}
