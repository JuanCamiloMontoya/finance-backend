import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { user } from '../../entities/user';

import { UserDtoCreate } from './dto/userCreate.dto';
import { UserDtoUpdate } from './dto/userUpdate.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(user) private readonly userRepository: Repository<user>
    ) { }

    async createUser(user: UserDtoCreate) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.userRepository.create({
                        "email": user.email,
                        "password": user.password,
                        "name": user.name
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async getUser(type) {
        const customWhere = type != 'all'? { id: type }: {}
        return await this.userRepository.find({
            select: ["id","name","email"],
            where: { ...customWhere },
            order: { id: "ASC" }
        })
    }

    async updateUser(userToUpdate: UserDtoUpdate) {
        try {
            await this.userRepository.update(
                userToUpdate.id,
                { name: userToUpdate.name });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }
}
