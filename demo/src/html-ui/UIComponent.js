export default class UIComponent {
    constructor() {
        this.ui = null;
        this.element = document.createElement('div');
        this.element.className = 'ui-component';
    }

    onAdd(ui) {
        this.ui = ui;
        this.ui.container.appendChild(this.element);
    }

    onRemove() {
        this.element.remove();
    }

    update(deltaTime) {
        // To be overridden by subclasses
    }
}
