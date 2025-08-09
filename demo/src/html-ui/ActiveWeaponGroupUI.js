import UIComponent from "./UIComponent.js";

export default class ActiveWeaponGroupUI extends UIComponent {
    constructor() {
        super();
        this.groupElement = document.createElement('div');
        this.groupElement.className = 'active-weapon-group';
        this.element.appendChild(this.groupElement);

        this.element.className = 'ui-component max-width-small font-small';
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('activeGroup.update', (activeGroup) => {
            this.updateActiveGroup(activeGroup);
        });
    }

    updateActiveGroup(activeGroup) {
        this.groupElement.textContent = `Active Group: ${activeGroup}`;
    }
}
