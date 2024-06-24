// InventoryComponent.js
import BaseComponent from "./BaseComponent.js";

export default class InventoryComponent extends BaseComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if(index !== -1) {
            this.items.splice(index, 1);
        }
    }

    update(deltaTime) {
        // Update inventory logic if needed
    }
}
