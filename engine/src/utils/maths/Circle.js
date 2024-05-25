class Circle {
    constructor(x = 0, y = 0, radius = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    /**
     * Sets the position and radius of the circle.
     * @param {number} x - The x coordinate of the circle.
     * @param {number} y - The y coordinate of the circle.
     * @param {number} radius - The radius of the circle.
     */
    set(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    /**
     * Checks if a point is contained within the circle.
     * @param {number} px - The x coordinate of the point.
     * @param {number} py - The y coordinate of the point.
     * @returns {boolean} True if the point is within the circle, false otherwise.
     */
    containsPoint(px, py) {
        const dx = px - this.x;
        const dy = py - this.y;
        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    /**
     * Checks if another circle intersects with this circle.
     * @param {Circle} circle - The other circle.
     * @returns {boolean} True if the circles intersect, false otherwise.
     */
    intersects(circle) {
        const dx = circle.x - this.x;
        const dy = circle.y - this.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSum = this.radius + circle.radius;
        return distanceSquared <= radiusSum * radiusSum;
    }

    /**
     * Calculates the area of the circle.
     * @returns {number} The area of the circle.
     */
    area() {
        return Math.PI * this.radius * this.radius;
    }

    /**
     * Calculates the circumference of the circle.
     * @returns {number} The circumference of the circle.
     */
    circumference() {
        return 2 * Math.PI * this.radius;
    }

    /**
     * Creates a copy of this circle.
     * @returns {Circle} The copy of the circle.
     */
    clone() {
        return new Circle(this.x, this.y, this.radius);
    }

    /**
     * Returns a string representation of this circle.
     * @returns {string} The string representation.
     */
    toString() {
        return `Circle(x: ${this.x}, y: ${this.y}, radius: ${this.radius})`;
    }

    /**
     * Checks if this circle is equal to another circle.
     * @param {Circle} circle - The other circle.
     * @returns {boolean} True if the circles are equal, false otherwise.
     */
    equals(circle) {
        return this.x === circle.x && this.y === circle.y && this.radius === circle.radius;
    }
}
