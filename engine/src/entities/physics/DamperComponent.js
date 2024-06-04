import BaseComponent from "../../abstracts/BaseComponent.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import ShipComponent from "./ShipComponent.js";

export default class DamperComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Inertia Dampers';
        const profile = profiles[defaultProfile];
    }
}
