'use client';
import styles from './ProductionProducts.module.css';
import { useState } from 'react';
import api from '@/utils/api/Api';
import { ProductProps } from '@/types/types';
import Image from 'next/image';
import { showPrice, showCategory } from '@/utils/validators/validators';
export default function ProductionProduct({ product }: ProductProps) {
  const [input, setInput] = useState('');
  const [stock, setStock] = useState(product.stock);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function submit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault(); setError('');
    const amount = Number(input);
    if (!Number.isSafeInteger(amount) || amount <= 0) { setError('Informe uma quantidade inteira positiva.'); return; }
    setLoading(true);
    try {
      const response = await api.updateProductStock(product._id, amount);
      setStock(response.data.stock); setInput('');
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro ao atualizar estoque.'); }
    finally { setLoading(false); }
  }
  return <li className={styles.card}><div className={styles.container}>
    <span className={styles.divisory}><Image className={styles.image} src={product.image} alt={`Imagem de ${product.name}`} width={150} height={150} unoptimized={typeof product.image === 'string'} /></span>
    <span className={styles.divisory}>Produto: <p className={styles.text}>{product.name}</p></span>
    <span className={styles.divisory}>Categoria: <p className={styles.text}>{showCategory(product.category)}</p></span>
    <span className={styles.divisory}>Preço: <p className={styles.text}>{showPrice(product.price)}</p></span>
    <span className={styles.divisory}>Estoque atual: <p className={styles.text}>{stock}</p></span>
    <span className={styles.divisory}>Qnte a consumir:
      <form className={styles.form} onSubmit={submit}>
        <input aria-label="Quantidade a consumir" className={styles.input} type="number" min="1" step="1" required value={input} onChange={e => setInput(e.target.value)} />
        <button aria-label="Consumir estoque" disabled={loading} className={loading ? styles.loader : styles.button} />
      </form>
      {error && <p role="alert">{error}</p>}
    </span>
  </div></li>;
}
