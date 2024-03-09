import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDailyRecordRequest {
  @ApiProperty({
    example: 'Happy',
    required: true,
    description: 'The name of the primary emotion',
  })
  @IsString()
  @IsNotEmpty()
  primaryEmotion: string;

  @ApiProperty({
    example: 'Joy',
    required: true,
    description: 'The name of the secondary emotion',
  })
  @IsString()
  @IsNotEmpty()
  secondaryEmotion: string;
  description: string;
}
