"use client";

import styles from "./Search.module.css";
import { SearchProps } from "@/types/types";
import { useState } from "react";

import { productsMock } from "@/data/mocks/productsMock";

const Search = ({ setProducts }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const input = inputValue.toLowerCase();

    const result = productsMock.filter(
      (product) =>
        product.name.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input) ||
        product.category.toString().toLowerCase().includes(input) ||
        String(product.price).toLowerCase().includes(input)
    );
    setInputValue("");
    setProducts(result);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
        placeholder="Buscar"
      />
      <button className={styles.button} />
    </form>
  );
};

export default Search;
