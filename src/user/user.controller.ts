import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { UserListDto } from "./dto/user.list.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

@Controller('/usuarios')
export class UserController {

    constructor(private userRepository: UserRepository) { }

    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.senha = userData.senha;
        userEntity.nome = userData.nome;
        userEntity.id = uuid();

        this.userRepository.save(userEntity);
        return {
            user: new UserListDto(userEntity.id, userEntity.nome),
            message: 'usuário criado com sucesso'
        }

    }

    @Get()
    async userList() {
        const savedUsers = await this.userRepository.list();
        const listOfUsers = savedUsers.map(
            user => new UserListDto(
                user.id,
                user.nome
            )
        );
        return listOfUsers;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
        const updatedUser = await this.userRepository.update(id, newData);
        return {
            user: updatedUser,
            message: 'usuário atualizado com sucesso',
        }
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const removedUser = await this.userRepository.remove(id);
        return {
            user: removedUser,
            message: 'usuário removido com sucesso'
        }
    }
}