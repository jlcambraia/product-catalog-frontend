import styles from './Product.module.css';
import Image from 'next/image';
import { ProductProps } from '@/types/types';
import { useState } from 'react';
import ProductDetailPopup from '../../modals/ProductDetailPopup';
import DeleteConfirmationPopup from '@/components/modals/DeleteConfirmationPopup';
import { showPrice } from '@/utils/validators/validators';
import { useAuth } from '@/context/AuthContext';

const Product = ({ product, isLikedList, setProducts, setIsLikedList, setAllProducts }: ProductProps) => {
  const [popupDetails, setPopupDetails] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const { authenticated } = useAuth();
  if (!isLikedList || !setIsLikedList || !setAllProducts || !setProducts) return null;
  const isLiked = isLikedList.some(item => item._id === product._id);
  const handleLikeButton = () => setIsLikedList(prev => isLiked ? prev.filter(item => item._id !== product._id) : [...prev, product]);
  return <>
    <li className={styles.card}>
      <div className={styles.imageAndPriceContainer}>
        <Image className={styles.image} src={product.image} alt={`Imagem de ${product.name}`} width={200} height={200} unoptimized={typeof product.image === 'string'} />
        <p className={styles.name}>{product.name}</p><p className={styles.price}>{showPrice(product.price)}</p>
        {authenticated && <button aria-label={`Excluir ${product.name}`} className={styles.deleteButton} onClick={() => setPopupDelete(true)} />}
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonContainer}><button aria-label="Favoritar produto" className={isLiked ? styles.buttonLikeFilled : styles.buttonLike} onClick={handleLikeButton} /></div>
        <div className={styles.buttonContainer}><button aria-label="Detalhes do produto" className={styles.buttonDetails} onClick={() => setPopupDetails(true)} /></div>
      </div>
    </li>
    {popupDetails && <ProductDetailPopup setPopupDetails={setPopupDetails} handleLikeButton={handleLikeButton} product={product} isLikedList={isLikedList} setIsLikedList={setIsLikedList} />}
    {authenticated && popupDelete && <DeleteConfirmationPopup setPopupDelete={setPopupDelete} product={product} setProducts={setProducts} setAllProducts={setAllProducts} setIsLikedList={setIsLikedList} />}
  </>;
};
export default Product;
