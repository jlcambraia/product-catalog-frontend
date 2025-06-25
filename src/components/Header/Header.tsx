import styles from "./Header.module.css";
import Search from "./components/Search";
import Image from "next/image";
import logo from "../../../public/logo.png";
import CreateProductPopup from "../modals/CreateProductPopup";
import { useState } from "react";

import { HeaderProps } from "@/types/types";

const Header = ({
  products,
  setProducts,
  setAllProducts,
  setActiveCategory,
  isLikedList,
}: HeaderProps) => {
  const [popupCreate, setPopupCreate] = useState<HTMLElement | boolean>(false);

  const favoriteButtonFilter = () => {
    setProducts(isLikedList);
    setActiveCategory("");
  };

  const handleOpenPopup = () => {
    setPopupCreate(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Image
            className={styles.image}
            src={logo}
            alt="Imagem de uma Bolsa"
          />
          <h1 className={styles.title}>MeuCatálogo</h1>
        </div>
        <div className={styles.buttonsAndSearchContainer}>
          <div className={styles.buttonsContainer}>
            <button className={styles.addButton} onClick={handleOpenPopup} />
            <button
              onClick={favoriteButtonFilter}
              className={styles.favoriteButton}
            />
            <Search setProducts={setProducts} />
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
    </>
  );
};

export default Header;
