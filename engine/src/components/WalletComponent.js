import BaseComponent from "./BaseComponent.js";
export default class WalletComponent extends BaseComponent {
    /**
     * WalletComponent constructor.
     * @param {number} initialAmount - The initial amount of money in the wallet.
     */
    constructor(initialAmount) {
        super();
        this.balance = initialAmount;
    }

    /**
     * Adds money to the wallet.
     * @param {number} amount - The amount to add.
     */
    addMoney(amount) {
        this.balance += amount;
    }

    /**
     * Removes money from the wallet.
     * @param {number} amount - The amount to remove.
     * @returns {boolean} True if the amount was successfully removed, false otherwise.
     */
    removeMoney(amount) {
        if(this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    update(deltaTime) {
        // Logic to update the wallet each frame (if needed)
    }

    receiveMessage(message, data) {
        // Logic to handle messages sent to the component (if needed)
    }

    onAdd() {
        // Logic to execute when the component is added to an entity
    }

    onRemove() {
        // Logic to execute when the component is removed from an entity
    }
}
