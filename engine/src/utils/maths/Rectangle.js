export default class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Sets the position and dimensions of the rectangle.
     * @param {number} x - The x coordinate of the rectangle.
     * @param {number} y - The y coordinate of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     */
    set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Checks if a point is contained within the rectangle.
     * @param {number} px - The x coordinate of the point.
     * @param {number} py - The y coordinate of the point.
     * @returns {boolean} True if the point is within the rectangle, false otherwise.
     */
    containsPoint(px, py) {
        return px >= this.x && px <= this.x + this.width &&
            py >= this.y && py <= this.y + this.height;
    }

    /**
     * Checks if another rectangle intersects with this rectangle.
     * @param {Rectangle} rect - The other rectangle.
     * @returns {boolean} True if the rectangles intersect, false otherwise.
     */
    intersects(rect) {
        return this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y;
    }

    /**
     * Calculates the area of the rectangle.
     * @returns {number} The area of the rectangle.
     */
    area() {
        return this.width * this.height;
    }

    /**
     * Creates a copy of this rectangle.
     * @returns {Rectangle} The copy of the rectangle.
     */
    clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /**
     * Returns a string representation of this rectangle.
     * @returns {string} The string representation.
     */
    toString() {
        return `Rectangle(x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height})`;
    }

    /**
     * Checks if this rectangle is equal to another rectangle.
     * @param {Rectangle} rect - The other rectangle.
     * @returns {boolean} True if the rectangles are equal, false otherwise.
     */
    equals(rect) {
        return this.x === rect.x && this.y === rect.y &&
            this.width === rect.width && this.height === rect.height;
    }
}
