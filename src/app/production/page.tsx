'use client';
import styles from './page.module.css';
import api from '@/utils/api/Api';
import { useEffect, useState } from 'react';
import { ProductsInterface } from '@/types/types';
import ProductionProduct from './components/ProductionProduct/ProductionProducts';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProductionPage() {
  const { authenticated, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!authenticated) return;
    let active = true;
    setLoading(true);
    api.getProducts().then(response => {
      if (active) setProducts([...response.data].reverse());
    }).catch(() => { if (active) setError('Não foi possível carregar o estoque.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [authenticated]);
  if (authLoading) return <main>Verificando acesso...</main>;
  if (!authenticated) return <main><h1>Acesso administrativo</h1><p>Entre para acessar o controle de produção.</p><Link href="/admin/login">Entrar</Link></main>;
  return <>
    <header className={styles.header}><h1 className={styles.headerTitle}>Controle de Produção</h1></header>
    {loading ? <p>Carregando produtos...</p> : error ? <p role="alert">{error}</p> :
      <><div className={styles.container}>{products.map(product => <ProductionProduct key={product._id} product={product} />)}</div><Footer /></>}
  </>;
}
