import styles from './Header.module.css';
import Search from './components/Search';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import CreateProductPopup from '../modals/CreateProductPopup';
import LinksPopup from '../modals/LinksPopup';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HeaderProps } from '@/types/types';

const Header = ({
  products, allProducts, setProducts, setAllProducts, setActiveCategory, isLikedList,
}: HeaderProps) => {
  const [popupCreate, setPopupCreate] = useState(false);
  const [popupLinks, setPopupLinks] = useState(false);
  const { authenticated, loading, logout } = useAuth();

  const favoriteButtonFilter = () => {
    setProducts(isLikedList);
    setActiveCategory('');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Image className={styles.image} src={logo} alt='Imagem de uma Bolsa' />
          <h1 className={styles.title}>MeuCatálogo</h1>
        </div>
        <div className={styles.buttonsAndSearchContainer}>
          <div className={styles.buttonsContainer}>
            {!loading && authenticated && (
              <>
                <button type='button' aria-label='Links de imagens' className={styles.linksButton} onClick={() => setPopupLinks(true)} />
                <button type='button' aria-label='Adicionar produto' className={styles.addButton} onClick={() => setPopupCreate(true)} />
              </>
            )}
            <button type='button' aria-label='Ver favoritos' onClick={favoriteButtonFilter} className={styles.favoriteButton} />
            <Search allProducts={allProducts} setProducts={setProducts} setActiveCategory={setActiveCategory} />
            {!loading && (authenticated
              ? <button type='button' className={styles.authButton} onClick={() => void logout()}>Sair</button>
              : <Link className={styles.authButton} href='/admin/login'>Entrar</Link>)}
          </div>
        </div>
      </header>
      {authenticated && popupCreate && (
        <CreateProductPopup
          products={products}
          setPopupCreate={setPopupCreate}
          setProducts={setProducts}
          setAllProducts={setAllProducts}
        />
      )}
      {authenticated && popupLinks && <LinksPopup setPopupLinks={setPopupLinks} />}
    </>
  );
};

export default Header;
