import Behavior from "./Behavior.js";

export default class FaceTargetBehavior extends Behavior {
    constructor(target) {
        super();
        this.target = target;
    }

    perform(entity) {
        const transformComponent = entity.getComponent('transform');
        if(transformComponent) {
            transformComponent.faceTarget(this.target);
        }
    }
}