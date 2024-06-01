import Entity2D from "./Entity2D.js";

export default class Jammer extends Entity2D {
    constructor(engine) {
        const config = {
            type: 'jammer',
            width: 1,
            height: 1,
            pos: {x: 0, y: 0, z: 0},
            jamRadius: 100, // Example property
            energyConsumption: 10, // Example property
        };
        super(engine, config);
        this.jamRadius = config.jamRadius;
        this.energyConsumption = config.energyConsumption;
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
        console.log('Jammer activated.');
    }

    deactivate() {
        this.isActive = false;
        console.log('Jammer deactivated.');
    }

    jam() {
        if(this.isActive) {
            console.log(`Jamming signals within radius: ${this.jamRadius}`);
            // Logic to jam signals within the radius
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.isActive) {
            this.jam();
        }
    }
}
