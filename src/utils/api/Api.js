class Api {
	constructor({ baseUrl, headers, makeRequest }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
		this._makeRequest = makeRequest;
	}

	_handleResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
	}

	async getProducts() {
		const res = await this._makeRequest(`${this._baseUrl}/products`, {
			method: 'GET',
			headers: this._headers,
		});
		return await this._handleResponse(res);
	}

	async createProduct(product) {
		const newProduct = await this._makeRequest(`${this._baseUrl}/products`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: product.name,
				price: product.price,
				description: product.description,
				image: product.image,
				category: product.category,
				stock: product.stock,
			}),
		});
		return await this._handleResponse(newProduct);
	}

	async deleteProduct(productId) {
		const deletedProduct = await this._makeRequest(
			`${this._baseUrl}/products/${productId}`,
			{
				method: 'DELETE',
				headers: this._headers,
			}
		);
		return await this._handleResponse(deletedProduct);
	}

	async toggleLikeProduct(productId, currentIsLiked) {
		const toggleLike = await this._makeRequest(
			`${this._baseUrl}/products/${productId}`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					isLiked: !currentIsLiked,
				}),
			}
		);
		return await this._handleResponse(toggleLike);
	}

	async updateProductStock(productId, newStock) {
		const res = await this._makeRequest(
			`${this._baseUrl}/products/${productId}/stock`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({ stock: newStock }),
			}
		);
		return await this._handleResponse(res);
	}
}

const apiConfig = {
	baseUrl: process.env.NEXT_PUBLIC_MAINAPI_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	makeRequest: (...args) => fetch(...args),
};

const api = new Api(apiConfig);

export default api;
