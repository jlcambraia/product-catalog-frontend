import styles from './Product.module.css';
import Image from 'next/image';
import { ProductProps } from '@/types/types';
import { useState } from 'react';
import ProductDetailPopup from '../../modals/ProductDetailPopup';
import DeleteConfirmationPopup from '@/components/modals/DeleteConfirmationPopup';
import { showPrice } from '@/utils/validators/validators';

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
	const [popupDelete, setPopupDelete] = useState<HTMLElement | boolean>(false);

	if (!isLikedList || !setIsLikedList || !setAllProducts || !setProducts) {
		return;
	}
	const isLiked = isLikedList.some((item) => item._id === product._id);

	const handleLikeButton = (): void => {
		if (isLiked) {
			setIsLikedList((prev) => prev.filter((item) => item._id !== product._id));
		} else {
			setIsLikedList((prev) => [...prev, product]);
		}
	};

	const handleOpenDetailPopup = () => {
		setPopupDetails(true);
	};

	const handleOpenDeletePopup = () => {
		setPopupDelete(true);
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
						onClick={handleOpenDeletePopup}
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
							onClick={handleOpenDetailPopup}
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
			{popupDelete && (
				<DeleteConfirmationPopup
					setPopupDelete={setPopupDelete}
					product={product}
					setProducts={setProducts}
					setAllProducts={setAllProducts}
				/>
			)}
		</>
	);
};

export default Product;
