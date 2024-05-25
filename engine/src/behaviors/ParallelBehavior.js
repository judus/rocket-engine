import Behavior from "./Behavior.js";
/*
const station = new Station(dataStoreManager, eventBus, x, y, id);
const produceGoodsBehavior = new ProduceGoodsBehavior();
const defendBehavior = new DefendBehavior();

// Parallel behavior example
const stationBehavior = new ParallelBehavior([produceGoodsBehavior, defendBehavior]);
station.setBehavior(stationBehavior);
 */
export default class ParallelBehavior extends Behavior {
    constructor(behaviors) {
        super();
        this.behaviors = behaviors;
    }

    perform(entity) {
        for(const behavior of this.behaviors) {
            behavior.perform(entity);
        }
    }
}