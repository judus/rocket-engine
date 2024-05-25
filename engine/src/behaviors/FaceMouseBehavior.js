import Behavior from "./Behavior.js";

export default class FaceMouseBehavior extends Behavior {
    constructor(mousePosition, camera) {
        super();
        this.mousePosition = mousePosition;
        this.camera = camera;
    }

    perform(entity) {
        const transformComponent = entity.getComponent('transform');
        if(transformComponent) {
            transformComponent.faceMouse(this.mousePosition, this.camera);
        }
    }
}