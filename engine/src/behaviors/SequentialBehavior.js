import Behavior from "./Behavior.js";
/*
// Sequential behavior example
const ship = new Player(dataStoreManager, eventBus, x, y, id);
const burningBehavior = new BurningBehavior();
const explodingBehavior = new ExplodingBehavior();

const shipBehavior = new SequentialBehavior([burningBehavior, explodingBehavior]);
ship.setBehavior(shipBehavior);
 */
export default class SequentialBehavior extends Behavior {
    constructor(behaviors) {
        super();
        this.behaviors = behaviors;
        this.currentIndex = 0;
    }

    perform(entity) {
        if(this.currentIndex < this.behaviors.length) {
            const currentBehavior = this.behaviors[this.currentIndex];
            currentBehavior.perform(entity);

            // Check if the current behavior is complete and move to the next one if needed
            if(currentBehavior.isComplete && currentBehavior.isComplete(entity)) {
                this.currentIndex++;
            }
        }
    }

    isComplete(entity) {
        return this.currentIndex >= this.behaviors.length;
    }
}