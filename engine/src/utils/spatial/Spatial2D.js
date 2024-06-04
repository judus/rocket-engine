export default class Spatial2D {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value;

    }

    set y(value) {
        this._y = value;

    }

    set(x, y) {
        this._x = x;
        this._y = y;

    }
}
