import HtmlUI from "./HtmlUI.js";
import SmallWidgetComponent from "./SmallWidgetComponent.js";
import InertiaDamperSwitch from "./InertiaDamperSwitch.js";

export default class Cockpit extends HtmlUI {
    constructor(engine, currentEntity) {
        super(engine, currentEntity);
        this.container = document.getElementById('rocket-hud');
        this.dataStoreManager = this.engine.dataStoreManager();
        this.entities = this.dataStoreManager.getStore("entities");
        this.currentEntity = null;

        this.eventBus.on("controlEntity", (entityId) => {
            this.currentEntity = this.entities.get(entityId);
        });

        this.addComponent('progressBar', new SmallWidgetComponent('Energy', 100), 1/ 60);
        this.addComponent('inertiaDamper', new InertiaDamperSwitch('Inertia Dampers', true), 100);
    }
}