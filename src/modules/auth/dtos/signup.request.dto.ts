import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class SignupRequestDto {
  @ApiProperty({
    example: 'username',
    required: true,
    description: 'User username',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '2024-02-20',
    required: true,
    description: 'User birth date',
  })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    example: '+573118617627',
    required: true,
    description: 'User mobile number, must be a valid colombian mobile number',
  })
  @IsPhoneNumber('CO', {
    message: 'mobileNumber must be a valid colombian mobile number',
  })
  mobileNumber: string;

  @ApiProperty({
    example: 'John',
    required: true,
    description: 'User first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
    description: 'User last name',
  })
  @IsString()
  lastName: string;
}
