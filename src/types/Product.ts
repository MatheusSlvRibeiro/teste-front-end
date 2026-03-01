export interface Product {
    id: string;
    productName: string;
    descriptionShort: string;
    photo: string;
    price: number;
    oldPrice?: number;
    installmentValue?: number;
}

export interface ProductsResponse {
    success: boolean;
    products: Product[];
}
