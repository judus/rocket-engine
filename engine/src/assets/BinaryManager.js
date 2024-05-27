/**
 * BinaryManager class for managing binary and manifest file mappings.
 */
export default class BinaryManager {
    constructor() {
        this.binaries = new Map();
    }

    /**
     * Adds a binary file and its corresponding manifest file to the manager.
     * @param {string} key - The key to reference the binary file.
     * @param {string} manifestPath - Path to the manifest file.
     * @param {string} binaryPath - Path to the binary file.
     */
    addBinary(key, manifestPath, binaryPath) {
        this.binaries.set(key, {manifestPath, binaryPath});
    }

    /**
     * Gets the manifest and binary paths for a given key.
     * @param {string} key - The key of the binary to retrieve.
     * @returns {Object} - The manifest and binary paths.
     */
    getBinaryPaths(key) {
        return this.binaries.get(key);
    }
}

//module.exports = BinaryManager;
