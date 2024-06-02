import UIComponent from "./UIComponent.js";

export default class ProgressBarComponent extends UIComponent {
    constructor(label, maxValue) {
        super();
        this.maxValue = maxValue;
        this.value = 0;

        this.labelElement = document.createElement('label');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.progressBar = document.createElement('progress');
        this.progressBar.className = 'progress-bar';
        this.progressBar.max = maxValue;
        this.progressBar.value = this.value;
        this.element.appendChild(this.progressBar);
    }

    setValue(value) {
        this.value = value;
        this.progressBar.value = value;
    }

    update(deltaTime) {
        if(this.ui.currentEntity) {
            this.ui.currentEntity.hasComponent('powerPlant', (powerPlant) => {
                this.setValue(powerPlant.energy);
            });
        }
    }
}
