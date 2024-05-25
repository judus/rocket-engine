export default class DrawHelper {

    /**
     * Draws a rectangle on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x - The x coordinate of the rectangle.
     * @param {number} y - The y coordinate of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {string} [fillColor='black'] - The fill color of the rectangle.
     * @param {string} [strokeColor=null] - The stroke color of the rectangle (optional).
     * @param {number} [lineWidth=1] - The width of the stroke line (optional).
     */
    static drawRectangle(ctx, x, y, width, height, fillColor = 'black', strokeColor = null, lineWidth = 1) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
        if(strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(x, y, width, height);
        }
    }

    /**
     * Draws a circle on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x - The x coordinate of the center of the circle.
     * @param {number} y - The y coordinate of the center of the circle.
     * @param {number} radius - The radius of the circle.
     * @param {string} [fillColor='black'] - The fill color of the circle.
     * @param {string} [strokeColor=null] - The stroke color of the circle (optional).
     * @param {number} [lineWidth=1] - The width of the stroke line (optional).
     */
    static drawCircle(ctx, x, y, radius, fillColor = 'black', strokeColor = null, lineWidth = 1) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        if(strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }

    /**
     * Draws a polygon on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Array<{x: number, y: number}>} vertices - The vertices of the polygon.
     * @param {string} [fillColor='black'] - The fill color of the polygon.
     * @param {string} [strokeColor=null] - The stroke color of the polygon (optional).
     * @param {number} [lineWidth=1] - The width of the stroke line (optional).
     */
    static drawPolygon(ctx, vertices, fillColor = 'black', strokeColor = null, lineWidth = 1) {
        if(vertices.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        vertices.slice(1).forEach(vertex => ctx.lineTo(vertex.x, vertex.y));
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        if(strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }

    /**
     * Draws a line on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x1 - The x coordinate of the start of the line.
     * @param {number} y1 - The y coordinate of the start of the line.
     * @param {number} x2 - The x coordinate of the end of the line.
     * @param {number} y2 - The y coordinate of the end of the line.
     * @param {string} [color='black'] - The color of the line.
     * @param {number} [width=1] - The width of the line.
     */
    static drawLine(ctx, x1, y1, x2, y2, color = 'black', width = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    /**
     * Draws text on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {string} text - The text to draw.
     * @param {number} x - The x coordinate of the text.
     * @param {number} y - The y coordinate of the text.
     * @param {string} [color='black'] - The color of the text.
     * @param {string} [font='16px sans-serif'] - The font of the text.
     */
    static drawText(ctx, text, x, y, color = 'black', font = '16px sans-serif') {
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(text, x, y);
    }
}
