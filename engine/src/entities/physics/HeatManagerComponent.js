import BaseComponent from '../../abstracts/BaseComponent.js';

class HeatProducer {
    constructor(component, heatProductionRate, maxTemperature) {
        this.component = component;
        this.heatProductionRate = heatProductionRate;
        this.maxTemperature = maxTemperature;
        this.currentTemperature = 0;
        this.health = component.health || 100; // Default health if not provided in the component
    }

    addHeat(amount) {
        console.log(`${this.component.label} temperature: ${this.currentTemperature}`);
        this.currentTemperature = Math.min(this.maxTemperature, this.currentTemperature + amount);
    }

    dissipateHeat(dissipationRate) {
        this.currentTemperature = Math.max(0, this.currentTemperature - dissipationRate);
    }

    isOverheated() {
        return this.currentTemperature >= this.maxTemperature;
    }
}

export default class HeatManagerComponent extends BaseComponent {
    constructor(maxHeat, globalDissipationRate) {
        super();
        this.maxHeat = maxHeat;
        this.globalDissipationRate = globalDissipationRate;
        this.currentHeat = 0;
        this.heatProducers = [];
    }

    registerHeatProducer(component, heatProductionRate, maxTemperature) {
        console.log(`Registering heat producer: ${component.label}`, maxTemperature)
        console.log(component);
        this.heatProducers.push(new HeatProducer(component, heatProductionRate, maxTemperature));
    }

    unregisterHeatProducer(component) {
        this.heatProducers = this.heatProducers.filter(producer => producer.component !== component);
    }

    addHeat(amount) {
        this.currentHeat = Math.min(this.maxHeat, this.currentHeat + amount);
    }

    dissipateHeat(deltaTime) {
        this.currentHeat = Math.max(0, this.currentHeat - this.globalDissipationRate * deltaTime);

        // Also dissipate heat from individual components
        this.heatProducers.forEach(producer => {
            producer.dissipateHeat(this.globalDissipationRate * deltaTime);
        });
    }

    applyDamage() {
        if(this.heatProducers.length === 0) {
            return;
        }

        // Sort heat producers by heat production rate in descending order
        this.heatProducers.sort((a, b) => b.heatProductionRate - a.heatProductionRate);

        // Find the highest heat producer that is active
        for(let producer of this.heatProducers) {
            if(producer.component.isActive) {
                producer.health -= 35;
                console.warn(`${producer.component.label} takes 35 damage due to overheating! Health remaining: ${producer.health}`);
                if(producer.health <= 0) {
                    producer.component.deactivate();
                    console.warn(`${producer.component.label} has broken down due to overheating!`);
                }
                break; // Only apply damage to the highest heat producer
            }
        }
    }

    dropHeatSink() {
        this.entity.hasComponent('cargo', (cargoBay) => {
            const heatSink = cargoBay.removeCargo('heatSink');
            if(heatSink) {
                const heatReduction = heatSink.heatReduction;
                this.currentHeat = Math.max(0, this.currentHeat - heatReduction);
                console.log(`Heat sink dropped! Current heat: ${this.currentHeat}`);
            } else {
                console.warn('No heat sinks available in cargo bay.');
            }
        });
    }

    update(deltaTime) {
        let totalHeatProduced = 0;

        this.heatProducers.forEach(producer => {
            if(producer.component.isActive) {
                producer.addHeat(producer.heatProductionRate * deltaTime);
                totalHeatProduced += producer.heatProductionRate * deltaTime;
            }
        });

        this.addHeat(totalHeatProduced);

        // Apply damage if current heat exceeds max heat
        if(this.currentHeat >= this.maxHeat) {
            this.applyDamage();
        }

        this.dissipateHeat(deltaTime);
    }
}
