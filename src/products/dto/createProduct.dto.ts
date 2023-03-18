import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";

export class CreateProductDto {
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    usuarioId: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantidade: number;

    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    descricao: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CaracteristicaProdutoDTO)
    @ArrayMinSize(3)
    caracteristicas: CaracteristicaProdutoDTO[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImagemProdutoDTO)
    @ArrayMinSize(1)
    imagens: ImagemProdutoDTO[];

    @IsDate()
    @Type(() => Date)
    dataCriacao: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dataAtualizacao?: Date;

    @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
    @IsString()
    categoria: string;
}

export class CaracteristicaProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    nome: string;

    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    @IsString()
    descricao: string;
}

export class ImagemProdutoDTO {
    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;
}