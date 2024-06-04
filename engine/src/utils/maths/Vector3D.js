export default class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    set z(value) {
        this._z = value;
    }

    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;

        return this;
    }

    add(vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subtract(vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    multiply(value) {
        if(value instanceof Vector3D) {
            return new Vector3D(this.x * value.x, this.y * value.y, this.z * value.z);
        } else {
            return new Vector3D(this.x * value, this.y * value, this.z * value);
        }
    }

    divide(value) {
        if(value instanceof Vector3D) {
            return new Vector3D(this.x / value.x, this.y / value.y, this.z / value.z);
        } else {
            return new Vector3D(this.x / value, this.y / value, this.z / value);
        }
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        return new Vector3D(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        const magnitude = this.magnitude();
        if(magnitude === 0) {
            return new Vector3D(0, 0, 0);
        }
        return this.divide(magnitude);
    }

    distanceTo(vector) {
        return Math.sqrt(
            (this.x - vector.x) * (this.x - vector.x) +
            (this.y - vector.y) * (this.y - vector.y) +
            (this.z - vector.z) * (this.z - vector.z)
        );
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    /**
     * Rotates the vector around the Z-axis by the given angle (in radians).
     * @param {number} angle - The angle in radians.
     * @returns {Vector3D} The rotated vector.
     */
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        return new Vector3D(x, y, this.z);
    }
}
