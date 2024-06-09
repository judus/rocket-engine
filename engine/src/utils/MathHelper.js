export default class MathHelper {

    /**
     * Clamps a number between a minimum and maximum value.
     * @param {number} value - The number to clamp.
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} The clamped value.
     */
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * Linearly interpolates between two values.
     * @param {number} start - The start value.
     * @param {number} end - The end value.
     * @param {number} t - The interpolation factor (0.0 to 1.0).
     * @returns {number} The interpolated value.
     */
    static lerp(start, end, t) {
        return start + (end - start) * t;
    }

    /**
     * Converts degrees to radians.
     * @param {number} degrees - The value in degrees.
     * @returns {number} The value in radians.
     */
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Converts radians to degrees.
     * @param {number} radians - The value in radians.
     * @returns {number} The value in degrees.
     */
    static radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    /**
     * Generates a random integer between min (inclusive) and max (inclusive).
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} A random integer between min and max.
     */
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random float between min (inclusive) and max (inclusive).
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} A random float between min and max.
     */
    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Rounds a number to a specified number of decimal places.
     * @param {number} value - The number to round.
     * @param {number} decimals - The number of decimal places.
     * @returns {number} The rounded number.
     */
    static roundTo(value, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    /**
     * Calculates the distance between two points in 2D space.
     * @param {number} x1 - The x coordinate of the first point.
     * @param {number} y1 - The y coordinate of the first point.
     * @param {number} x2 - The x coordinate of the second point.
     * @param {number} y2 - The y coordinate of the second point.
     * @returns {number} The distance between the points.
     */
    static distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculates the factorial of a number.
     * @param {number} n - The number to calculate the factorial of.
     * @returns {number} The factorial of the number.
     */
    static factorial(n) {
        if(n < 0) return NaN;
        let result = 1;
        for(let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    /**
     * Checks if a number is a prime number.
     * @param {number} n - The number to check.
     * @returns {boolean} True if the number is prime, false otherwise.
     */
    static isPrime(n) {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 === 0 || n % 3 === 0) return false;
        for(let i = 5; i * i <= n; i += 6) {
            if(n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    }
}
