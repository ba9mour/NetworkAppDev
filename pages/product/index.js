import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { NavbarComponent } from "../../components/navbar/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id); 
    }

    getData() {
        const db = [
            {
                id: 1,
                src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop",
                title: "Турбовентиляторный двигатель CFM56",
                fullText: "Авиационный двигатель производства CFM International. Обладает высочайшей надежностью и топливной эффективностью. Полностью готов к установке (QEC). Проведена бороскопия.",
                price: "По запросу"
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1559685959-19fcbda3d100?q=80&w=800&auto=format&fit=crop",
                title: "Основная стойка шасси B737",
                fullText: "Основная амортизационная стойка для семейства Boeing 737 NG. Поставляется с формулярами и историей технического обслуживания. Остаток ресурса: 18,000 циклов.",
                price: "$45,000"
            },
            {
                id: 3,
                src: "https://images.unsplash.com/photo-1533076127163-f27a4d662df9?q=80&w=800&auto=format&fit=crop",
                title: "Авионика Garmin G1000",
                fullText: "Комплект G1000 включает в себя два дисплея (PFD и MFD), интегрированные системы связи, навигации и GPS. Идеально подходит для модернизации кабины легких самолетов.",
                price: "$28,000"
            }
        ];

        return db.find(item => item.id === this.id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container pb-5"></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';


        const navbar = new NavbarComponent(this.parent);
        navbar.render();


        this.parent.insertAdjacentHTML('beforeend', this.getHTML());


        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));


        const data = this.getData();
        if (data) {
            const product = new ProductComponent(this.pageRoot);
            product.render(data);
        } else {
            this.pageRoot.innerHTML = '<h3 class="text-danger">Товар не найден</h3>';
        }
    }
}