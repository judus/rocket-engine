import UIComponent from "./UIComponent.js";

export default class SwitchComponent extends UIComponent {
    constructor(label, initialState = false) {
        super();
        this.state = initialState;

        this.labelElement = document.createElement('label');
        this.labelElement.textContent = `${label}: `;
        this.element.appendChild(this.labelElement);

        this.switchButton = document.createElement('button');
        this.switchButton.textContent = this.state ? 'ON' : 'OFF';
        this.switchButton.addEventListener('click', () => this.toggleState());
        this.element.appendChild(this.switchButton);

        this.element.className = 'ui-component max-width-small';
    }

    setState(state) {
        this.state = state;
        this.switchButton.textContent = this.state ? 'ON' : 'OFF';
    }

    toggleState() {
        this.setState(!this.state);
        this.eventBus.emit('switch:stateChange', {state: this.state});
    }

}
