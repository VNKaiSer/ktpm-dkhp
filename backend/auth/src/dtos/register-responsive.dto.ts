import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponsive {
  @ApiProperty({ type: String })
  status: number;
  @ApiProperty({ type: String })
  token: string;
}
