import { StaticImageData } from 'next/image';

export enum Category {
	Acessórios = 'ACESSÓRIOS',
	Móveis = 'MÓVEIS',
	Eletrônicos = 'ELETRÔNICOS',
	Roupas = 'ROUPAS',
	Outros = 'OUTROS',
}

export interface ProductsInterface {
	id: number;
	name: string;
	price: number;
	image: StaticImageData | string;
	description: string;
	category: Category;
	stock: number;
}

export type HeaderProps = {
	products: ProductsInterface[];
	setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
	setAllProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
	setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
	isLikedList: ProductsInterface[];
};

export type SearchProps = {
	setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
};

export type CategoryProps = {
	item?: string;
	handleFilterByCategory: (category: string | Category) => void;
	isActive?: boolean;
	activeCategory?: string;
	isLikedList?: ProductsInterface[];
	isFavoriteCategory?: boolean;
	allProducts?: ProductsInterface[];
};

export type ProductsListProps = {
	products: ProductsInterface[];
	isLikedList: ProductsInterface[];
	setIsLikedList: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
};

export type ProductProps = {
	product: ProductsInterface;
	isLikedList: ProductsInterface[];
	setIsLikedList: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
};

export type PopupDetailsProps = {
	setPopupDetails: React.Dispatch<React.SetStateAction<HTMLElement | boolean>>;
	handleLikeButton: () => void;
	product: ProductsInterface;
	isLikedList: ProductsInterface[];
	setIsLikedList: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
};

export type PopupCreateProps = {
	products: ProductsInterface[];
	setAllProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
	setPopupCreate: React.Dispatch<React.SetStateAction<HTMLElement | boolean>>;
	setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
};
