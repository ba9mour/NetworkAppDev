import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { NavbarComponent } from "../../components/navbar/index.js";
import { MainPage } from "../main/index.js";

import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id); 
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container pb-5">
                <div class="mt-5 text-secondary">Загрузка данных о запчасти...</div>
            </div>
        `;
    }

    // поиск детали по ID
    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                this.pageRoot.innerHTML = '<h3 class="text-danger mt-5">Деталь не найдена или ошибка сервера</h3>';
            }
        });
    }

    // деталь
    renderData(item) {
        this.pageRoot.innerHTML = '';
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = ''; 

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        // Создаем контейнер для кнопки назад, чтобы она не прилипала к контенту
        const backContainer = document.createElement('div');
        backContainer.className = 'container mt-4 mb-2';
        this.parent.appendChild(backContainer);
        
        const backButton = new BackButtonComponent(backContainer);
        backButton.render(this.clickBack.bind(this));

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        

        this.getData();
    }
}