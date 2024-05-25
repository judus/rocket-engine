export default class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Adds another vector to this vector.
     * @param {Vector3D} vector - The vector to add.
     * @returns {Vector3D} The resulting vector.
     */
    add(vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    /**
     * Subtracts another vector from this vector.
     * @param {Vector3D} vector - The vector to subtract.
     * @returns {Vector3D} The resulting vector.
     */
    subtract(vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    /**
     * Multiplies this vector by a scalar or another vector.
     * @param {number|Vector3D} value - The scalar or vector to multiply by.
     * @returns {Vector3D} The resulting vector.
     */
    multiply(value) {
        if(value instanceof Vector3D) {
            return new Vector3D(this.x * value.x, this.y * value.y, this.z * value.z);
        } else {
            return new Vector3D(this.x * value, this.y * value, this.z * value);
        }
    }

    /**
     * Divides this vector by a scalar or another vector.
     * @param {number|Vector3D} value - The scalar or vector to divide by.
     * @returns {Vector3D} The resulting vector.
     */
    divide(value) {
        if(value instanceof Vector3D) {
            return new Vector3D(this.x / value.x, this.y / value.y, this.z / value.z);
        } else {
            return new Vector3D(this.x / value, this.y / value, this.z / value);
        }
    }

    /**
     * Calculates the dot product of this vector and another vector.
     * @param {Vector3D} vector - The other vector.
     * @returns {number} The dot product.
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    /**
     * Calculates the cross product of this vector and another vector.
     * @param {Vector3D} vector - The other vector.
     * @returns {Vector3D} The resulting vector.
     */
    cross(vector) {
        return new Vector3D(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    /**
     * Calculates the magnitude (length) of this vector.
     * @returns {number} The magnitude of the vector.
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Normalizes this vector (makes it a unit vector).
     * @returns {Vector3D} The normalized vector.
     */
    normalize() {
        const magnitude = this.magnitude();
        if(magnitude === 0) {
            return new Vector3D(0, 0, 0);
        }
        return this.divide(magnitude);
    }

    /**
     * Calculates the distance between this vector and another vector.
     * @param {Vector3D} vector - The other vector.
     * @returns {number} The distance between the vectors.
     */
    distance(vector) {
        return Math.sqrt(
            (this.x - vector.x) * (this.x - vector.x) +
            (this.y - vector.y) * (this.y - vector.y) +
            (this.z - vector.z) * (this.z - vector.z)
        );
    }

    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector3D} vector - The other vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    /**
     * Creates a copy of this vector.
     * @returns {Vector3D} The copy of the vector.
     */
    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }

    /**
     * Returns a string representation of this vector.
     * @returns {string} The string representation.
     */
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    /**
     * Sets the components of this vector.
     * @param {number} x - The x component.
     * @param {number} y - The y component.
     * @param {number} z - The z component.
     * @returns {Vector3D} The updated vector.
     */
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
}
