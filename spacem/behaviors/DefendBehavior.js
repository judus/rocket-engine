import Behavior from "./Behavior.js";

export default class DefendBehavior extends Behavior {
    perform(entity) {
        // Defense logic
        console.log(`${entity.id} is defending`);
        // Mark as complete if there's a condition for completion
    }

    isComplete(entity) {
        // Return true if the defense is complete
        return false;
    }
}