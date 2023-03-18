export class ProductEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    caracteristicas: CaracteristicaProduto[];
    imagens: ImagemProduto[];
    categoria: string;
}

class CaracteristicaProduto {
    nome: string;
    descricao: string;
}

class ImagemProduto {
    url: string;
    descricao: string;
}