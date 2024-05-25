export default class Maths {

    /**
     * Scales a number by a saturation factor and adjusts it within the range of n2.
     * @param {number} n1 - The number to scale.
     * @param {number} n2 - The range within which to adjust the scaled number.
     * @param {number} saturation - The saturation factor by which to scale n1.
     * @returns {number} - The scaled and adjusted number.
     */
    static scale(n1, n2, saturation) {
        return (n1 * saturation) * (n2 / 10);
    }

    /**
     * Scales a number based on its fractional part, modifies it by a saturation,
     * then adjusts and rounds it within the range of n2.
     * @param {number} n1 - The number to scale.
     * @param {number} n2 - The range within which to adjust the scaled number.
     * @param {number} saturation - The saturation factor that modifies the fractional part.
     * @returns {number} - The scaled, adjusted, and rounded number.
     */
    static fractionAdjustedScale(n1, n2, saturation) {
        return Math.round((n1 - Math.floor(n1) * saturation * 10) * (n2 / 10));
    }

    /**
     * Computes a smooth transition between two edges based on an interpolation factor.
     * @param {number} edge0 - The lower edge of the transition.
     * @param {number} edge1 - The upper edge of the transition.
     * @param {number} x - The interpolation factor.
     * @returns {number} - The smoothed step value.
     */
    static smoothStep(edge0, edge1, x) {
        x = Maths.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        return x * x * (3 - 2 * x);
    }

    /**
     * Clamps a value between a lower and an upper limit.
     * @param {number} x - The value to clamp.
     * @param {number} lowerlimit - The lower boundary to clamp to.
     * @param {number} upperlimit - The upper boundary to clamp to.
     * @returns {number} - The clamped value.
     */
    static clamp(x, lowerlimit, upperlimit) {
        if(x < lowerlimit) x = lowerlimit;
        else if(x > upperlimit) x = upperlimit;
        return x;
    }

    /**
     * Maps a number from one range to another and optionally clamps it within the new range.
     * @param {number} n - The number to map.
     * @param {number} start1 - The lower bound of the original range.
     * @param {number} stop1 - The upper bound of the original range.
     * @param {number} start2 - The lower bound of the target range.
     * @param {number} stop2 - The upper bound of the target range.
     * @param {boolean} withinBounds - Whether to clamp the result within the target range.
     * @returns {number} - The mapped (and optionally clamped) value.
     */
    static map(n, start1, stop1, start2, stop2, withinBounds) {
        const x = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        return withinBounds ? Maths.clamp(x, Math.min(start2, stop2), Math.max(start2, stop2)) : x;
    }
}
