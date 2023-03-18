import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { uniqueEmail } from "../validator/email.validator";

export class UpdateUserDto {
    @IsNotEmpty({ message: 'O nome não pode ser numerico' })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @uniqueEmail({ message: 'Já existe um usuário com este e-mail' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha prescisa ter ao menos 6 caracteres' })
    @IsOptional()
    senha: string;
}