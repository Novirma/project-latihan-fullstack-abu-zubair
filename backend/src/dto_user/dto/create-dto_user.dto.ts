import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDtoUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsNumber()
  // user_id:number

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  // @IsNotEmpty()
  // @IsString()
  // roles: string;

}
