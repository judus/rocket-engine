import BaseComponent from '../../abstracts/BaseComponent.js';

class ComponentInfo {
    constructor(component, energyCostMW, priority) {
        this.component = component;
        this.energyCost = energyCostMW * 1000000; // Convert MW to J/s
        this.priority = priority;
        this.isActive = false;
    }
}

export default class EnergyManagerComponent extends BaseComponent {
    constructor() {
        super();
        this.components = [];
        this.totalEnergyCost = 0;
        this.availableEnergy = 0;
    }

    registerComponent(component, energyCostMW, priority) {
        this.components.push(new ComponentInfo(component, energyCostMW, priority));
        this.components.sort((a, b) => a.priority - b.priority);
        this.totalEnergyCost += energyCostMW * 1000000; // Convert MW to J/s
    }

    updateEnergy(availableEnergy) {
        this.availableEnergy = availableEnergy;
        this.manageEnergyConsumption();
    }

    allocateEnergy(energyCost) {
        if(this.availableEnergy >= energyCost) {
            this.availableEnergy -= energyCost;
            return true;
        }
        return false;
    }

    consumeEnergy(energyAmount) {
        if(this.availableEnergy >= energyAmount) {
            this.availableEnergy -= energyAmount;
            return true;
        }
        return false;
    }

    manageEnergyConsumption() {
        let currentEnergy = this.availableEnergy;
        let stateChanged = false;

        this.components.forEach(info => {
            if(currentEnergy >= info.energyCost) {
                if(!info.isActive) {
                    info.component.activate();
                    info.isActive = true;
                    stateChanged = true;
                }
                currentEnergy -= info.energyCost;
            } else {
                if(info.isActive) {
                    info.component.deactivate();
                    info.isActive = false;
                    stateChanged = true;
                }
            }
        });

        if(stateChanged) {
            this.entity.eventBus.emit('component.update', this.getComponentStates());
        }
    }

    getComponentStates() {
        return this.components.map(info => ({
            name: info.component.label,
            isActive: info.isActive
        }));
    }

    update(deltaTime) {
        this.manageEnergyConsumption();
    }
}
