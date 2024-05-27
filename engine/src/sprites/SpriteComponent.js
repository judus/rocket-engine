import BaseComponent from "../abstracts/BaseComponent.js";

export default class SpriteComponent extends BaseComponent {
    constructor(spriteSheet, frameIndex = 0) {
        super();
        this.spriteSheet = spriteSheet;
        this.frameIndex = frameIndex;
    }

    setFrame(index) {
        this.frameIndex = index;
    }

    getFrame() {
        return this.spriteSheet.getFrame(this.frameIndex);
    }
}
