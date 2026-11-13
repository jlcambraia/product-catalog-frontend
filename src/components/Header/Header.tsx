'use client';

import styles from './Header.module.css';
import Search from './components/Search';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import CreateProductPopup from '../modals/CreateProductPopup';
import LinksPopup from '../modals/LinksPopup';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HeaderProps } from '@/types/types';

const Header = ({
  allProducts, setProducts, setActiveCategory, isLikedList,
  onProductCreated, onRestoreDemo, isRestoringDemo,
}: HeaderProps) => {
  const [popupCreate, setPopupCreate] = useState(false);
  const [popupLinks, setPopupLinks] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const restoreDialogRef = useRef<HTMLDialogElement>(null);
  const { authenticated, loading, logout } = useAuth();

  useEffect(() => {
    const dialog = restoreDialogRef.current;
    if (!dialog) return;

    if (restoreDialogOpen && !dialog.open) {
      dialog.showModal();
    } else if (!restoreDialogOpen && dialog.open) {
      dialog.close();
    }
  }, [restoreDialogOpen]);

  const favoriteButtonFilter = () => {
    setProducts(isLikedList);
    setActiveCategory('');
  };

  const confirmRestore = () => {
    setRestoreDialogOpen(false);
    void onRestoreDemo();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topbar}>
          <div className={styles.brand}>
            <Image className={styles.image} src={logo} alt='' />
            <h1 className={styles.title}>MeuCatálogo</h1>
          </div>

          <nav className={styles.utilities} aria-label='Ações do catálogo'>
            <div className={styles.search}>
              <Search allProducts={allProducts} setProducts={setProducts} setActiveCategory={setActiveCategory} />
            </div>
            <button
              type='button'
              aria-label='Ver favoritos'
              title='Ver favoritos'
              className={styles.favoriteButton}
              onClick={favoriteButtonFilter}
            >
              <span aria-hidden='true'>♥</span>
              <span>Favoritos</span>
            </button>
            {!loading && (
              authenticated
                ? <button type='button' className={styles.authButton} onClick={() => void logout()}>Sair</button>
                : <Link className={styles.authButton} href='/admin/login'>Entrar</Link>
            )}
          </nav>
        </div>

        {!loading && authenticated && (
          <section className={styles.adminBar} aria-label='Ferramentas administrativas de demonstração'>
            <div className={styles.adminInfo}>
              <span className={styles.demoBadge}><span className={styles.demoDot} aria-hidden='true' />Modo demonstração</span>
              <p>Experimente os recursos sem alterar os produtos originais.</p>
            </div>
            <div className={styles.adminActions}>
              <button type='button' className={styles.addButton} onClick={() => setPopupCreate(true)}>
                <span aria-hidden='true'>+</span> Adicionar produto
              </button>
              <button type='button' className={styles.linksButton} onClick={() => setPopupLinks(true)}>
                Links de imagens
              </button>
              <button
                type='button'
                className={styles.restoreButton}
                onClick={() => setRestoreDialogOpen(true)}
                disabled={isRestoringDemo}
              >
                <span aria-hidden='true'>↻</span> {isRestoringDemo ? 'Restaurando...' : 'Restaurar catálogo'}
              </button>
            </div>
          </section>
        )}
      </header>

      {authenticated && popupCreate && (
        <CreateProductPopup setPopupCreate={setPopupCreate} onProductCreated={onProductCreated} />
      )}
      {authenticated && popupLinks && <LinksPopup setPopupLinks={setPopupLinks} />}

      <dialog
        ref={restoreDialogRef}
        className={styles.restoreDialog}
        aria-labelledby='restore-title'
        aria-describedby='restore-description'
        onClose={() => setRestoreDialogOpen(false)}
      >
        <div className={styles.dialogIcon} aria-hidden='true'>↻</div>
        <h2 id='restore-title' className={styles.dialogTitle}>Restaurar catálogo?</h2>
        <p id='restore-description' className={styles.dialogDescription}>
          Os produtos adicionados, as exclusões simuladas e as alterações de estoque desta sessão serão desfeitos.
          Seus produtos originais no banco de dados não serão alterados.
        </p>
        <div className={styles.dialogActions}>
          <button type='button' className={styles.cancelButton} onClick={() => setRestoreDialogOpen(false)}>
            Cancelar
          </button>
          <button
            type='button'
            className={styles.confirmButton}
            onClick={confirmRestore}
            disabled={isRestoringDemo}
          >
            Sim, restaurar
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Header;
