export default class StringHelpers {
    static generateUUID() {
        return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    }
}
