class Transform {
    constructor(x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {
        this.position = {x, y};
        this.rotation = rotation; // in radians
        this.scale = {x: scaleX, y: scaleY};
    }

    /**
     * Translates the shape by a given amount.
     * @param {number} dx - The amount to translate along the x-axis.
     * @param {number} dy - The amount to translate along the y-axis.
     */
    translate(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }

    /**
     * Rotates the shape by a given angle.
     * @param {number} angle - The angle to rotate by in radians.
     */
    rotate(angle) {
        this.rotation += angle;
    }

    /**
     * Scales the shape by a given factor.
     * @param {number} sx - The scaling factor along the x-axis.
     * @param {number} sy - The scaling factor along the y-axis.
     */
    scale(sx, sy) {
        this.scale.x *= sx;
        this.scale.y *= sy;
    }

    /**
     * Applies the transform to a rectangle.
     * @param {Rectangle} rect - The rectangle to transform.
     */
    applyToRectangle(rect) {
        // Translate
        rect.x += this.position.x;
        rect.y += this.position.y;

        // Scale
        rect.width *= this.scale.x;
        rect.height *= this.scale.y;

        // Rotate
        // Rotation around the center of the rectangle
        const cx = rect.x + rect.width / 2;
        const cy = rect.y + rect.height / 2;
        const angle = this.rotation;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        rect.x = cx + (rect.x - cx) * cos - (rect.y - cy) * sin;
        rect.y = cy + (rect.x - cx) * sin + (rect.y - cy) * cos;
    }

    /**
     * Applies the transform to a polygon.
     * @param {Polygon} polygon - The polygon to transform.
     */
    applyToPolygon(polygon) {
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);

        polygon.vertices = polygon.vertices.map(vertex => {
            // Scale
            let x = vertex.x * this.scale.x;
            let y = vertex.y * this.scale.y;

            // Rotate
            const newX = x * cos - y * sin;
            const newY = x * sin + y * cos;

            // Translate
            return {
                x: newX + this.position.x,
                y: newY + this.position.y
            };
        });
    }

    /**
     * Applies the transform to a circle.
     * @param {Circle} circle - The circle to transform.
     */
    applyToCircle(circle) {
        // Translate
        circle.x += this.position.x;
        circle.y += this.position.y;

        // Scale (Uniform scaling for circles)
        circle.radius *= (this.scale.x + this.scale.y) / 2;
    }
}
