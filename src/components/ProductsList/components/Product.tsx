import styles from './Product.module.css';
import Image from 'next/image';
import { ProductProps } from '@/types/types';
import { useState } from 'react';
import ProductDetailPopup from '../../modals/ProductDetailPopup';

const Product = ({
	product,
	isLikedList,
	setProducts,
	setIsLikedList,
	setAllProducts,
}: ProductProps) => {
	const [popupDetails, setPopupDetails] = useState<HTMLElement | boolean>(
		false
	);

	const isLiked = isLikedList.some((item) => item.id === product.id);

	const handleLikeButton = (): void => {
		if (isLiked) {
			setIsLikedList((prev) => prev.filter((item) => item.id !== product.id));
		} else {
			setIsLikedList((prev) => [...prev, product]);
		}
	};

	const showPrice = (price: number | string): string => {
		const normalized =
			typeof price === 'string' ? price.replace(',', '.') : price;
		const value =
			typeof normalized === 'number' ? normalized : parseFloat(normalized);

		return 'R$ ' + value.toFixed(2).replace('.', ',');
	};

	const handleOpenPopup = () => {
		setPopupDetails(true);
	};

	const handleDeleteProduct = () => {
		setAllProducts((prev) => prev.filter((item) => item.id !== product.id));
		setProducts((prev) => prev.filter((item) => item.id !== product.id));
	};

	return (
		<>
			<li className={styles.card}>
				<div className={styles.imageAndPriceContainer}>
					<Image
						className={styles.image}
						src={product.image}
						alt={`Imagem de ${product.name}`}
						width={200}
						height={200}
						unoptimized={typeof product.image === 'string'}
					/>
					<p className={styles.name}>{product.name}</p>
					<p className={styles.price}>{showPrice(product.price)}</p>
					<button
						className={styles.deleteButton}
						onClick={handleDeleteProduct}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					<div className={styles.buttonContainer}>
						<button
							className={isLiked ? styles.buttonLikeFilled : styles.buttonLike}
							onClick={handleLikeButton}
						/>
					</div>
					<div className={styles.buttonContainer}>
						<button
							className={styles.buttonDetails}
							onClick={handleOpenPopup}
						/>
					</div>
				</div>
			</li>
			{popupDetails && (
				<ProductDetailPopup
					setPopupDetails={setPopupDetails}
					handleLikeButton={handleLikeButton}
					product={product}
					isLikedList={isLikedList}
					setIsLikedList={setIsLikedList}
				/>
			)}
		</>
	);
};

export default Product;
