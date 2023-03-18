import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";

@Module({
    controllers: [ProductsController],
    providers: [ProductsRepository],
})

export class ProductsModule {

}