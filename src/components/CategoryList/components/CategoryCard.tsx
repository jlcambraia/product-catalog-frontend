import styles from './CategoryCard.module.css';
import { CategoryProps } from '@/types/types';
import { showCategory } from '@/utils/validators/validators';

const CategoryCard = ({
	item = 'Todos',
	handleFilterByCategory,
	isActive,
}: CategoryProps) => {
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
