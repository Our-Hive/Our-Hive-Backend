import { ApiProperty } from '@nestjs/swagger';

export class PayloadToken {
  @ApiProperty({ description: 'The subject identifier.' })
  sub: number;
}
