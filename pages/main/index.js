import { ProductCardComponent } from "../../components/product-card/index.js";
import { NavbarComponent } from "../../components/navbar/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=600&auto=format&fit=crop", // Заменишь потом на реальные фото
                title: "Турбовентиляторный двигатель CFM56",
                shortText: "Самый распространенный двигатель для Boeing 737 и Airbus A320.",
                price: "По запросу"
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1559685959-19fcbda3d100?q=80&w=600&auto=format&fit=crop",
                title: "Основная стойка шасси B737",
                shortText: "В сборе с пневматиками и тормозными механизмами.",
                price: "$45,000"
            },
            {
                id: 3,
                src: "https://images.unsplash.com/photo-1533076127163-f27a4d662df9?q=80&w=600&auto=format&fit=crop",
                title: "Авионика Garmin G1000",
                shortText: "Интегрированная система приборного оборудования ('стеклянная кабина').",
                price: "$28,000"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="container d-flex flex-wrap gap-4 justify-content-center pb-5"></div>
        `;
    }

    // Click processing
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = ''; 
        
        // Navigation Render
        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        // page container Render
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Crds Render
        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}