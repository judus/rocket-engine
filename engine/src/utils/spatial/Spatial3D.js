export default class Spatial3D {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this.onChange = null;
        this.isUpdating = false;
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
        if(!this.isUpdating && this.onChange) {
            this.onChange();
        }
    }

    set y(value) {
        this._y = value;
        if(!this.isUpdating && this.onChange) {
            this.onChange();
        }
    }

    set z(value) {
        this._z = value;
        if(!this.isUpdating && this.onChange) {
            this.onChange();
        }
    }

    set(x, y, z) {
        this.isUpdating = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this.isUpdating = false;
        if(this.onChange) {
            this.onChange();
        }
    }
}
