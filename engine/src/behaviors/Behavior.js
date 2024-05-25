export default class Behavior {
    perform(entity) {
        throw new Error('perform() must be implemented by subclass');
    }
}
