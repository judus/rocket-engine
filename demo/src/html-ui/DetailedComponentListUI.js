import UIComponent from "./UIComponent.js";

export default class DetailedComponentListUI extends UIComponent {
    constructor(label) {
        super();
        this.label = label;

        this.labelElement = document.createElement('h3');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.listElement = document.createElement('ul');
        this.element.appendChild(this.listElement);

        this.element.className = 'ui-component max-width-large font-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('component.update', (components) => {
            this.updateList(components);
        });
    }

    updateList(components) {
        this.listElement.innerHTML = '';
        components.forEach(component => {
            console.log(component);
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${component.name}</strong><br>
                Status: ${component.isActive ? 'Active' : 'Inactive'}<br>
                Energy Cost: ${component.energyCost} MW
            `;
            listItem.className = component.isActive ? 'is-active' : 'is-inactive';
            this.listElement.appendChild(listItem);
        });
    }
}
