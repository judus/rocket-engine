import BaseComponent from '../../abstracts/BaseComponent.js';

export default class HeatManagerComponent extends BaseComponent {
    constructor(globalDissipationFactor = 0.1) { // Lower dissipation factor
        super();
        this.globalTemperature = 18; // Initial global temperature
        this.globalMaxTemperature = 50; // Max global temperature
        this.globalDissipationFactor = globalDissipationFactor; // Heat dissipation factor
        this.heatProducers = [];
    }

    registerHeatProducer(component, heatProductionRate, maxTemperature) {
        console.log(`Registering HeatProducer for ${component.label}`, {
            heatProductionRate,
            maxTemperature
        });

        this.heatProducers.push(component);
    }

    unregisterHeatProducer(component) {
        this.heatProducers = this.heatProducers.filter(producer => producer !== component);
    }

    addHeat(amount) {
        //console.log(`Adding global heat: ${amount}`);
        this.globalTemperature += amount;
        //console.log(`Global temperature: ${this.globalTemperature}°C`);
    }

    removeHeat(amount) {
        //console.log(`Removing global heat: ${amount}`);
        this.globalTemperature -= amount;
        //console.log(`Global temperature: ${this.globalTemperature}°C`);
    }

    setDissipationFactor(factor) {
        this.globalDissipationFactor = factor;
        //console.log(`Updated global dissipation factor: ${this.globalDissipationFactor}`);
    }

    update(deltaTime) {
        if(typeof deltaTime !== 'number' || isNaN(deltaTime) || deltaTime <= 0) {
            //console.error(`Invalid deltaTime: ${deltaTime}`);
            return;
        }

        let totalHeatProduced = 0;

        this.heatProducers.forEach(producer => {
            const heatProduced = producer.heatProductionRate * deltaTime * 0.01 * producer.maxTemperature;

            if(producer.isActive) {
                producer.addHeat(heatProduced);
                if(producer.currentTemperature >= producer.maxTemperature) {
                    this.addHeat(heatProduced);
                }
            } else {
                producer.removeHeat(heatProduced);
                if(producer.currentTemperature <= producer.maxTemperature * 0.5) {
                    this.removeHeat(heatProduced);
                }
            }

            producer.checkOverheat(deltaTime);
        });

        this.dissipateHeat(deltaTime);

        if(this.globalTemperature > this.globalMaxTemperature) {
            //console.warn('Global temperature exceeded maximum threshold!');
            // Implement additional game factor effects based on global temperature
        }

        // Emit heat.update event
        if(this.entity && this.entity.eventBus) {
            const heatData = this.heatProducers.map(producer => ({
                name: producer.label,
                temperature: producer.currentTemperature,
                isOverheated: producer.isOverheated(),
                energyCost: producer.energyCost / 1000000, // Convert back to MW
                isActive: producer.isActive,
                userRequestedState: producer.userRequestedState,
                health: producer.health
            }));
            this.entity.eventBus.emit('heat.update', heatData);
            this.entity.eventBus.emit('globalTemperature.update', this.globalTemperature);
        }
    }

    dissipateHeat(deltaTime) {
        const dissipationAmount = this.globalTemperature * this.globalDissipationFactor * deltaTime;
        this.globalTemperature = Math.max(18, this.globalTemperature - dissipationAmount);
        //console.log(`Dissipated heat: ${dissipationAmount}. Global temperature: ${this.globalTemperature}°C`);
    }
}
