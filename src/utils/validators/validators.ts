export const showPrice = (price: number | string): string => {
	const normalized =
		typeof price === 'string' ? price.replace(',', '.') : price;
	const value =
		typeof normalized === 'number' ? normalized : parseFloat(normalized);

	return 'R$ ' + value.toFixed(2).replace('.', ',');
};

export const showCategory = (category: string): string => {
	return category[0].toUpperCase() + category.slice(1).toLowerCase();
};
