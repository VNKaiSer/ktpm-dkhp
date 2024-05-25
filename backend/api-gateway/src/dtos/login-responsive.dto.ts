import { ApiProperty } from "@nestjs/swagger";


export class LoginResponse {
  @ApiProperty({
    type: String,
    description: 'Trạng thái',
  })
  status: string;
  @ApiProperty({
    type: String,
    description: 'Access token',
    // example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  token: string;
  @ApiProperty({
    type: String,
    description: 'Thông báo',
  })
  mess?: string;
}
