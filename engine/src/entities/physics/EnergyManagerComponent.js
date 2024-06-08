import BaseComponent from "../../abstracts/BaseComponent.js";

export default class EnergyManagerComponent extends BaseComponent {
    constructor() {
        super();
        this.components = [];
        this.totalEnergyCost = 0;
        this.availableEnergy = 0;
        this.eventBusListenerAdded = false;
    }

    registerComponent(component, energyCostMW, priority) {
        this.components.push(component);
        this.components.sort((a, b) => a.priority - b.priority);
        this.totalEnergyCost += energyCostMW * 1000000; // Convert MW to J/s

        // Ensure the component.toggle event listener is added only once
        if(!this.eventBusListenerAdded) {
            this.entity.eventBus.on('component.toggle', this.toggleComponent.bind(this));
            this.eventBusListenerAdded = true;
        }
    }

    toggleComponent(componentName) {
        const component = this.components.find(info => info.label === componentName);
        if(component) {
            component.userRequestedState = !component.userRequestedState;
            // console.log(`${component.label} userRequestedState: ${component.userRequestedState}`);
            this.manageEnergyConsumption();
        }
    }

    updateEnergy(availableEnergy) {
        this.availableEnergy = availableEnergy;
        this.manageEnergyConsumption();
    }

    manageEnergyConsumption() {
        let currentEnergy = this.availableEnergy;
        let stateChanged = false;


        this.components.forEach(component => {
            //console.log(`Component: ${component.label}, userRequestedState: ${component.userRequestedState}, isActive: ${component.isActive}`);

            if(component.userRequestedState && currentEnergy >= component.energyCost) {

                if(!component.isActive) {
                    component.isActive = true;
                    component.activate();
                    stateChanged = true;
                }
                currentEnergy -= component.energyCost;
            } else {
                if(component.isActive) {
                    component.isActive = false;
                    component.deactivate();
                    stateChanged = true;
                }
            }
        });

        if(stateChanged) {
            if (this.entity.id === 'player') {
                this.entity.eventBus.emit('component.update', this.getComponentStates());
            }
        }
    }

    getComponentStates() {
        return this.components.map(component => ({
            name: component.label,
            isActive: component.isActive,
            userRequestedState: component.userRequestedState,
            energyCost: component.energyCost / 1000000, // Convert back to MW
            temperature: component.currentTemperature,
            isOverheated: component.currentTemperature >= component.maxTemperature,
        }));
    }

    update(deltaTime) {
        this.manageEnergyConsumption();
    }
}
