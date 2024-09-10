import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum Category {
  CLOTHES = 'CLOTHES',
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
}

export class AddAdsDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  contact: string;
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}
