'use client';

import styles from './ProductionProducts.module.css';
import { useState } from 'react';
import api from '@/utils/api/Api';
import { ProductProps } from '@/types/types';
import Image from 'next/image';
import { showPrice, showCategory } from '@/utils/validators/validators';

const ProductionProduct = ({ product }: ProductProps) => {
	const [updateStockInput, setUpdateStockInput] = useState<string>('');
	const [stock, setStock] = useState<number>(product.stock);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleUpdateProductStock = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setUpdateStockInput(evt.target.value);
	};

	const handleInput = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		setIsLoading(true);

		const updateStock = async () => {
			try {
				const response = await api.updateProductStock(
					product._id,
					Number(updateStockInput)
				);
				setStock(response.data.stock);
				setUpdateStockInput('');
			} catch (err) {
				console.error('Erro ao atualizar estoque:', err);
			} finally {
				setIsLoading(false);
			}
		};

		updateStock();
	};

	return (
		<li className={styles.card} key={product._id}>
			<div className={styles.container}>
				<span className={styles.divisory}>
					<Image
						className={styles.image}
						src={product.image}
						alt={`Imagem de ${product.name}`}
						width={150}
						height={150}
					/>
				</span>

				<span className={styles.divisory}>
					Produto: <p className={styles.text}>{product.name}</p>
				</span>

				<span className={styles.divisory}>
					Categoria:{' '}
					<p className={styles.text}>{showCategory(product.category)}</p>
				</span>

				<span className={styles.divisory}>
					Preço: <p className={styles.text}>{showPrice(product.price)}</p>
				</span>

				<span className={styles.divisory}>
					Estoque atual: <p className={styles.text}>{stock}</p>
				</span>

				<span className={styles.divisory}>
					Qnte a consumir:{' '}
					<form className={styles.form} onSubmit={handleInput}>
						<input
							className={styles.input}
							type='text'
							placeholder='0'
							onChange={handleUpdateProductStock}
							value={updateStockInput}
						/>
						<button className={isLoading ? styles.loader : styles.button} />
					</form>
				</span>
			</div>
		</li>
	);
};

export default ProductionProduct;
