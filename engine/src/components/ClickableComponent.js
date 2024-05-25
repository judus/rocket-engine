import BaseComponent from "../abstracts/BaseComponent.js";
/**
 * ClickableComponent handles click events for an entity.
 */
export default class ClickableComponent extends BaseComponent {
    /**
     * Creates a ClickableComponent.
     * @param {Function} onClick - The function to call when the entity is clicked.
     */
    constructor(onClick) {
        super();
        this.onClick = onClick;
    }

    /**
     * Handles the click event.
     * @param {ScopedMouse} scopedMouse - The scoped mouse object.
     */
    handleClick(scopedMouse) {
        if(this.onClick) {
            this.onClick(scopedMouse, this.entity);
        }
    }
}
