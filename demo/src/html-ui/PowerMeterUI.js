import ProgressBarComponent from "./ProgressBarComponent.js";

export default class PowerMeterUI extends ProgressBarComponent {
    constructor(label, maxValue) {
        super(label, maxValue);
        this.element.className = 'ui-component max-width-small';

    }
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.progressBar.max = maxValue;
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('reactor.update', (reactor) => {
            this.updatePowerMeter(reactor);
        });
    }

    updatePowerMeter(reactor) {
        this.setMaxValue(reactor.maxEnergy);
        this.setValue(reactor.energy);
    }
}
