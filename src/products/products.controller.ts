import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { ProductEntity } from "./product.entity";
import { ProductsRepository } from "./products.repository";

@Controller('produtos')
export class ProductsController {

    constructor(private readonly productsReposiroty: ProductsRepository) { }

    @Post()
    async createProduct(@Body() productData: CreateProductDto) {
        const product = new ProductEntity();

        product.id = uuid();
        product.nome = productData.nome;
        product.usuarioId = productData.usuarioId;
        product.valor = productData.valor;
        product.quantidade = productData.quantidade;
        product.descricao = productData.descricao;
        product.categoria = productData.categoria;
        product.caracteristicas = productData.caracteristicas;
        product.imagens = productData.imagens;

        const redisteredProduct = this.productsReposiroty.save(product)
        return redisteredProduct;
    }

    @Get()
    async list() {
        return this.productsReposiroty.list();
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() productData: UpdateProductDto,
    ) {
        const changedProduct = await this.productsReposiroty.update(
            id,
            productData,
        );

        return {
            message: 'produto atualizado com sucesso',
            produto: changedProduct,
        };
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const removedProduct = await this.productsReposiroty.remove(id);

        return {
            mensagem: 'produto removido com sucesso',
            produto: removedProduct,
        };
    }
}
