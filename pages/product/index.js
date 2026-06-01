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

    // 1. GET-запрос: получаем данные для заполнения формы
    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                this.pageRoot.innerHTML = '<h3 class="text-danger mt-5">Деталь не найдена или ошибка сервера</h3>';
            }
        });
    }

    // 2. PATCH-запрос: отправляем измененные данные на сервер
    saveData(updatedFields) {
        // Меняем кнопку на состояние загрузки, чтобы пользователь не кликал дважды (UI/UX практика)
        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = true;
        saveBtn.innerText = 'Сохранение...';

        ajax.patch(stockUrls.updateStockById(this.id), updatedFields, (response, status) => {
            if (status === 200) {
                // Если сервер ответил 200 OK, возвращаемся на главную страницу каталога
                this.clickBack();
            } else {
                alert('Произошла ошибка при сохранении данных на сервере. Статус: ' + status);
                saveBtn.disabled = false;
                saveBtn.innerText = 'Сохранить изменения';
            }
        });
    }

// DELETE-запрос: удаляем запчасть
    deleteData() {
        const delBtn = document.getElementById('delete-btn');
        delBtn.disabled = true;
        delBtn.innerText = 'Удаление...';

        ajax.delete(stockUrls.removeStockById(this.id), (response, status) => {
            // Бэкенд на DELETE обычно возвращает статус 204 (No Content) или 200
            if (status === 204 || status === 200) {
                this.clickBack(); // Возвращаемся в каталог
            } else {
                alert('Ошибка при удалении. Статус: ' + status);
                delBtn.disabled = false;
                delBtn.innerText = 'Удалить';
            }
        });
    }

    renderData(item) {
        this.pageRoot.innerHTML = '';
        const product = new ProductComponent(this.pageRoot);
        // Передаем оба коллбэка с жесткой привязкой контекста this
        product.render(item, this.saveData.bind(this), this.deleteData.bind(this));
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = ''; 

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        const backContainer = document.createElement('div');
        backContainer.className = 'container mt-4 mb-2';
        this.parent.appendChild(backContainer);
        
        const backButton = new BackButtonComponent(backContainer);
        backButton.render(this.clickBack.bind(this));

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        this.getData();
    }
}