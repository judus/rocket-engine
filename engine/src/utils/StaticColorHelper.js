export default class StaticColorHelper {
    static setRGB(r, g, b, a = 1) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    static setHex(hex, a = 1) {
        const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if(match) {
            const r = parseInt(match[1], 16);
            const g = parseInt(match[2], 16);
            const b = parseInt(match[3], 16);
            return this.setRGB(r, g, b, a);
        }
        return null;
    }

    static setOpacity(color, alpha) {
        const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([01](?:\.\d+)?))?\)$/);
        if(match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            return this.setRGB(r, g, b, alpha);
        }
        return null;
    }
}
