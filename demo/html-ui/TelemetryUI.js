import UIComponent from "./UIComponent.js";

export default class TelemetryUI extends UIComponent {
    constructor(label) {
        super();

        this.containerElement = document.createElement('div');
        this.containerElement.className = 'component-telemetry';
        this.element.appendChild(this.containerElement);

        this.labelElement = document.createElement('label');
        this.labelElement.textContent = `${label}`;
        this.containerElement.appendChild(this.labelElement);

        this.speedElement = document.createElement('div');
        this.containerElement.appendChild(this.speedElement);

        this.maxSpeedElement = document.createElement('div');
        this.containerElement.appendChild(this.maxSpeedElement);

        this.positionElement = document.createElement('div');
        this.containerElement.appendChild(this.positionElement);

        this.accelerationElement = document.createElement('div');
        this.containerElement.appendChild(this.accelerationElement);

        this.gForceElement = document.createElement('div');
        this.containerElement.appendChild(this.gForceElement);

        this.massElement = document.createElement('div');
        this.containerElement.appendChild(this.massElement);

        this.maxValues = {
            speed: 0,
            gForce: 0,
        };

        this.maxValueTimeouts = {
            speed: null,
            gForce: null,
        };

        this.element.className = 'ui-component max-width-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('telemetry.update', (telemetryData) => {
            this.updateTelemetry(telemetryData);
        });
    }

    updateTelemetry(telemetryData) {
        const {speed, position, acceleration, gForce, mass} = telemetryData;

        this.speedElement.textContent = `Speed: ${speed.toFixed(2)} km/h`;
        this.positionElement.textContent = `Position: x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
        this.accelerationElement.textContent = `Acceleration: x: ${acceleration.x.toFixed(2)}, y: ${acceleration.y.toFixed(2)}, z: ${acceleration.z.toFixed(2)}`;
        this.gForceElement.textContent = `G-Force: ${gForce.toFixed(2)} G`;
        this.massElement.textContent = `Mass: ${mass.toFixed(2)} kg`;

        this.updateMaxValue('speed', speed);
        this.updateMaxValue('gForce', gForce);
    }

    updateMaxValue(type, value) {
        if(value > this.maxValues[type]) {
            this.maxValues[type] = value;
            this.updateMaxValueDisplay(type);

            if(this.maxValueTimeouts[type]) {
                clearTimeout(this.maxValueTimeouts[type]);
            }

            this.maxValueTimeouts[type] = setTimeout(() => {
                this.maxValues[type] = 0;
                this.updateMaxValueDisplay(type);
            }, 60 * 1000); // Display the max value for 1min
        }
    }

    updateMaxValueDisplay(type) {
        if(type === 'speed') {
            this.maxSpeedElement.textContent = `Max Speed: ${this.maxValues.speed.toFixed(2)} km/h`;
        } else if(type === 'gForce') {
            this.maxSpeedElement.textContent = `Max G-Force: ${this.maxValues.gForce.toFixed(2)} G`;
        }
    }
}
