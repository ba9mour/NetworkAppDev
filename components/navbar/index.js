export class NavbarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark navbar-aero mb-4 shadow-sm">
                <div class="container">
                    <span class="navbar-brand fw-bold">✈ AeroParts</span>
                    <div class="navbar-nav ms-auto">
                        <span class="nav-link active">Каталог запчастей</span>
                    </div>
                </div>
            </nav>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}