export default class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    /**
     * Calculates the length of the line.
     * @returns {number} The length of the line.
     */
    length() {
        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Checks if a point is on the line segment.
     * @param {number} px - The x coordinate of the point.
     * @param {number} py - The y coordinate of the point.
     * @returns {boolean} True if the point is on the line segment, false otherwise.
     */
    containsPoint(px, py) {
        const d1 = Math.sqrt((px - this.x1) ** 2 + (py - this.y1) ** 2);
        const d2 = Math.sqrt((px - this.x2) ** 2 + (py - this.y2) ** 2);
        const lineLength = this.length();
        return Math.abs(d1 + d2 - lineLength) < 0.0001; // Allowing a small tolerance
    }

    /**
     * Creates a copy of this line.
     * @returns {Line} The copy of the line.
     */
    clone() {
        return new Line(this.x1, this.y1, this.x2, this.y2);
    }

    /**
     * Returns a string representation of this line.
     * @returns {string} The string representation.
     */
    toString() {
        return `Line(x1: ${this.x1}, y1: ${this.y1}, x2: ${this.x2}, y2: ${this.y2})`;
    }

    /**
     * Checks if this line is equal to another line.
     * @param {Line} line - The other line.
     * @returns {boolean} True if the lines are equal, false otherwise.
     */
    equals(line) {
        return this.x1 === line.x1 && this.y1 === line.y1 && this.x2 === line.x2 && this.y2 === line.y2;
    }
}
