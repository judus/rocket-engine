export default class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds another vector to this vector.
     * @param {Vector2D} vector - The vector to add.
     * @returns {Vector2D} The resulting vector.
     */
    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    /**
     * Subtracts another vector from this vector.
     * @param {Vector2D} vector - The vector to subtract.
     * @returns {Vector2D} The resulting vector.
     */
    subtract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    /**
     * Multiplies this vector by a scalar or another vector.
     * @param {number|Vector2D} value - The scalar or vector to multiply by.
     * @returns {Vector2D} The resulting vector.
     */
    multiply(value) {
        if(value instanceof Vector2D) {
            return new Vector2D(this.x * value.x, this.y * value.y);
        } else {
            return new Vector2D(this.x * value, this.y * value);
        }
    }

    /**
     * Divides this vector by a scalar or another vector.
     * @param {number|Vector2D} value - The scalar or vector to divide by.
     * @returns {Vector2D} The resulting vector.
     */
    divide(value) {
        if(value instanceof Vector2D) {
            return new Vector2D(this.x / value.x, this.y / value.y);
        } else {
            return new Vector2D(this.x / value, this.y / value);
        }
    }

    /**
     * Calculates the dot product of this vector and another vector.
     * @param {Vector2D} vector - The other vector.
     * @returns {number} The dot product.
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calculates the magnitude (length) of this vector.
     * @returns {number} The magnitude of the vector.
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (makes it a unit vector).
     * @returns {Vector2D} The normalized vector.
     */
    normalize() {
        const magnitude = this.magnitude();
        if(magnitude === 0) {
            return new Vector2D(0, 0);
        }
        return this.divide(magnitude);
    }

    /**
     * Calculates the distance between this vector and another vector.
     * @param {Vector2D} vector - The other vector.
     * @returns {number} The distance between the vectors.
     */
    distance(vector) {
        return Math.sqrt(
            (this.x - vector.x) * (this.x - vector.x) +
            (this.y - vector.y) * (this.y - vector.y)
        );
    }

    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector2D} vector - The other vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    /**
     * Creates a copy of this vector.
     * @returns {Vector2D} The copy of the vector.
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Returns a string representation of this vector.
     * @returns {string} The string representation.
     */
    toString() {
        return `(${this.x}, ${this.y})`;
    }

    /**
     * Sets the components of this vector.
     * @param {number} x - The x component.
     * @param {number} y - The y component.
     * @returns {Vector2D} The updated vector.
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}
