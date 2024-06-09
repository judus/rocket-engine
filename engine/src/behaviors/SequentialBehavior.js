import Behavior from "./Behavior.js";

export default class SequentialBehavior extends Behavior {
    constructor(behaviors, repeat = false) {
        super();
        this.behaviors = behaviors;
        this.currentIndex = 0;
        this.repeat = repeat; // Add a flag to indicate whether the sequence should repeat
    }

    perform(entity) {
        if(this.currentIndex < this.behaviors.length) {
            const currentBehavior = this.behaviors[this.currentIndex];
            currentBehavior.perform(entity);

            // Check if the current behavior is complete and move to the next one if needed
            if(currentBehavior.isComplete && currentBehavior.isComplete(entity)) {
                this.currentIndex++;
            }
        } else if(this.repeat) {
            this.currentIndex = 0; // Reset the sequence if repeat is enabled
        }
    }

    isComplete(entity) {
        return !this.repeat && this.currentIndex >= this.behaviors.length;
    }
}
