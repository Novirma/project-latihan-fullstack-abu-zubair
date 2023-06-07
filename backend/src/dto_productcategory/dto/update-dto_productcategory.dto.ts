import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoProductcategoryDto } from './create-dto_productcategory.dto';

export class UpdateDtoProductcategoryDto extends PartialType(
  CreateDtoProductcategoryDto,
) {}
