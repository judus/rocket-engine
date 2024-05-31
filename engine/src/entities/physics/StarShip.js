import Entity2D from "./Entity2D.js";
import EngineComponent from "./EngineComponent.js";
import PowerPlantComponent from "./PowerPlantComponent.js";
import InertiaDamperComponent from "./InertiaDamperComponent.js";
import EngineControllerComponent from "./EngineControllerComponent.js";

export default class StarShip extends Entity2D {
    constructor(engine, config) {
        super(engine, config);
        this.addComponent('engine', new EngineComponent(config.engineProfile), 1);
        this.addComponent('powerPlant', new PowerPlantComponent(config.maxEnergy, config.rechargeRate), 1);
        this.addComponent('inertiaDamper', new InertiaDamperComponent(config.damperSettings), 1);
        this.addComponent('engineController', new EngineControllerComponent(), 1);
    }
}
