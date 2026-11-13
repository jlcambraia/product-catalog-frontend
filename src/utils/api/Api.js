// Demo mutations are isolated to the visitor's browser; the backend is read-only.
const STORAGE_KEY = 'product-catalog-demo-changes-v1';

class Api {
  async _request(path) {
    const response = await fetch(`/api${path}`, { cache: 'no-store' });
    const payload = await response.json().catch(() => ({ message: 'Resposta inválida do servidor' }));
    if (!response.ok) throw new Error(payload.message || `Erro HTTP ${response.status}`);
    return payload;
  }

  _changes() {
    if (typeof window === 'undefined') return { added: [], removed: [], stocks: {} };
    try {
      const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
      return {
        added: Array.isArray(parsed.added) ? parsed.added : [],
        removed: Array.isArray(parsed.removed) ? parsed.removed : [],
        stocks: parsed.stocks && typeof parsed.stocks === 'object' ? parsed.stocks : {},
      };
    } catch {
      return { added: [], removed: [], stocks: {} };
    }
  }

  _save(changes) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
  }

  resetDemo() {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEY);
  }

  async getProducts() {
    const response = await this._request('/products');
    const changes = this._changes();
    const original = Array.isArray(response.data) ? response.data : [];
    return {
      ...response,
      data: [...original, ...changes.added]
        .filter(product => !changes.removed.includes(product._id))
        .map(product => changes.stocks[product._id] === undefined
          ? product : { ...product, stock: changes.stocks[product._id] }),
    };
  }

  async createProduct(product) {
    const changes = this._changes();
    const created = { ...product, _id: `demo-${crypto.randomUUID()}`, isLiked: false };
    changes.added.push(created);
    this._save(changes);
    return { data: created };
  }

  async deleteProduct(id) {
    const changes = this._changes();
    changes.removed.push(id);
    changes.added = changes.added.filter(product => product._id !== id);
    this._save(changes);
    return { data: { _id: id } };
  }

  async updateProductStock(id, amount) {
    if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Quantidade inválida');
    const changes = this._changes();
    const products = await this.getProducts();
    const product = products.data.find(item => item._id === id);
    if (!product) throw new Error('Produto não encontrado');
    if (product.stock < amount) throw new Error('Estoque insuficiente');
    const stock = product.stock - amount;
    changes.stocks[id] = stock;
    changes.added = changes.added.map(item => item._id === id ? { ...item, stock } : item);
    this._save(changes);
    return { data: { ...product, stock } };
  }
}
export default new Api();
