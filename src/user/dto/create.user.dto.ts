import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { uniqueEmail } from "../validator/email.validator";

export class CreateUserDto {
    @IsString({ message: 'O nome não pode ser numerico' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @uniqueEmail({ message: 'Já existe um usuário com este e-mail' })
    email: string;

    @MinLength(6, { message: 'A senha prescisa ter ao menos 6 caracteres' })
    senha: string;
}