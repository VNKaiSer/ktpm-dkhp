import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'student_id',
    description: 'Username',
    example: 'username',
  })
  student_id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'password',
  })
  password: string;
}
