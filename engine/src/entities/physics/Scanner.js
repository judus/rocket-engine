import Entity2D from "./Entity2D.js";

export default class Scanner extends Entity2D {
    constructor(engine) {
        const config = {
            type: 'scanner',
            width: 1,
            height: 1,
            pos: {x: 0, y: 0, z: 0},
            scanRadius: 100, // Example property
        };
        super(engine, config);
        this.scanRadius = config.scanRadius;
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
        console.log('Scanner activated.');
    }

    deactivate() {
        this.isActive = false;
        console.log('Scanner deactivated.');
    }

    scan() {
        if(this.isActive) {
            console.log(`Scanning within radius: ${this.scanRadius}`);
            // Logic to scan the area and detect objects
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.isActive) {
            this.scan();
        }
    }
}
