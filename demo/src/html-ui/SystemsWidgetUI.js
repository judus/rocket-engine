import UIComponent from "./UIComponent.js";

export default class SystemsWidgetUI extends UIComponent {
    constructor(label) {
        super();
        this.label = label;

        this.labelElement = document.createElement('h3');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.listElement = document.createElement('ul');
        this.element.appendChild(this.listElement);

        this.element.className = 'ui-component max-width-small font-small';
        this.componentElements = {}; // Store references to component elements
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('heat.update', (heatData) => {
            this.updateList(heatData);
        });
    }

    createComponentElement(data) {
        const listItem = document.createElement('li');
        listItem.className = 'component';

        const label = document.createElement('div');
        label.className = 'component-label';
        label.textContent = data.name;
        listItem.appendChild(label);

        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex';

        if(data.name === 'Reactor') {
            const specialMetric = document.createElement('div');
            specialMetric.className = 'component-special';
            specialMetric.textContent = `Special Metric: ${data.specialMetric}`;
            flexContainer.appendChild(specialMetric);
        } else {
            const energy = document.createElement('div');
            energy.className = 'component-energy';
            energy.textContent = `${data.energyCost.toFixed(2)} MW`;
            flexContainer.appendChild(energy);
        }

        const temperature = document.createElement('div');
        temperature.className = 'component-temperature';
        temperature.textContent = `${data.temperature.toFixed(2)}°C`;
        flexContainer.appendChild(temperature);

        const button = document.createElement('button');
        button.textContent = data.health <= 0 ? 'Repair' : (data.userRequestedState ? 'Deactivate' : 'Activate');
        button.onclick = () => this.toggleComponent(data.name);

        listItem.appendChild(flexContainer);
        listItem.appendChild(button);

        this.listElement.appendChild(listItem);

        this.componentElements[data.name] = {listItem, label, flexContainer, temperature, button};
    }

    updateComponentElement(data) {
        const {listItem, flexContainer, temperature, button} = this.componentElements[data.name];

        if(data.name === 'Reactor') {
            const specialMetric = flexContainer.querySelector('.component-special');
            specialMetric.textContent = ``;
        } else {
            const energy = flexContainer.querySelector('.component-energy');
            energy.textContent = `${data.energyCost.toFixed(2)} MW`;
        }

        temperature.textContent = `${data.temperature.toFixed(2)}°C`;
        button.textContent = data.health <= 0 ? 'Repair' : (data.userRequestedState ? 'Deactivate' : 'Activate');

        // Set the appropriate class based on the component state
        let className = 'component';
        if(data.isActive) className += ' is-active';
        if(data.isOverheated) className += ' is-overheated';
        if(data.health <= 0) className += ' is-broken';
        listItem.className = className;
    }

    updateList(heatData) {
        heatData.forEach(data => {
            if(!this.componentElements[data.name]) {
                this.createComponentElement(data);
            } else {
                this.updateComponentElement(data);
            }
        });
    }

    updateGlobalTemperature(globalTemperature) {
        console.log('globalTemperature.update', globalTemperature);
        this.globalTempElement.textContent = `Global Temperature: ${globalTemperature.toFixed(2)}°C`;
    }

    toggleComponent(componentName) {
        // Emit an event to toggle the component's activation state
        this.ui.eventBus.emit('component.toggle', componentName);
    }
}
