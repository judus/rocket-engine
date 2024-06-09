export default class ColorHelper {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    setRGB(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }

    setHex(hex) {
        const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if(match) {
            this.r = parseInt(match[1], 16);
            this.g = parseInt(match[2], 16);
            this.b = parseInt(match[3], 16);
            this.a = 1;
        }
        return this;
    }

    setHSL(h, s, l, a = 1) {
        h /= 360;
        s /= 100;
        l /= 100;
        if(s === 0) {
            this.r = this.g = this.b = l * 255;
        } else {
            const hue2rgb = (p, q, t) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1 / 6) return p + (q - p) * 6 * t;
                if(t < 1 / 2) return q;
                if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            this.r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
            this.g = Math.round(hue2rgb(p, q, h) * 255);
            this.b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
        }
        this.a = a;
    }

    toHex() {
        const toHex = (value) => {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
    }

    toRGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    toRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    toHSL() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    lighten(amount) {
        const hsl = this.toHSL().match(/(\d+)/g);
        let h = parseInt(hsl[0]);
        let s = parseInt(hsl[1]);
        let l = parseInt(hsl[2]);
        l = Math.min(100, l + amount * 100);
        this.setHSL(h, s, l, this.a);
        return this;
    }

    darken(amount) {
        const hsl = this.toHSL().match(/(\d+)/g);
        let h = parseInt(hsl[0]);
        let s = parseInt(hsl[1]);
        let l = parseInt(hsl[2]);
        l = Math.max(0, l - amount * 100);
        console.log(`Darken - H: ${h}, S: ${s}, L: ${l}`); // Debugging output
        this.setHSL(h, s, l, this.a);
        return this;
    }

    rotateHue(amount) {
        const hsl = this.toHSL().match(/(\d+)/g);
        let h = parseInt(hsl[0]);
        let s = parseInt(hsl[1]);
        let l = parseInt(hsl[2]);
        h = (h + amount) % 360;
        console.log(`Rotate Hue - H: ${h}, S: ${s}, L: ${l}`); // Debugging output
        this.setHSL(h, s, l, this.a);
        return this;
    }

    setOpacity(alpha) {
        this.a = alpha;
        return this;
    }

    clone() {
        return new ColorHelper(this.r, this.g, this.b, this.a);
    }

    toString() {
        return this.toRGBA();
    }

    equals(color) {
        return this.r === color.r && this.g === color.g &&
            this.b === color.b && this.a === color.a;
    }
}
