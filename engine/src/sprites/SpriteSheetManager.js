import SpriteSheet from "./SpriteSheet.js";

export default class SpriteSheetManager {
    constructor() {
        this.spriteSheets = new Map();
    }

    loadSpriteSheet(key, imageUrl, frameWidth, frameHeight) {
        const spriteSheet = new SpriteSheet(imageUrl, frameWidth, frameHeight);
        this.spriteSheets.set(key, spriteSheet);
        return spriteSheet;
    }

    getSpriteSheet(key) {
        return this.spriteSheets.get(key);
    }
}
