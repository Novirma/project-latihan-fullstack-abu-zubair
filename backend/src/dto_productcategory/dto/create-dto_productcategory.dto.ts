import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDtoProductcategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
