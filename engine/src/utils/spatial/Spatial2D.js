export default class Spatial2D {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this.onChange = null;
        this.isUpdating = false;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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

    set(x, y) {
        this.isUpdating = true;
        this._x = x;
        this._y = y;
        this.isUpdating = false;
        if(this.onChange) {
            this.onChange();
        }
    }
}
