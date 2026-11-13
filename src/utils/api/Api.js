class Api {
  async _request(path, options = {}) {
    const response = await fetch(`/api${path}`, {
      cache: 'no-store',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const payload = await response.json().catch(() => ({
      message: 'Resposta inválida do servidor',
    }));

    if (!response.ok) {
      throw new Error(payload.message || `Erro HTTP ${response.status}`);
    }

    return payload;
  }

  getProducts() {
    return this._request('/products');
  }

  createProduct(product) {
    return this._request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  deleteProduct(id) {
    return this._request(`/products/${id}`, {
      method: 'DELETE',
      body: '{}',
    });
  }

  updateProductStock(id, stock) {
    return this._request(`/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ stock }),
    });
  }
}

const api = new Api();
export default api;
