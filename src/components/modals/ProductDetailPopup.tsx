import styles from './ProductDetailPopup.module.css';
import { PopupDetailsProps } from '@/types/types';
import { useEffect, useCallback } from 'react';
import { MouseEvent } from 'react';
import Image from 'next/image';

const ProductDetailPopup = ({
	setPopupDetails,
	product,
	handleLikeButton,
	isLikedList,
}: PopupDetailsProps) => {
	const isLiked = isLikedList.some((item) => item._id === product._id);

	const handleClosePopup = useCallback((): void => {
		setPopupDetails(false);
	}, [setPopupDetails]);

	useEffect(() => {
		const handleEscClose = (evt: KeyboardEvent): void => {
			const target = document.activeElement as HTMLElement;

			if (evt.key === 'Escape') {
				target.blur();
				handleClosePopup();
			}
		};

		document.addEventListener('keydown', handleEscClose);
		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [handleClosePopup]);

	const handleOverlayClick = (evt: MouseEvent<HTMLElement>): void => {
		const target = evt.target as HTMLElement;

		if ((target as HTMLElement).dataset.popup !== undefined) {
			handleClosePopup();
		}
	};

	return (
		<div className={styles.popup} onClick={handleOverlayClick} data-popup>
			<div className={styles.container}>
				<button onClick={handleClosePopup} className={styles.button} />
				<h2 className={styles.title}>{product.name}</h2>
				<div className={styles.imageAndDescriptionContainer}>
					<Image
						className={styles.image}
						src={product.image}
						alt={`Imagem de ${product.name}`}
						width={400}
						height={400}
						unoptimized={typeof product.image === 'string'}
					/>
					<div className={styles.descriptionContainer}>
						<p className={styles.description}>{product.description}</p>
						<div className={styles.likeButtonAndStockContainer}>
							<div className={styles.buttonContainer}>
								<p className={styles.label}>Salvar nos favoritos:</p>
								<button
									className={
										isLiked ? styles.buttonLikeFilled : styles.buttonLike
									}
									onClick={handleLikeButton}
								/>
							</div>
							<div className={styles.stockContainer}>
								<p className={styles.label}>Quantidade em estoque</p>
								<p className={styles.quantity}>{product.stock} und.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPopup;
