import BaseComponent from "../abstracts/BaseComponent.js";

export default class HealthComponent extends BaseComponent {
    constructor(maxHealth) {
        super();
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    takeDamage(amount) {
        this.currentHealth -= amount;
        if(this.currentHealth <= 0) {
            this.entity.destroy(); // Assume entities have a destroy method
        }
    }

    heal(amount) {
        this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth);
    }
}
