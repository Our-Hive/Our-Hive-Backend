import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'username',
    required: false,
    description: 'User username',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username?: string;

  @ApiProperty({
    example: '+573118617627',
    required: false,
    description: 'User mobile number, must be a valid colombian mobile number',
  })
  @IsOptional()
  @IsPhoneNumber('CO', {
    message: 'mobileNumber must be a valid colombian mobile number',
  })
  mobileNumber?: string;

  @ApiProperty({
    example: '2024-02-20',
    required: false,
    description: 'User birth date',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;
}
