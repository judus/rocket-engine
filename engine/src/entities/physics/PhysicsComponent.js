import BaseComponent from '../../abstracts/BaseComponent.js';
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";

export default class PhysicsComponent extends BaseComponent {
    update(deltaTime) {
        super.update(deltaTime);
        CustomPhysics2D.update(this.entity, deltaTime);
    }
}
