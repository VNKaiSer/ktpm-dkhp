import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/entities/Account';

export class LoginResponsive {
  @ApiProperty({ type: String })
  status: string;
  @ApiProperty({ type: Account })
  data: Account;
  @ApiProperty({ type: String })
  token: string;
  @ApiProperty({ type: String })
  mess!: string;
}
