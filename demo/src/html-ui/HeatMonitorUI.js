import UIComponent from "./UIComponent.js";

export default class HeatMonitorUI extends UIComponent {
    constructor(label) {
        super();
        this.label = label;

        this.labelElement = document.createElement('h3');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.globalTempElement = document.createElement('div');
        this.globalTempElement.textContent = `Global Temperature: 0°C`;
        this.element.appendChild(this.globalTempElement);

        this.listElement = document.createElement('ul');
        this.element.appendChild(this.listElement);

        this.element.className = 'ui-component max-width-small font-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('heat.update', (heatData) => {
            this.updateList(heatData);
        });
        this.ui.eventBus.on('globalTemperature.update', (globalTemperature) => {
            this.updateGlobalTemperature(globalTemperature);
        });
    }

    updateList(heatData) {
        console.log('heat.update', heatData);
        this.listElement.innerHTML = '';
        for(let i = heatData.length - 1; i >= 0; i--) {
            const data = heatData[i];
            const listItem = document.createElement('li');
            if(data.temperature !== undefined && data.isOverheated !== undefined) {
                listItem.textContent = `${data.name}: ${data.temperature.toFixed(2)}°C`;
                listItem.className = data.isOverheated ? 'is-overheated' : 'is-normal';
                this.listElement.appendChild(listItem);
            } else {
                console.warn(`Incomplete heat data for ${data.name}`, data);
            }
        }
    }

    updateGlobalTemperature(globalTemperature) {
        console.log('globalTemperature.update', globalTemperature);
        this.globalTempElement.textContent = `Global Temperature: ${globalTemperature.toFixed(2)}°C`;
    }
}
