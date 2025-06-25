import styles from './CategoryCard.module.css';
import { CategoryProps } from '@/types/types';

const CategoryCard = ({
	item = 'Todos',
	handleFilterByCategory,
	isActive,
}: CategoryProps) => {
	const showCategory = (item: string): string => {
		return item[0].toUpperCase() + item.slice(1).toLowerCase();
	};

	return (
		<li
			className={`
        ${styles.card}
        ${isActive ? styles.cardActive : ''}
      `}
			onClick={() => handleFilterByCategory(item)}
		>
			<p>{showCategory(item)}</p>
		</li>
	);
};

export default CategoryCard;
