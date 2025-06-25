import tshirt from "@/assets/images/products/tshirt.png";
import bag1 from "@/assets/images/products/bag.png";
import bag2 from "@/assets/images/products/bag-2.png";
import monitor from "@/assets/images/products/monitor.png";
import phone from "@/assets/images/products/phone.png";
import chair from "@/assets/images/products/chair.png";
import sneakers from "@/assets/images/products/sneakers.png";

import { ProductsInterface, Category } from "@/types/types";

export const productsMock: ProductsInterface[] = [
  {
    id: 1,
    name: "Camiseta",
    price: 59.9,
    image: tshirt,
    description:
      "Uma bela camiseta azul, excelente para usar nos dias de calor.",
    category: Category.Roupas,
    stock: 30,
  },
  {
    id: 2,
    name: "Bolsa de Couro",
    price: 199.9,
    image: bag1,
    description:
      "Uma bonita bolsa na cor marrom, com alça confortável e tamanho perfeito.",
    category: Category.Acessórios,
    stock: 25,
  },
  {
    id: 3,
    name: "Cadeira",
    price: 89.9,
    image: chair,
    description:
      "Uma excelente cadeira de jantar de madeira, muito confortável.",
    category: Category.Móveis,
    stock: 60,
  },
  {
    id: 4,
    name: "Monitor",
    price: 599.9,
    image: monitor,
    description: "Um monitor UltraHD, com resolução 4k, perfeita para Gamers.",
    category: Category.Eletrônicos,
    stock: 10,
  },
  {
    id: 5,
    name: "Bolsa de Pano",
    price: 79.9,
    image: bag2,
    description: "Uma linda bolsa de pano, perfeita para um dia casual.",
    category: Category.Acessórios,
    stock: 80,
  },
  {
    id: 6,
    name: "iPhone",
    price: 5599.9,
    image: phone,
    description: "Celular iPhone 17, o mais novo lançamento da Apple",
    category: Category.Eletrônicos,
    stock: 20,
  },
  {
    id: 7,
    name: "Tênis",
    price: 299.9,
    image: sneakers,
    description:
      "Tênis casual extremamente confortável, para usar nos finais de semana.",
    category: Category.Roupas,
    stock: 15,
  },
];
