'use client';

import styles from './CategoryList.module.css';
import CategoryCard from './components/CategoryCard';

import { useEffect, useState } from 'react';

import { Category, CategoryProps } from '@/types/types';

const CategoryList = ({
	handleFilterByCategory,
	activeCategory,
	allProducts,
}: CategoryProps) => {
	const [category, setCategory] = useState<Category[]>([]);

	useEffect(() => {
		if (!allProducts) return;

		const allCategories = allProducts
			.map((product) => product.category)
			.filter((cat, index, arr) => arr.indexOf(cat) === index);

		const sortedCategories = allCategories.sort((a, b) => {
			if (a === 'OUTROS') return 1;
			if (b === 'OUTROS') return -1;
			return a.localeCompare(b);
		});

		setCategory(sortedCategories);
	}, [allProducts]);

	return (
		<ul className={styles.list}>
			<CategoryCard
				item='Todos'
				handleFilterByCategory={handleFilterByCategory}
				isActive={activeCategory === 'Todos'}
			/>
			{category.map((item) => (
				<CategoryCard
					key={item}
					item={item}
					handleFilterByCategory={handleFilterByCategory}
					isActive={activeCategory === item}
				/>
			))}
		</ul>
	);
};

export default CategoryList;
