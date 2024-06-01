import BaseComponent from "../../abstracts/BaseComponent.js";
import EngineParts from "../../EngineParts.js";

export default class WorldScaleComponent extends BaseComponent {
    constructor() {
        super();
        this.scalingFactor = EngineParts.worldScale();
    }

    scaleProperties(entity) {
        entity.mass *= this.scalingFactor;
        entity.pos = entity.pos.multiply(this.scalingFactor);
        entity.velocity = entity.velocity.multiply(this.scalingFactor);
        entity.acceleration = entity.acceleration.multiply(this.scalingFactor);
        entity.momentOfInertia *= this.scalingFactor;
        entity.config.engineProfile.maxThrust *= this.scalingFactor;
        entity.config.engineProfile.maxTorque *= this.scalingFactor;
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.scaleProperties(entity);
    }
}
