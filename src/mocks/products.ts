import type { Product } from '@/schemas/product'

const BASE_PHOTO =
    'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png'

export const mockProducts: Product[] = [
    {
        productName: 'iPhone 11 Pro Max',
        descriptionShort: 'Tela Super Retina XDR de 6,5", chip A13 Bionic, câmera tripla de 12 MP.',
        photo: BASE_PHOTO,
        price: 5999.9,
        oldPrice: 7499.9,
        installmentValue: 599.99,
    },
    {
        productName: 'iPhone 13 Mini',
        descriptionShort: 'Tela Super Retina XDR de 5,4", chip A15 Bionic, câmera dupla de 12 MP.',
        photo: BASE_PHOTO,
        price: 4299.9,
        oldPrice: 5299.9,
        installmentValue: 429.99,
    },
    {
        productName: 'iPhone 14 Pro',
        descriptionShort: 'Tela ProMotion de 6,1", chip A16 Bionic, câmera principal de 48 MP.',
        photo: BASE_PHOTO,
        price: 7499.9,
        installmentValue: 749.99,
    },
    {
        productName: 'iPhone SE (3ª geração)',
        descriptionShort: 'Tela Retina HD de 4,7", chip A15 Bionic, câmera de 12 MP.',
        photo: BASE_PHOTO,
        price: 2999.9,
        oldPrice: 3499.9,
        installmentValue: 299.99,
    },
    {
        productName: 'iPhone 15',
        descriptionShort: 'Tela Super Retina XDR de 6,1", chip A16 Bionic, câmera de 48 MP.',
        photo: BASE_PHOTO,
        price: 6499.9,
        oldPrice: 7299.9,
        installmentValue: 649.99,
    },
    {
        productName: 'iPhone 15 Pro Max',
        descriptionShort: 'Tela ProMotion de 6,7", chip A17 Pro, câmera principal de 48 MP.',
        photo: BASE_PHOTO,
        price: 9999.9,
        installmentValue: 999.99,
    },
]
