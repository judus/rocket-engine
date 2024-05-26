export default class Config {
    constructor(items = {}, defaults = {}) {
        this.config = {
            ...defaults,
            ...items
        };

        return new Proxy(this, {
            get: (target, prop) => {
                if(prop in target) {
                    return target[prop];
                } else {
                    return target.get(prop);
                }
            },
            set: (target, prop, value) => {
                if(prop in target) {
                    target[prop] = value;
                } else {
                    target.set(prop, value);
                }
                return true;
            }
        });
    }

    /**
     * Gets a configuration value by key.
     * @param {string} key - The key of the configuration item.
     * @returns {*} The value of the configuration item.
     */
    get(key) {
        return this.config[key];
    }

    /**
     * Sets a configuration value by key.
     * @param {string} key - The key of the configuration item.
     * @param {*} value - The value to set.
     */
    set(key, value) {
        this.config[key] = value;
    }

    /**
     * Gets all configuration items.
     * @returns {Object} All configuration items.
     */
    getAll() {
        return this.config;
    }
}
