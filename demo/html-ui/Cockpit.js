import HtmlUI from "./HtmlUI.js";
import InertiaDamperSwitch from "./InertiaDamperSwitch.js";
import PowerMeterUI from "./PowerMeterUI.js";
import SystemsWidgetUI from "./SystemsWidgetUI.js";
import LifeSupportUI from "./LifeSupportUI.js";

export default class Cockpit extends HtmlUI {
    constructor(engine, currentEntity) {
        super(engine, currentEntity);
        this.container = document.getElementById('rocket-hud');
        this.dataStoreManager = this.engine.dataStoreManager();
        this.entities = this.dataStoreManager.getStore("entities");
        this.currentEntity = null;

        this.eventBus.on("controlEntity", (entityId) => {
            this.currentEntity = this.entities.get(entityId);
            this.updateComponentUI();
        });

        this.eventBus.on('component.damper.stateChange', (isDamperActive) => {
            const primaryColor = isDamperActive ? 'rgba(206,149,65,0.8)' : 'rgba(20, 148, 189, 0.8)';
            document.documentElement.style.setProperty('--primary-color', primaryColor);
        });

        this.addComponent('lifeSupport', new LifeSupportUI('Life Support', 100), 1 / 60);
        this.addComponent('power', new PowerMeterUI('Power', 100), 1 / 60);
        this.addComponent('systems', new SystemsWidgetUI('Systems'), 1 / 60);
    }

    updateComponentUI() {
        if(this.currentEntity && this.currentEntity.getComponent) {
            const energyManager = this.currentEntity.getComponent('energyManager');
            if(energyManager) {
                const components = energyManager.getComponentStates();
                this.eventBus.emit('component.update', components);
            }

            const heatManager = this.currentEntity.getComponent('heatManager');
            if(heatManager) {
                const globalTemperature = heatManager.globalTemperature;
                this.eventBus.emit('globalTemperature.update', globalTemperature);
            }
        }
    }
}
