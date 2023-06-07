import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoAuthDto } from './create-dto_auth.dto';

export class UpdateDtoAuthDto extends PartialType(CreateDtoAuthDto) {}
