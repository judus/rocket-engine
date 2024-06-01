import BaseComponent from "../../abstracts/BaseComponent.js";

export default class AttackComponent extends BaseComponent {
    constructor() {
        super();
    }

    attack() {
        throw new Error('Attack method not implemented.');
    }
}
