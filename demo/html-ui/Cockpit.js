import HtmlUI from "./HtmlUI.js";
import InertiaDamperSwitch from "./InertiaDamperSwitch.js";
import PowerMeterUI from "./PowerMeterUI.js";
import SystemsWidgetUI from "./SystemsWidgetUI.js";
import LifeSupportUI from "./LifeSupportUI.js";
import TelemetryUI from "./TelemetryUI.js";
import WeaponSystemUI from "./WeaponSystemUI.js"; // Import the new component

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

        this.addComponent('lifeSupport', new LifeSupportUI('Life Support', 100), 1 / 60, 1, 'right');
        this.addComponent('power', new PowerMeterUI('Power', 100), 1 / 60, 1, 'right');
        this.addComponent('systems', new SystemsWidgetUI('Systems'), 1 / 60, 1, 'right');
        this.addComponent('weaponSystem', new WeaponSystemUI('Weapon System'), 1 / 60, 1, 'right');
        this.addComponent('telemetry', new TelemetryUI('Telemetry'), 1 / 60, 1, 'right'); // Add the TelemetryUI component
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

            this.currentEntity.hasComponent('mounts', (mounts) => {
                this.currentEntity.hasComponent('weaponSystem', (weaponSystem) => {
                    const mountLength = mounts.mounts.weapon.length;
                    const weaponGroups = weaponSystem.getWeaponGroups();
                    const activeGroup = weaponSystem.getActiveGroup();
                    this.components.weaponSystem.updateGroups(weaponGroups, activeGroup, mountLength);
                });
            });
        }
    }
}
