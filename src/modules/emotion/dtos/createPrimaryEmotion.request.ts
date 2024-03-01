import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SecondaryEmotionDto } from './secondaryEmotion.dto';
import { IsNotEmptyArray } from '../validators/IsNotEmptyArray';

export class CreatePrimaryEmotionRequest {
  @ApiProperty({
    example: 'Happy',
    required: true,
    description: 'The name of the primary emotion',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Feeling or showing pleasure or contentment',
    required: true,
    description: 'The description of the primary emotion',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: [
      {
        name: 'Joy',
        description: 'A feeling of great pleasure and happiness',
        color: '#FFD700',
        theme: 'light',
      },
      {
        name: 'Euphoria',
        description: 'A feeling or state of intense excitement and happiness',
        color: '#FFD700',
        theme: 'dark',
      },
    ],
    required: true,
    description: 'The secondary emotions of the primary emotion',
  })
  @ValidateNested({ each: true })
  @Type(() => SecondaryEmotionDto)
  @IsNotEmptyArray({ message: 'Secondary Emotions cannot be empty.' })
  secondaryEmotions: SecondaryEmotionDto[];
}
