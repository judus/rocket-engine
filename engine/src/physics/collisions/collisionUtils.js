// Helper function to get the edges of a polygon
function getEdges(vertices) {
    const edges = [];
    for(let i = 0; i < vertices.length; i++) {
        const nextIndex = (i + 1) % vertices.length;
        edges.push({
            x: vertices[nextIndex].x - vertices[i].x,
            y: vertices[nextIndex].y - vertices[i].y
        });
    }
    return edges;
}

// Helper function to get the perpendicular axis of an edge
function getPerpendicularAxis(edge) {
    return {x: -edge.y, y: edge.x};
}

// Helper function to project a polygon onto an axis
function projectPolygon(vertices, axis) {
    let min = Infinity;
    let max = -Infinity;
    for(const vertex of vertices) {
        const projection = (vertex.x * axis.x + vertex.y * axis.y) / (Math.sqrt(axis.x * axis.x + axis.y * axis.y));
        min = Math.min(min, projection);
        max = Math.max(max, projection);
    }
    return {min, max};
}

// Helper function to check if two projections overlap
function isOverlapping(proj1, proj2) {
    return proj1.max > proj2.min && proj2.max > proj1.min;
}

// SAT collision detection
export function isCollidingSAT(verticesA, verticesB) {
    const getAxes = vertices => {
        const axes = [];
        for(let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i];
            const p2 = vertices[(i + 1) % vertices.length];
            const edge = {x: p2.x - p1.x, y: p2.y - p1.y};
            axes.push({x: -edge.y, y: edge.x}); // Perpendicular vector
        }
        return axes;
    };

    const project = (vertices, axis) => {
        let min = axis.x * vertices[0].x + axis.y * vertices[0].y;
        let max = min;
        for(let i = 1; i < vertices.length; i++) {
            const projection = axis.x * vertices[i].x + axis.y * vertices[i].y;
            if(projection < min) {
                min = projection;
            }
            if(projection > max) {
                max = projection;
            }
        }
        return {min, max};
    };

    const isOverlapping = (projectionA, projectionB) => {
        return projectionA.min < projectionB.max && projectionA.max > projectionB.min;
    };

    const axesA = getAxes(verticesA);
    const axesB = getAxes(verticesB);
    const axes = axesA.concat(axesB);

    for(const axis of axes) {
        const projectionA = project(verticesA, axis);
        const projectionB = project(verticesB, axis);
        if(!isOverlapping(projectionA, projectionB)) {
            return false;
        }
    }
    return true;
}

