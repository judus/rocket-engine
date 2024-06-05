import UIComponent from "./UIComponent.js";

export default class LifeSupportUI extends UIComponent {
    constructor(label) {
        super();

        this.labelElement = document.createElement('h3');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        const athmosphere = document.createElement('div');
        athmosphere.className = 'flex athmosphere';

        this.athmospereLabel = document.createElement('div');
        this.athmospereLabel.textContent = `Athmosphere:`;
        athmosphere.appendChild(this.athmospereLabel);

        this.athmospereValue = document.createElement('div');
        this.athmospereValue.textContent = `98%`;
        athmosphere.appendChild(this.athmospereValue);

        const temperature = document.createElement('div');
        temperature.className = 'flex temperature';

        this.temperatureLabel = document.createElement('div');
        this.temperatureLabel.textContent = `Temperature:`;
        temperature.appendChild(this.temperatureLabel);

        this.temperatureLabel = document.createElement('div');
        this.temperatureLabel.textContent = `0°C`;
        temperature.appendChild(this.temperatureLabel);

        this.element.appendChild(athmosphere);
        this.element.appendChild(temperature);

        this.element.className = 'life-support ui-component max-width-small font-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('globalTemperature.update', (globalTemperature) => {
            this.updateGlobalTemperature(globalTemperature);
        });
    }

    updateGlobalTemperature(globalTemperature) {
        this.temperatureLabel.textContent = `${globalTemperature.toFixed(2)}°C`;
    }
}
