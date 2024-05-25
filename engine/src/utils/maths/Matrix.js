export default class Matrix {
    constructor(rows, cols, elements = []) {
        this.rows = rows;
        this.cols = cols;
        this.elements = elements.length ? elements : Array(rows * cols).fill(0);
    }

    /**
     * Adds another matrix to this matrix.
     * @param {Matrix} matrix - The matrix to add.
     * @returns {Matrix} The resulting matrix.
     */
    add(matrix) {
        if(this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error('Matrix dimensions must match for addition.');
        }
        const result = new Matrix(this.rows, this.cols);
        for(let i = 0; i < this.elements.length; i++) {
            result.elements[i] = this.elements[i] + matrix.elements[i];
        }
        return result;
    }

    /**
     * Subtracts another matrix from this matrix.
     * @param {Matrix} matrix - The matrix to subtract.
     * @returns {Matrix} The resulting matrix.
     */
    subtract(matrix) {
        if(this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error('Matrix dimensions must match for subtraction.');
        }
        const result = new Matrix(this.rows, this.cols);
        for(let i = 0; i < this.elements.length; i++) {
            result.elements[i] = this.elements[i] - matrix.elements[i];
        }
        return result;
    }

    /**
     * Multiplies this matrix by a scalar or another matrix.
     * @param {number|Matrix} value - The scalar or matrix to multiply by.
     * @returns {Matrix} The resulting matrix.
     */
    multiply(value) {
        if(value instanceof Matrix) {
            if(this.cols !== value.rows) {
                throw new Error('Matrix dimensions must match for multiplication.');
            }
            const result = new Matrix(this.rows, value.cols);
            for(let row = 0; row < this.rows; row++) {
                for(let col = 0; col < value.cols; col++) {
                    let sum = 0;
                    for(let i = 0; i < this.cols; i++) {
                        sum += this.elements[row * this.cols + i] * value.elements[i * value.cols + col];
                    }
                    result.elements[row * value.cols + col] = sum;
                }
            }
            return result;
        } else {
            const result = new Matrix(this.rows, this.cols);
            for(let i = 0; i < this.elements.length; i++) {
                result.elements[i] = this.elements[i] * value;
            }
            return result;
        }
    }

    /**
     * Transposes this matrix.
     * @returns {Matrix} The transposed matrix.
     */
    transpose() {
        const result = new Matrix(this.cols, this.rows);
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                result.elements[col * this.rows + row] = this.elements[row * this.cols + col];
            }
        }
        return result;
    }

    /**
     * Calculates the determinant of this matrix (only for 2x2 and 3x3 matrices).
     * @returns {number} The determinant.
     */
    determinant() {
        if(this.rows !== this.cols) {
            throw new Error('Determinant can only be calculated for square matrices.');
        }
        if(this.rows === 2) {
            return this.elements[0] * this.elements[3] - this.elements[1] * this.elements[2];
        } else if(this.rows === 3) {
            return (
                this.elements[0] * (this.elements[4] * this.elements[8] - this.elements[5] * this.elements[7]) -
                this.elements[1] * (this.elements[3] * this.elements[8] - this.elements[5] * this.elements[6]) +
                this.elements[2] * (this.elements[3] * this.elements[7] - this.elements[4] * this.elements[6])
            );
        } else {
            throw new Error('Determinant calculation is not supported for matrices larger than 3x3.');
        }
    }

    /**
     * Inverts this matrix (only for 2x2 and 3x3 matrices).
     * @returns {Matrix} The inverted matrix.
     */
    invert() {
        if(this.rows !== this.cols) {
            throw new Error('Inversion can only be performed on square matrices.');
        }
        if(this.rows === 2) {
            const det = this.determinant();
            if(det === 0) {
                throw new Error('Matrix is not invertible.');
            }
            const result = new Matrix(2, 2, [
                this.elements[3], -this.elements[1],
                -this.elements[2], this.elements[0]
            ]);
            return result.multiply(1 / det);
        } else if(this.rows === 3) {
            const det = this.determinant();
            if(det === 0) {
                throw new Error('Matrix is not invertible.');
            }
            const result = new Matrix(3, 3, [
                this.elements[4] * this.elements[8] - this.elements[5] * this.elements[7],
                this.elements[2] * this.elements[7] - this.elements[1] * this.elements[8],
                this.elements[1] * this.elements[5] - this.elements[2] * this.elements[4],
                this.elements[5] * this.elements[6] - this.elements[3] * this.elements[8],
                this.elements[0] * this.elements[8] - this.elements[2] * this.elements[6],
                this.elements[2] * this.elements[3] - this.elements[0] * this.elements[5],
                this.elements[3] * this.elements[7] - this.elements[4] * this.elements[6],
                this.elements[1] * this.elements[6] - this.elements[0] * this.elements[7],
                this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3]
            ]);
            return result.multiply(1 / det);
        } else {
            throw new Error('Inversion is not supported for matrices larger than 3x3.');
        }
    }

    /**
     * Creates an identity matrix of the given size.
     * @param {number} size - The size of the identity matrix.
     * @returns {Matrix} The identity matrix.
     */
    static identity(size) {
        const elements = Array(size * size).fill(0);
        for(let i = 0; i < size; i++) {
            elements[i * size + i] = 1;
        }
        return new Matrix(size, size, elements);
    }

    /**
     * Creates a translation matrix.
     * @param {number} tx - The translation along the x-axis.
     * @param {number} ty - The translation along the y-axis.
     * @param {number} tz - The translation along the z-axis (optional, default is 0).
     * @returns {Matrix} The translation matrix.
     */
    static translation(tx, ty, tz = 0) {
        const elements = [
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        ];
        return new Matrix(4, 4, elements);
    }

    /**
     * Creates a rotation matrix around the x-axis.
     * @param {number} angle - The angle in radians.
     * @returns {Matrix} The rotation matrix.
     */
    static rotationX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const elements = [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ];
        return new Matrix(4, 4, elements);
    }

    /**
     * Creates a rotation matrix around the y-axis.
     * @param {number} angle - The angle in radians.
     * @returns {Matrix} The rotation matrix.
     */
    static rotationY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const elements = [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ];
        return new Matrix(4, 4, elements);
    }

    /**
     * Creates a rotation matrix around the z-axis.
     * @param {number} angle - The angle in radians.
     * @returns {Matrix} The rotation matrix.
     */
    static rotationZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const elements = [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return new Matrix(4, 4, elements);
    }

    /**
     * Creates a scaling matrix.
     * @param {number} sx - The scaling factor along the x-axis.
     * @param {number} sy - The scaling factor along the y-axis.
     * @param {number} sz - The scaling factor along the z-axis (optional, default is 1).
     * @returns {Matrix} The scaling matrix.
     */
    static scaling(sx, sy, sz = 1) {
        const elements = [
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ];
        return new Matrix(4, 4, elements);
    }

    /**
     * Converts the matrix to a string representation.
     * @returns {string} The string representation.
     */
    toString() {
        let str = '';
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                str += this.elements[row * this.cols + col] + ' ';
            }
            str += '\n';
        }
        return str;
    }
}
