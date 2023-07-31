import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
