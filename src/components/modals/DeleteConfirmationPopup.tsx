import styles from './DeleteConfirmationPopup.module.css';
import { PopupDeleteProps } from '@/types/types';
import { useCallback, useEffect, MouseEvent, useState } from 'react';
import api from '@/utils/api/Api';

const DeleteConfirmationPopup = ({
	product,
	setPopupDelete,
	setProducts,
	setAllProducts,
	setIsLikedList,
}: PopupDeleteProps) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [deleteProductLoading, setDeleteProductLoading] =
		useState<boolean>(false);

	const handleClosePopup = useCallback((): void => {
		setPopupDelete(false);
	}, [setPopupDelete]);

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

	const handleDeleteProduct = async () => {
		setDeleteProductLoading(true);
		try {
			const deletedProduct = await api.deleteProduct(product._id);

			if (deletedProduct) {
				setProducts((prevProducts) =>
					prevProducts.filter((p) => p._id !== product._id)
				);

				setAllProducts((prevProducts) =>
					prevProducts.filter((p) => p._id !== product._id)
				);
				setIsLikedList((prevFavorites) =>
					prevFavorites.filter((p) => p._id !== product._id)
				);
          handleClosePopup();
			}
		} catch (err) {
			setErrorMessage(err instanceof Error ? err.message : 'Não foi possível excluir o produto.');
		} finally {
			setDeleteProductLoading(false);
		}
	};

	return (
		<div className={styles.popup} onClick={handleOverlayClick} data-popup>
			<div className={styles.container}>
				<button className={styles.button} onClick={handleClosePopup} />
				<h2 className={styles.title}>Tem certeza?</h2>
          {errorMessage && <p role='alert'>{errorMessage}</p>}
				<button
					onClick={handleDeleteProduct}
					className={
						deleteProductLoading
							? styles.submitButtonLoading
							: styles.submitButton
					}
				>
					{deleteProductLoading ? 'Excluindo...' : 'Sim'}
				</button>
			</div>
		</div>
	);
};

export default DeleteConfirmationPopup;
