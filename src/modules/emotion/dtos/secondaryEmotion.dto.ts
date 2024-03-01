import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '../entities/enums/theme.enum';
import { IsEnum, IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class SecondaryEmotionDto {
  @ApiProperty({
    example: 'Joy',
    required: true,
    description: 'The name of the secondary emotion',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A feeling of great pleasure and happiness',
    required: true,
    description: 'The description of the secondary emotion',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '#FFD700',
    required: true,
    description: 'The color of the secondary emotion',
  })
  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    example: Theme.LIGHT,
    required: true,
    description: 'The theme of the secondary emotion',
  })
  @IsNotEmpty()
  @IsEnum(Theme)
  theme: Theme;
}
