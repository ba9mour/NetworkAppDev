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
    async getData() {
        try {
            const { data, ok } = await ajax.get(stockUrls.getStockById(this.id));
            if (ok && data) {
                this.originalData = data; // Запоминаем для диффинга
                this.renderData(data);
            } else {
                this.pageRoot.innerHTML = '<h3 class="text-danger mt-5">Деталь не найдена</h3>';
            }
        } catch (error) {
            this.pageRoot.innerHTML = '<h3 class="text-danger mt-5">Сетевая ошибка сервера</h3>';
        }
    }

    // 2. PATCH-запрос: сохранение с умной очередью
    async saveData(updatedFields) {
        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = true;
        saveBtn.innerText = 'Синхронизация...';

        const tasks = []; 

        try {
            // А. Краткое описание -> Моментальный запрос
            if (updatedFields.shortText !== this.originalData.shortText) {
                const task = ajax.patch(stockUrls.updateStockById(this.id), { shortText: updatedFields.shortText })
                    .then(() => console.log("1. Краткое описание обновлено."));
                tasks.push(task);
            }

            // Б. Цена -> Запрос с задержкой 10 сек
            if (updatedFields.price !== this.originalData.price) {
                const task = new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        try {
                            await ajax.patch(stockUrls.updateStockById(this.id), { price: updatedFields.price });
                            console.log("2. Цена обновлена (прошло 10 сек).");
                            resolve();
                        } catch (e) {
                            reject(e); 
                        }
                    }, 10000); 
                });
                tasks.push(task);
            }

            // Ждем завершения задач в очереди
            await Promise.all(tasks);

            // В. Название или полное описание -> Выполняется СТРОГО ПОСЛЕ очереди
            if (updatedFields.title !== this.originalData.title || updatedFields.fullText !== this.originalData.fullText) {
                await ajax.patch(stockUrls.updateStockById(this.id), { 
                    title: updatedFields.title,
                    fullText: updatedFields.fullText 
                });
                console.log("3. Название/Полное описание обновлено.");
            }

            // Возвращаемся в каталог
            this.clickBack();

        } catch (error) {
            alert('Сбой при сохранении данных: ' + error.message);
            saveBtn.disabled = false;
            saveBtn.innerText = 'Сохранить';
        }
    }

    // 3. DELETE-запрос: переведен на async/await для ЛР6
    async deleteData() {
        const delBtn = document.getElementById('delete-btn');
        delBtn.disabled = true;
        delBtn.innerText = 'Удаление...';

        try {
            const { ok, status } = await ajax.delete(stockUrls.removeStockById(this.id));
            if (ok) {
                this.clickBack();
            } else {
                alert('Ошибка при удалении. Статус: ' + status);
                delBtn.disabled = false;
                delBtn.innerText = 'Удалить';
            }
        } catch (error) {
            alert('Сетевая ошибка при удалении: ' + error.message);
            delBtn.disabled = false;
            delBtn.innerText = 'Удалить';
        }
    }

    renderData(item) {
        this.pageRoot.innerHTML = '';
        const product = new ProductComponent(this.pageRoot);
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