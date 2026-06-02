class StockUrls {
    constructor() {
        // http://localhost:3000/stocks'
        this.baseUrl = '/stocks'; 
    }

    getStocks(title = '') {
        return title ? `${this.baseUrl}?title=${title}` : this.baseUrl;
    }

    getStockById(id) {
        return `${this.baseUrl}/${id}`;
    }

    createStock() {
        return this.baseUrl;
    }

    updateStockById(id) {
        return `${this.baseUrl}/${id}`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/${id}`;
    }
}

export const stockUrls = new StockUrls();