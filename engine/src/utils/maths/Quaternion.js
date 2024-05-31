import Vector3D from './Vector3D';

export default class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    multiply(q) {
        return new Quaternion(
            this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
            this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
            this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
            this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w
        );
    }

    normalize() {
        const mag = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        this.w /= mag;
        this.x /= mag;
        this.y /= mag;
        this.z /= mag;
    }

    rotateVector(v) {
        const qVec = new Quaternion(0, v.x, v.y, v.z);
        const qConjugate = new Quaternion(this.w, -this.x, -this.y, -this.z);
        const qResult = this.multiply(qVec).multiply(qConjugate);
        return new Vector3D(qResult.x, qResult.y, qResult.z);
    }
}
