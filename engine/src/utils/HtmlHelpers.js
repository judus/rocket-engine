export default class HtmlHelper {

    /**
     * Converts an HTML string to an HTMLElement.
     * @param {string} html - The HTML string.
     * @returns {HTMLElement} The created HTMLElement.
     */
    static htmlToElement(html) {
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    /**
     * Creates a canvas element with the specified dimensions and id.
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     * @param {string} [id] - The id of the canvas (optional).
     * @returns {HTMLCanvasElement} The created canvas element.
     */
    static createCanvas(width, height, id) {
        const canvas = document.createElement("canvas");
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        if(id !== undefined) {
            canvas.setAttribute('id', id);
        }

        return canvas;
    }

    /**
     * Creates an element with the specified tag, attributes, and inner HTML.
     * @param {string} tag - The tag name of the element.
     * @param {Object} [attributes={}] - An object representing the attributes of the element.
     * @param {string} [innerHTML=''] - The inner HTML of the element (optional).
     * @returns {HTMLElement} The created HTMLElement.
     */
    static createElement(tag, attributes = {}, innerHTML = '') {
        const element = document.createElement(tag);
        for(const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        element.innerHTML = innerHTML;
        return element;
    }

    /**
     * Removes all child elements from a specified element.
     * @param {HTMLElement} element - The element to clear.
     */
    static clearElement(element) {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * Appends multiple children to a specified element.
     * @param {HTMLElement} parent - The parent element.
     * @param {...HTMLElement} children - The child elements to append.
     */
    static appendChildren(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
    }

    /**
     * Sets multiple attributes on a specified element.
     * @param {HTMLElement} element - The element to set attributes on.
     * @param {Object} attributes - An object representing the attributes to set.
     */
    static setAttributes(element, attributes) {
        for(const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
    }
}
