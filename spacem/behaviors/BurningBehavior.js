import Behavior from "./Behavior.js";

class BurningBehavior extends Behavior {
    perform(entity) {
        // Burning logic
        console.log(`${entity.id} is burning`);
    }

    isComplete(entity) {
        // Return true when burning is complete
        return true; // For example purposes, assume it completes immediately
    }
}