import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';

export class PayloadToken {
  @ApiProperty({ description: 'The subject identifier.' })
  sub: number;
  role: UserRole;
}
