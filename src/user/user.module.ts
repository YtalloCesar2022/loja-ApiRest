import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailValidator } from "./validator/email.validator";

@Module({
    controllers: [UserController],
    providers: [UserRepository,EmailValidator],
})
export class UserModule {

}