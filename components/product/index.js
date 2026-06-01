export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3 shadow-sm border-0">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="Фото запчасти">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body p-4 p-md-5">
                            <h5 class="text-muted mb-4">Редактирование (Артикул: AP-${data.id}000)</h5>
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold">Название запчасти</label>
                                <input type="text" id="edit-title" class="form-control" value="${data.title}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Цена</label>
                                <input type="text" id="edit-price" class="form-control" value="${data.price || ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Краткое описание</label>
                                <input type="text" id="edit-shortText" class="form-control" value="${data.shortText || ''}">
                            </div>
                            <div class="mb-4">
                                <label class="form-label fw-bold">Полное описание</label>
                                <textarea id="edit-fullText" class="form-control" rows="5">${data.fullText || ''}</textarea>
                            </div>
                            
                            <div class="d-flex gap-3">
                                <button id="save-btn" class="btn btn-aero btn-lg w-50 shadow-sm">Сохранить</button>
                                <button id="delete-btn" class="btn btn-outline-danger btn-lg w-50 shadow-sm">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, saveCallback, deleteCallback) {
        document.getElementById('save-btn').addEventListener('click', () => {
            const updatedData = {
                title: document.getElementById('edit-title').value,
                price: document.getElementById('edit-price').value,
                shortText: document.getElementById('edit-shortText').value,
                fullText: document.getElementById('edit-fullText').value
            };
            saveCallback(updatedData);
        });

        document.getElementById('delete-btn').addEventListener('click', () => {
            // Встроенная браузерная функция для защиты от случайных кликов
            if (confirm('Вы уверены, что хотите безвозвратно удалить эту деталь из каталога?')) {
                deleteCallback();
            }
        });
    }

    render(data, saveCallback, deleteCallback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, saveCallback, deleteCallback);
    }
}