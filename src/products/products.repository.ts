import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";


@Injectable()
export class ProductsRepository {
    private products: ProductEntity[] = [];

    async save(saveProduct: ProductEntity) {
        this.products.push(saveProduct);
        return saveProduct;
    }

    async list() {
        return this.products;
    }

    private searchById(id: string) {
        const possibleProduct = this.products.find(
            (product) => product.id === id);

        if (!possibleProduct) {
            throw new Error('Produto não existe');
        }

        return possibleProduct;
    }

    async update(id: string, updateData: Partial<ProductEntity>) {
        const nonUpdateableData = ['id', 'usuarioId'];
        const product = this.searchById(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if (nonUpdateableData.includes(key)) {
                return;
            }

            product[key] = value;
        })

        return product;
    }

    async remove(id: string) {
        const removedProduct = this.searchById(id);
        this.products = this.products.filter(
            savedUser => savedUser.id !== id
        );
        return removedProduct;
    }

}