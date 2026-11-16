'use client';

import styles from './page.module.css';
import Header from '@/components/Header/Header';
import CategoryList from '@/components/CategoryList/CategoryList';
import ProductsList from '@/components/ProductsList/ProductsList';
import Footer from '@/components/Footer/Footer';
import { useCallback, useEffect, useState } from 'react';
import { ProductsInterface, Category } from '@/types/types';
import api from '@/utils/api/Api.js';

export default function Home() {
	const [products, setProducts] = useState<ProductsInterface[]>([]);
	const [allProducts, setAllProducts] = useState<ProductsInterface[]>([]);
	const [activeCategory, setActiveCategory] = useState<string>('Todos');
	const [isLikedList, setIsLikedList] = useState<ProductsInterface[]>([]);
	const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isRestoringDemo, setIsRestoringDemo] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Free-tier hosting may sleep between visits; wait longer and offer manual retry.
  const loadProducts = useCallback(async (retry = false) => {
    setIsLoading(true);
    setIsSlow(false);
    setLoadError('');
    if (retry) setIsRetrying(true);
    const slowTimer = window.setTimeout(() => setIsSlow(true), 8000);
    try {
      const response = await api.getProducts();
      if (!Array.isArray(response.data)) {
        throw new Error('Formato de produtos inválido');
      }
      const sorted = [...response.data].reverse();
      setProducts(sorted);
      setAllProducts(sorted);
    } catch (error) {
      // No API-specific technical details are shown to portfolio visitors.
      console.error('Falha ao carregar catálogo:', error);
      setLoadError('Não conseguimos carregar os produtos agora. A API pode estar acordando após um período de inatividade ou indisponível temporariamente.');
    } finally {
      window.clearTimeout(slowTimer);
      setIsLoading(false);
      setIsSlow(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const handleRestoreDemo = async () => {
    setIsRestoringDemo(true);
    setIsLoading(true);
    setSuccessMessage('');
    setLoadError('');
    try {
      api.resetDemo();
      const response = await api.getProducts();
      const original = [...response.data].reverse() as ProductsInterface[];
      setAllProducts(original);
      setProducts(original);
      setIsLikedList([]);
      setActiveCategory('Todos');
      setSuccessMessage('Catálogo de demonstração restaurado! Todas as alterações simuladas desta sessão foram descartadas.');
    } catch (error) {
      console.error('Falha ao restaurar catálogo:', error);
      setLoadError('Não foi possível restaurar o catálogo agora. Tente novamente quando os produtos estiverem disponíveis.');
    } finally {
      setIsLoading(false);
      setIsRestoringDemo(false);
    }
  };

  const handleProductCreated = (product: ProductsInterface) => {
    setAllProducts(previous => [product, ...previous.filter(item => item._id !== product._id)]);
    setProducts(previous => [product, ...previous.filter(item => item._id !== product._id)]);
    setActiveCategory('Todos');
    setSuccessMessage(`Produto "${product.name}" adicionado ao catálogo de demonstração!`);
  };

	const handleFilterByCategory = (category: string | Category): void => {
		setActiveCategory(category.toString());

		if (category === 'Todos') {
			setProducts(allProducts);
			return;
		}

		const filteredProducts = allProducts?.filter(
			(product) => product.category === category
		);

		setProducts(filteredProducts);
	};

	return (
		<>
			<div className={styles.container}>
				<Header
					products={products}
					allProducts={allProducts}
					setProducts={setProducts}
					setAllProducts={setAllProducts}
					setActiveCategory={setActiveCategory}
					isLikedList={isLikedList}
            onProductCreated={handleProductCreated}
            onRestoreDemo={handleRestoreDemo}
            isRestoringDemo={isRestoringDemo}
				/>
				<main className={styles.main}>
            {successMessage && <div role='status' className={styles.successMessage}>{successMessage}<button type='button' aria-label='Dispensar confirmação' onClick={() => setSuccessMessage('')}>×</button></div>}
					<CategoryList
						handleFilterByCategory={handleFilterByCategory}
						activeCategory={activeCategory}
						allProducts={allProducts}
					/>
            {isLoading && isSlow && <div className={styles.slowNotice} role='status'>
              <strong>Ainda estamos carregando o catálogo…</strong>
              <p>O servidor pode levar mais tempo para responder depois de ficar inativo. Obrigado pela paciência.</p>
            </div>}
            {loadError ? <section role='alert' className={styles.errorPanel}>
              <h2>O catálogo não carregou desta vez</h2>
              <p>{loadError}</p>
              <button type='button' className={styles.retryButton} onClick={() => void loadProducts(true)} disabled={isRetrying}>
                {isRetrying ? 'Tentando novamente…' : 'Tentar novamente'}
              </button>
            </section> : <ProductsList
						products={products}
						isLikedList={isLikedList}
						setIsLikedList={setIsLikedList}
						setProducts={setProducts}
						setAllProducts={setAllProducts}
						isLoading={isLoading}
					/>}
				</main>
				<Footer />
				</div>
		</>
	);
}
