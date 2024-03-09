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

  @ApiProperty({
    example: 'Today was a great day! I felt so happy and content.',
    required: true,
    description:
      'The description of the daily record, the user can write anything about his day here.',
  })
  description: string;
}
