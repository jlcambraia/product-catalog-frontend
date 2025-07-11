import styles from './CreateProductPopup.module.css';
import { PopupCreateProps, Category } from '@/types/types';
import { useEffect, useCallback, useState } from 'react';
import { MouseEvent } from 'react';
import api from '@/utils/api/Api';

const CreateProductPopup = ({
	setPopupCreate,
	setProducts,
	setAllProducts,
}: PopupCreateProps) => {
	const [nameInput, setNameInput] = useState<string>('');
	const [priceInput, setPriceInput] = useState<string>('');
	const [descriptionInput, setDescriptionInput] = useState<string>('');
	const [imageInput, setImageInput] = useState<string>('');
	const [categoryInput, setCategoryInput] = useState<string>('');
	const [stockInput, setStockInput] = useState<string>('');
	const [createProductLoading, setCreateProductLoading] =
		useState<boolean>(false);

	const handleClosePopup = useCallback((): void => {
		setPopupCreate(false);
	}, [setPopupCreate]);

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

	const handleNameInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setNameInput(evt.target.value);
	};

	const handlePriceInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setPriceInput(evt.target.value);
	};

	const handleDescriptionInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setDescriptionInput(evt.target.value);
	};

	const handleImageInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setImageInput(evt.target.value);
	};

	const handleCategoryInputChange = (
		evt: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setCategoryInput(evt.target.value);
	};

	const handleStockInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>
	): void => {
		setStockInput(evt.target.value);
	};

	const handleInput = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setCreateProductLoading(true);

		const createProduct = async () => {
			try {
				const newProduct = await api.createProduct({
					name: nameInput,
					price: parseFloat(priceInput),
					description: descriptionInput,
					image: imageInput,
					category: categoryInput as Category,
					stock: parseInt(stockInput),
				});
				setProducts((prev) => [newProduct.data, ...prev]);
				setAllProducts((prev) => [newProduct.data, ...prev]);
				handleClosePopup();
			} catch (err) {
				console.error('Erro ao criar produto:', err);
			} finally {
				setCreateProductLoading(false);
			}
		};

		createProduct();
	};

	return (
		<div className={styles.popup} onClick={handleOverlayClick} data-popup>
			<div className={styles.container}>
				<button onClick={handleClosePopup} className={styles.button} />
				<h2 className={styles.title}>Adicione um produto</h2>
				<form className={styles.form} onSubmit={handleInput}>
					<fieldset className={styles.fieldset}>
						<input
							className={styles.input}
							type='text'
							placeholder='Nome do produto'
							onChange={handleNameInputChange}
							value={nameInput}
							required
						/>
						<input
							className={styles.input}
							type='number'
							placeholder='Preço do produto'
							onChange={handlePriceInputChange}
							value={priceInput}
							required
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<select
							className={`${styles.select} ${
								categoryInput ? styles.selected : ''
							}`}
							value={categoryInput}
							onChange={handleCategoryInputChange}
							required
						>
							<option value='' disabled>
								Selecione uma categoria
							</option>
							<option className={styles.option} value='ACESSÓRIOS'>
								Acessórios
							</option>
							<option className={styles.option} value='MÓVEIS'>
								Móveis
							</option>
							<option className={styles.option} value='ELETRÔNICOS'>
								Eletrônicos
							</option>
							<option className={styles.option} value='ROUPAS'>
								Roupas
							</option>
							<option className={styles.option} value='OUTROS'>
								Outros
							</option>
						</select>
						<input
							className={styles.input}
							type='number'
							placeholder='Estoque do produto'
							onChange={handleStockInputChange}
							value={stockInput}
							required
						/>
					</fieldset>
					<input
						className={styles.input}
						type='text'
						placeholder='Descrição do produto'
						onChange={handleDescriptionInputChange}
						value={descriptionInput}
						required
					/>
					<input
						className={styles.input}
						type='url'
						placeholder='Link da imagem do produto'
						onChange={handleImageInputChange}
						value={imageInput}
						required
					/>

					<button
						className={
							createProductLoading
								? styles.submitButtonLoading
								: styles.submitButton
						}
					>
						{createProductLoading ? 'Salvando...' : 'Enviar'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProductPopup;
