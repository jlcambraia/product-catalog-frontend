'use client';

import styles from './page.module.css';
import Header from '@/components/Header/Header';
import CategoryList from '@/components/CategoryList/CategoryList';
import ProductsList from '@/components/ProductsList/ProductsList';
import Footer from '@/components/Footer/Footer';
import WarningPopup from '@/components/modals/WarningPopup';
import { useEffect, useState } from 'react';
import { ProductsInterface, Category } from '@/types/types';
import api from '@/utils/api/Api.js';

export default function Home() {
	const [products, setProducts] = useState<ProductsInterface[]>([]);
	const [allProducts, setAllProducts] = useState<ProductsInterface[]>([]);
	const [activeCategory, setActiveCategory] = useState<string>('Todos');
	const [isLikedList, setIsLikedList] = useState<ProductsInterface[]>([]);
	const [popupWarning, setPopupWarning] = useState<HTMLElement | boolean>(
		false
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setPopupWarning(true);
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await api.getProducts();

				const reversedForProducts = [...allProducts.data].reverse();
				const reversedForAllProducts = [...allProducts.data].reverse();

				setProducts(reversedForProducts);
				setAllProducts(reversedForAllProducts);
			} catch (err) {
				console.error('Erro ao buscar produtos:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleFilterByCategory = (category: string | Category): void => {
		setActiveCategory(category.toString());

		if (category === 'Todos') {
			setProducts(allProducts);
			return;
		}

		const filteredProducts = allProducts?.filter(
			(product) => product.category === category
		);

		setProducts(filteredProducts);
	};

	return (
		<>
			<div className={styles.container}>
				<Header
					products={products}
					allProducts={allProducts}
					setProducts={setProducts}
					setAllProducts={setAllProducts}
					setActiveCategory={setActiveCategory}
					isLikedList={isLikedList}
				/>
				<main className={styles.main}>
					<CategoryList
						handleFilterByCategory={handleFilterByCategory}
						activeCategory={activeCategory}
						allProducts={allProducts}
					/>
					<ProductsList
						products={products}
						isLikedList={isLikedList}
						setIsLikedList={setIsLikedList}
						setProducts={setProducts}
						setAllProducts={setAllProducts}
						isLoading={isLoading}
					/>
				</main>
				<Footer />
				{popupWarning && <WarningPopup setPopupWarning={setPopupWarning} />}
			</div>
		</>
	);
}
