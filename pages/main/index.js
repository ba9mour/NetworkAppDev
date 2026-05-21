import { ProductCardComponent } from "../../components/product-card/index.js";
import { NavbarComponent } from "../../components/navbar/index.js";
import { ProductPage } from "../product/index.js";

import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4 mb-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="input-group shadow-sm">
                            <input type="text" id="search-input" class="form-control border-0 p-3" placeholder="Поиск авиазапчастей по названию...">
                            <button class="btn btn-aero px-4" id="search-btn">Найти</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="main-page" class="container d-flex flex-wrap gap-4 justify-content-center pb-5">
                <div class="mt-5 text-secondary">Загрузка каталога авиазапчастей...</div>
            </div>
        `;
    }

    // getData принимает title
    getData(title = '') {
        ajax.get(stockUrls.getStocks(title), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Ошибка при получении данных с сервера. Статус:', status);
                this.pageRoot.innerHTML = `
                    <div class="alert alert-danger mt-5 text-center w-100" role="alert">
                        Не удалось загрузить каталог запчастей. Проверьте сервер.
                    </div>
                `;
            }
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';
        
        if (items.length === 0) {
            this.pageRoot.innerHTML = '<h5 class="mt-5 text-muted">По вашему запросу ничего не найдено.</h5>';
            return;
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = ''; 
        
        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Подключаем слушатель на кнопку поиска
        document.getElementById('search-btn').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            this.pageRoot.innerHTML = '<div class="mt-5 text-secondary">Поиск...</div>';
            this.getData(query); // Отправляем запрос с фильтром
        });

        // Первичная загрузка всех данных
        this.getData();
    }
}