import EngineBase from "./EngineBase.js";

export default class BasePlugin extends EngineBase {
    // This method should be overridden by subclasses
    init() {
        throw new Error('Method "init" should be implemented by the subclass');
    }
}
