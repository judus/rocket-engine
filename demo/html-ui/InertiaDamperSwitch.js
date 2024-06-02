import UIComponent from "./UIComponent.js";

export default class InertiaDamperSwitch extends UIComponent {
    constructor(label, initialState = false) {
        super();
        this.state = initialState;

        this.labelElement = document.createElement('label');
        this.labelElement.textContent = `${label}`;
        this.element.appendChild(this.labelElement);

        this.switchButton = document.createElement('button');
        this.switchButton.textContent = this.state ? 'ON' : 'OFF';
        this.switchButton.className = this.state ? 'is-on' : 'is-off';
        this.switchButton.addEventListener('click', () => this.toggleState());
        this.element.appendChild(this.switchButton);

        this.element.className = 'ui-component max-width-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('component.inertiaDamper.update', (data) => {
            this.setState(data.state);
        });
    }

    setState(state) {
        this.state = state;
        this.switchButton.textContent = this.state ? 'ON' : 'OFF';
        this.switchButton.className = this.state ? 'is-on' : 'is-off';
    }

    toggleState() {
        this.setState(!this.state);
        this.ui.eventBus.emit('switch:stateChange', {state: this.state});
    }
}
