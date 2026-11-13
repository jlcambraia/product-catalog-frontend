class Api {
  async _request(path, options = {}) {
    const res = await fetch(`/api${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
      cache: "no-store",
    });
    let data;
    try { data = await res.json(); } catch { data = { message: "Invalid server response" }; }
    if (!res.ok) throw new Error(data.message || `Request failed: ${res.status}`);
    return data;
  }
  getProducts() { return this._request("/products"); }
  createProduct(product) { return this._request("/products", { method: "POST", body: JSON.stringify(product) }); }
  deleteProduct(id) { return this._request(`/products/${id}`, { method: "DELETE", body: "{}" }); }
  updateProductStock(id, stock) { return this._request(`/products/${id}/stock`, { method: "PATCH", body: JSON.stringify({ stock }) }); }
}
export default new Api();
