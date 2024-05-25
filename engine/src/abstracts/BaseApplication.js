import EngineBase from "./EngineBase.js";

export default class BaseApplication extends EngineBase {
    // This method should be overridden by subclasses
    update(deltaTime, tickCount, currentTime) {
        throw new Error('Method "update" should be implemented by the subclass');
    }
}
