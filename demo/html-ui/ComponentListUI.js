import UIComponent from "./UIComponent.js";

export default class ComponentListUI extends UIComponent {
    constructor(label) {
        super();
        this.label = label;

        this.labelElement = document.createElement('h3');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.listElement = document.createElement('ul');
        this.element.appendChild(this.listElement);

        this.element.className = 'ui-component max-width-small font-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('component.update', (components) => {
            console.log('component.update');
            this.updateList(components);
        });
    }

    updateList(components) {
        this.listElement.innerHTML = '';
        for(let i = components.length - 1; i >= 0; i--) {
            const component = components[i];
            const listItem = document.createElement('li');
            listItem.textContent = `${component.name}`;
            listItem.className = component.isActive ? 'is-active' : 'is-inactive';
            this.listElement.appendChild(listItem);
        }
    }
}
