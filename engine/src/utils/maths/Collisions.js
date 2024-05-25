export default class Collisions {
    /**
     * Checks if two rectangles intersect.
     * @param {Rectangle} rectA - The first rectangle.
     * @param {Rectangle} rectB - The second rectangle.
     * @returns {boolean} True if the rectangles intersect, false otherwise.
     */
    static rectanglesIntersect(rectA, rectB) {
        return rectA.x < rectB.x + rectB.width &&
            rectA.x + rectA.width > rectB.x &&
            rectA.y < rectB.y + rectB.height &&
            rectA.y + rectA.height > rectB.y;
    }

    /**
     * Checks if two circles intersect.
     * @param {Circle} circleA - The first circle.
     * @param {Circle} circleB - The second circle.
     * @returns {boolean} True if the circles intersect, false otherwise.
     */
    static circlesIntersect(circleA, circleB) {
        const dx = circleA.x - circleB.x;
        const dy = circleA.y - circleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= circleA.radius + circleB.radius;
    }

    /**
     * Checks if a rectangle and a circle intersect.
     * @param {Rectangle} rect - The rectangle.
     * @param {Circle} circle - The circle.
     * @returns {boolean} True if the rectangle and circle intersect, false otherwise.
     */
    static rectangleCircleIntersect(rect, circle) {
        const dx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const dy = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        const distance = Math.sqrt((circle.x - dx) ** 2 + (circle.y - dy) ** 2);
        return distance <= circle.radius;
    }
}
