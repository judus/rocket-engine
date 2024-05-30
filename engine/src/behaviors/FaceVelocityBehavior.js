import Behavior from './Behavior.js';
import EntityTransform from "../services/EntityTransform.js";

export default class FaceVelocityBehavior extends Behavior {
    perform(entity) {
        EntityTransform.faceVelocity(entity);
    }
}