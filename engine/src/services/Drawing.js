import EntityTransform from "./EntityTransform.js";

export default class Drawing {
    static identityMatrix() {
        return [1, 0, 0, 1, 0, 0];
    }

    static resetTransform() {
        return Drawing.identityMatrix();
    }

    static scale(transformMatrix, sx, sy) {
        const newMatrix = transformMatrix.slice();
        newMatrix[0] *= sx;
        newMatrix[3] *= sy;
        return newMatrix;
    }

    static translate(transformMatrix, tx, ty) {
        const newMatrix = transformMatrix.slice();
        newMatrix[4] += tx;
        newMatrix[5] += ty;
        return newMatrix;
    }

    static applyTransform(vertices, transformMatrix) {
        return vertices.map(vertex => {
            const x = vertex.x * transformMatrix[0] + vertex.y * transformMatrix[2] + transformMatrix[4];
            const y = vertex.x * transformMatrix[1] + vertex.y * transformMatrix[3] + transformMatrix[5];
            return {x, y};
        });
    }

    static applyCameraAndZoom(camera) {
        let transformMatrix = Drawing.resetTransform();
        transformMatrix = Drawing.scale(transformMatrix, camera.zoomLevel, camera.zoomLevel);
        transformMatrix = Drawing.translate(transformMatrix, -camera.pos.x * camera.zoomLevel, -camera.pos.y * camera.zoomLevel);
        return transformMatrix;
    }

    static drawPolygon(context, vertices, color) {
        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);

        for(let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x, vertices[i].y);
        }

        context.closePath();
        context.fillStyle = color || '#755015';
        context.fill();
    }

    static draw(context, entity, camera, color) {
        let transformMatrix = Drawing.applyCameraAndZoom(camera);
        const transformedVertices = EntityTransform.updateVertices(entity, entity.polygon);
        const finalVertices = Drawing.applyTransform(transformedVertices, transformMatrix);
        Drawing.drawPolygon(context, finalVertices, color);
    }
}
