import ShipComponent from './ShipComponent.js';

export default class CoolingSystemComponent extends ShipComponent {
    constructor(profiles, priority, initialProfile, label = null) {
        super(profiles, initialProfile, priority, label);
        this.label = 'Cooling System';
        this.dissipationFactor = profiles[initialProfile].dissipationFactor || 1; // Initial dissipation factor
    }
}
