class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks(title = '') {
        const query = title ? `?title=${encodeURIComponent(title)}` : '';
        return `${this.baseUrl}/stocks${query}`;
    }

    // Получить конкретную запчасть по ID
    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    // Создать новую запчасть (POST)
    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    // Обновить запчасть (PATCH)
    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    // Удалить запчасть (DELETE)
    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();