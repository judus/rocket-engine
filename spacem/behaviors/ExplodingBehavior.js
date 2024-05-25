import Behavior from "./Behavior";

export default class ExplodingBehavior extends Behavior {
    perform(entity) {
        // Explosion logic
        console.log(`${entity.id} is exploding`);
    }

    isComplete(entity) {
        // Return true when explosion is complete
        return true; // For example purposes, assume it completes immediately
    }
}