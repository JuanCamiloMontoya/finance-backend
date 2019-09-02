import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { user } from '../../entities/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
        private readonly jwtService: JwtService
    ) { }

    async login(body: LoginDto) {
        return await this.userRepository
            .createQueryBuilder("user")
            .select(['user.id', 'user.name'])
            .where("user.email = :email and user.password = :password", { email: body.email, password: body.password })
            .getOne();
    }

    async validateUser(token: string): Promise<any> {
        let payload: any = this.jwtService.decode(token);
        if (payload) {
            let response = await this.userRepository.findOne({ select: ['id', 'email'], where: payload })
            if (response) {
                //response[0].rols = await this.userService.getRols(payload.id);
                return response;
            }
            return false;
        }
        return false;
    }
}
