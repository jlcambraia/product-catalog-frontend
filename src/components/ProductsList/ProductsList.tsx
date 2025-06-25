import styles from './ProductsList.module.css';

import Product from './components/Product';
import { ProductsListProps } from '@/types/types';

const ProductsList = ({
	products,
	isLikedList,
	setProducts,
	setIsLikedList,
	setAllProducts,
}: ProductsListProps) => {
	if (products.length === 0) {
		return (
			<p className={styles.emptyMessage}>
				Ops! Não encontramos nenhum produto.
			</p>
		);
	}

	return (
		<ul className={styles.list}>
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					isLikedList={isLikedList}
					setProducts={setProducts}
					setIsLikedList={setIsLikedList}
					setAllProducts={setAllProducts}
				/>
			))}
		</ul>
	);
};

export default ProductsList;
