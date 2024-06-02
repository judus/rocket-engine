import ProgressBarComponent from "./ProgressBarComponent.js";

export default class SmallWidgetComponent extends ProgressBarComponent {
    constructor(label, maxValue) {
        super(label, maxValue);

        this.element.className = 'ui-component max-width-small';

    }
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.progressBar.max = maxValue;
    }

    update(deltaTime) {
        if(this.ui.currentEntity) {
            this.ui.currentEntity.hasComponent('powerPlant', (powerPlant) => {
                this.setMaxValue(powerPlant.maxEnergy);
                this.setValue(powerPlant.energy);
            });
        }
    }
}
