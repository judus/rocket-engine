import HtmlUI from "./HtmlUI.js";
import InertiaDamperSwitch from "./InertiaDamperSwitch.js";
import ComponentListUI from "./ComponentListUI.js";
import SmallWidgetComponent from "./SmallWidgetComponent.js";
import DetailedComponentListUI from "./DetailedComponentListUI.js";

export default class Cockpit extends HtmlUI {
    constructor(engine, currentEntity) {
        super(engine, currentEntity);
        this.container = document.getElementById('rocket-hud');
        this.dataStoreManager = this.engine.dataStoreManager();
        this.entities = this.dataStoreManager.getStore("entities");
        this.currentEntity = null;

        this.eventBus.on("controlEntity", (entityId) => {
            this.currentEntity = this.entities.get(entityId);
            this.updateComponentList();
        });

        this.addComponent('progressBar', new SmallWidgetComponent('Reactor', 100), 1 / 60);
        this.addComponent('inertiaDamper', new InertiaDamperSwitch('Inertia Dampers', true), 100);
        this.addComponent('componentList', new ComponentListUI('Components'), 1 / 60);
        //this.addComponent('detailedComponentList', new DetailedComponentListUI('Component Details'), 1 / 60);
    }

    updateComponentList() {
        if(this.currentEntity && this.currentEntity.getComponent) {
            const energyManager = this.currentEntity.getComponent('energyManager');
            if(energyManager) {
                const components = energyManager.getComponentStates();
                this.eventBus.emit('component.update', components);
            }
        }
    }
}
