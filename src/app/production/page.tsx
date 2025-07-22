'use client';

import styles from './page.module.css';
import api from '@/utils/api/Api';
import { useEffect, useState } from 'react';
import { ProductsInterface } from '@/types/types';
import ProductionProduct from './components/ProductionProduct/ProductionProducts';
import Footer from '@/components/Footer/Footer';

const ProductionPage = () => {
	const [productionPageProducts, setProductionPageProducts] = useState<
		ProductsInterface[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const getAllProducts = async () => {
			const allProducts = await api.getProducts();
			const reversedProducts = allProducts.data.reverse();
			setProductionPageProducts(reversedProducts);
			setIsLoading(false);
		};
		getAllProducts();
	}, []);

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.headerTitle}>Controle de Produção</h1>{' '}
			</header>

			{isLoading ? (
				<div className={styles.loaderContainer}>
					<div className={styles.loader}></div>
					<span className={styles.loaderText}>Carregando produtos...</span>
				</div>
			) : (
				<>
					<div className={styles.container}>
						{productionPageProducts.map((product) => (
							<ProductionProduct key={product._id} product={product} />
						))}
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default ProductionPage;
