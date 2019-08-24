import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { user } from '../../entities/user';

@Module({
  imports:[
    TypeOrmModule.forFeature([user]), 
    JwtModule.register({ secret: 'caol' })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
