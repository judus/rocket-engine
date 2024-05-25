export default class AABB {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Checks if another AABB intersects with this AABB.
     * @param {AABB} aabb - The other AABB.
     * @returns {boolean} True if the AABBs intersect, false otherwise.
     */
    intersects(aabb) {
        return this.x < aabb.x + aabb.width &&
            this.x + this.width > aabb.x &&
            this.y < aabb.y + aabb.height &&
            this.y + this.height > aabb.y;
    }

    /**
     * Creates a copy of this AABB.
     * @returns {AABB} The copy of the AABB.
     */
    clone() {
        return new AABB(this.x, this.y, this.width, this.height);
    }

    /**
     * Returns a string representation of this AABB.
     * @returns {string} The string representation.
     */
    toString() {
        return `AABB(x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height})`;
    }

    /**
     * Checks if this AABB is equal to another AABB.
     * @param {AABB} aabb - The other AABB.
     * @returns {boolean} True if the AABBs are equal, false otherwise.
     */
    equals(aabb) {
        return this.x === aabb.x && this.y === aabb.y &&
            this.width === aabb.width && this.height === aabb.height;
    }
}
