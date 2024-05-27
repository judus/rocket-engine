import SpriteSheet from "./SpriteSheet.js";

export default class SpriteSheetManager {
    constructor() {
        this.spriteSheets = new Map();
    }

    async loadSpriteSheet(key, imageUrl, frameWidth, frameHeight) {
        const spriteSheet = new SpriteSheet(imageUrl, frameWidth, frameHeight);
        await spriteSheet.loadImage(); // Ensure the image is loaded
        this.spriteSheets.set(key, spriteSheet);
        return spriteSheet;
    }

    getSpriteSheet(key) {
        return this.spriteSheets.get(key);
    }
}
