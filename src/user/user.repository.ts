import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(saveUser: UserEntity) {
        this.users.push(saveUser);
    }

    async list() {
        return this.users;
    }

    async checkEmail(email: string) {
        const possibleUser = this.users.find(
            user => user.email === email
        );
        return possibleUser !== undefined;
    }

    private searchById(id: string) {
        const possibleUser = this.users.find(
            savedUser => savedUser.id === id
        );

        if (!possibleUser) {
            throw new Error('Usuário não existe');
        }

        return possibleUser;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = this.searchById(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        })

        return user;
    }

    async remove(id: string) {
        const user = this.searchById(id);
        this.users = this.users.filter(
            savedUser => savedUser.id !== id
        );
        return user;
    }
}