import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { Account } from './entities/Account';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }
  async logIn(data: AuthDto): Promise<{ access_token: string } | null> {
    console.log('Data', data);
    try {
      const user = await this.prismaService.accounts.findUnique({
        where: {
          student_id: data.studentId,
        },
      });

      if (!user) return null;
      const isMatch = bcrypt.compareSync(data.password, user.password_hash);
      if (!isMatch) return null;
      const tokens = await this.getTokens(user.id, user.student_id);
      await this.updateRefeshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      return null;
    }
  }
  hashData(data: string) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
  }

  async getTokens(userId: number, username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        { expiresIn: '15m', secret: process.env.AT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        { expiresIn: '7d', secret: process.env.RT_SECRET },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signUp(data: Account): Promise<Tokens> {
    console.log(data);
    const passwordHash = this.hashData(data.password);
    const user = await this.prismaService.accounts.create({
      data: {
        student_id: data.studentId,
        email: data.email,
        password_hash: passwordHash,
        refresh_token: '',
      },
    });
    const tokens = await this.getTokens(user.id, user.student_id);
    this.updateRefeshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefeshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = this.hashData(refreshToken);
    await this.prismaService.accounts.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }

  async logOut(userId: number) {
    return await this.prismaService.accounts.updateMany({
      where: {
        id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async refeshToken(userId: number, rt: string) {
    const user = await this.prismaService.accounts.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = bcrypt.compareSync(rt, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.student_id);
    await this.updateRefeshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
