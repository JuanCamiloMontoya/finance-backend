import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { user } from '../../entities/user';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>
    ){}

    async login(body: LoginDto) {
        return await this.userRepository
        .createQueryBuilder("user")
        .select(['user.id','user.name'])
        .where("user.email = :email and user.password = :password",{email: body.email, password: body.password} )
        .getOne();
      }

}
