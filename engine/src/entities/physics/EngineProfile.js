class EngineProfile {
    constructor(states) {
        this.states = states; // States with different settings for the engine
    }

    addState(name, settings) {
        this.states[name] = settings;
    }
}
