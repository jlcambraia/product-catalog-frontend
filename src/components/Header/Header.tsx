import styles from './Header.module.css';
import Search from './components/Search';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import CreateProductPopup from '../modals/CreateProductPopup';
import LinksPopup from '../modals/LinksPopup';
import { useState } from 'react';

import { HeaderProps } from '@/types/types';

const Header = ({
	products,
	allProducts,
	setProducts,
	setAllProducts,
	setActiveCategory,
	isLikedList,
}: HeaderProps) => {
	const [popupCreate, setPopupCreate] = useState<HTMLElement | boolean>(false);
	const [popupLinks, setPopupLinks] = useState<HTMLElement | boolean>(false);

	const favoriteButtonFilter = () => {
		setProducts(isLikedList);
		setActiveCategory('');
	};

	const handleOpenPopupCreate = () => {
		setPopupCreate(true);
	};

	const handleOpenPopupLinks = () => {
		setPopupLinks(true);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.container}>
					<Image
						className={styles.image}
						src={logo}
						alt='Imagem de uma Bolsa'
					/>
					<h1 className={styles.title}>MeuCatálogo</h1>
				</div>
				<div className={styles.buttonsAndSearchContainer}>
					<div className={styles.buttonsContainer}>
						<button
							className={styles.linksButton}
							onClick={handleOpenPopupLinks}
						></button>
						<button
							className={styles.addButton}
							onClick={handleOpenPopupCreate}
						/>
						<button
							onClick={favoriteButtonFilter}
							className={styles.favoriteButton}
						/>
						<Search
							allProducts={allProducts}
							setProducts={setProducts}
							setActiveCategory={setActiveCategory}
						/>
					</div>
				</div>
			</header>
			{popupCreate && (
				<CreateProductPopup
					products={products}
					setPopupCreate={setPopupCreate}
					setProducts={setProducts}
					setAllProducts={setAllProducts}
				/>
			)}
			{popupLinks && <LinksPopup setPopupLinks={setPopupLinks} />}
		</>
	);
};

export default Header;
