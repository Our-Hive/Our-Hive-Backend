import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsDate,
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
    example: '1990-01-01',
    required: true,
    description: 'User birth date',
  })
  @IsDate()
  birthDate: Date;

  @ApiProperty({
    example: '1234567890',
    required: true,
    description: 'User mobile number',
  })
  @IsPhoneNumber()
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
