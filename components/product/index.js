export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3 shadow-sm border-0">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${data.title}">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body p-5">
                            <h2 class="card-title fw-bold mb-3">${data.title}</h2>
                            <span class="badge bg-secondary mb-3">Артикул: AP-${data.id}000</span>
                            <h4 class="text-primary mb-4">${data.price}</h4>
                            <p class="card-text fs-5">${data.fullText}</p>
                            <ul class="list-group list-group-flush mb-4 mt-4">
                                <li class="list-group-item bg-transparent"><strong>Состояние:</strong> Новое (OEM)</li>
                                <li class="list-group-item bg-transparent"><strong>Наличие:</strong> На складе в Москве</li>
                                <li class="list-group-item bg-transparent"><strong>Сертификат:</strong> EASA Form 1</li>
                            </ul>
                            <button class="btn btn-success btn-lg">Запросить поставку</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}