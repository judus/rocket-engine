export default class Drawing {
    constructor(color) {
        this.color = color;
        this.transformMatrix = this.identityMatrix();
    }

    identityMatrix() {
        return [1, 0, 0, 1, 0, 0];
    }

    resetTransform() {
        this.transformMatrix = this.identityMatrix();
    }

    scale(sx, sy) {
        this.transformMatrix[0] *= sx;
        this.transformMatrix[3] *= sy;
    }

    translate(tx, ty) {
        this.transformMatrix[4] += tx;
        this.transformMatrix[5] += ty;
    }

    applyTransform(vertices) {
        return vertices.map(vertex => {
            const x = vertex.x * this.transformMatrix[0] + vertex.y * this.transformMatrix[2] + this.transformMatrix[4];
            const y = vertex.x * this.transformMatrix[1] + vertex.y * this.transformMatrix[3] + this.transformMatrix[5];
            return {x, y};
        });
    }

    applyCameraAndZoom(camera) {
        this.resetTransform();
        this.scale(camera.zoomLevel, camera.zoomLevel);
        this.translate(-camera.pos.x * camera.zoomLevel, -camera.pos.y * camera.zoomLevel);
    }

    drawPolygon(context, vertices) {

        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);

        for(let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x, vertices[i].y);
        }

        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    draw(context, entity, camera) {
        const transformComponent = entity.getComponent('transform');
        if(transformComponent) {
            this.applyCameraAndZoom(camera);
            const transformedVertices = transformComponent.applyTransform(entity.definition.vertices);
            const finalVertices = this.applyTransform(transformedVertices);
            this.drawPolygon(context, finalVertices);
        }
    }
}
