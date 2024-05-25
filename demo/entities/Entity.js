import BaseEntity from "../../engine/src/entities/BaseEntity.js";
import PositionComponent from "../../engine/src/components/PositionComponent.js";
import RedDotComponent from "../components/RedDotComponent.js";
import GreenDotComponent from "../components/GreenDotComponent.js";

export default class Entity extends BaseEntity {
    constructor(x, y, color = 'red', id = null, type = 'entity') {
        super(id, type);

        this.addComponent('position', new PositionComponent(x, y));

        if(color === 'red') {
            this.addComponent('render', new RedDotComponent());
        } else {
            this.addComponent('render', new GreenDotComponent());
        }
    }
}
