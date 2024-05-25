import Behavior from "./Behavior.js";

export default class ProduceGoodsBehavior extends Behavior {
    perform(entity) {
        // Production logic
        console.log(`${entity.id} is producing goods`);
        // Mark as complete if there's a condition for completion
    }

    isComplete(entity) {
        // Return true if the production is complete
        return false;
    }
}