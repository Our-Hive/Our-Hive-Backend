import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTranscendentalRecordRequestDto {
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
    example: 'Beach',
    required: true,
    description: 'The location where the emotion was felt',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'Working',
    required: true,
    description: 'The activity that was performed when the emotion was felt',
  })
  @IsString()
  @IsNotEmpty()
  activity: string;

  @ApiProperty({
    example: 'Friend',
    required: true,
    description: 'The companion that was present when the emotion was felt',
  })
  @IsString()
  @IsNotEmpty()
  companion: string;

  @ApiProperty({
    example: '2021-08-01 14:00',
    required: true,
    description: 'The date when the emotion was felt',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: 'Today was a great day! I felt so happy and content.',
    required: true,
    description:
      'The description of the transcendental record, the user can write anything about what he felt.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
