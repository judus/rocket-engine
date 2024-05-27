### Developer Manual for Rocket Game Engine

---

#### Table of Contents

1. **Introduction**
2. **Service Container**
    - Overview
    - Key Features
    - Usage Example
3. **Update and Render Workflow**
    - Overview
    - Separation of Update and Render Processes
    - Scene Management
    - Layer Management and Rendering
4. **ECS (Entity-Component-System) Model**
    - Overview
    - Entity and Component Interaction
    - Usage Example

---

### 1. Introduction

The Rocket Game Engine provides a flexible, modular architecture designed to facilitate game development. This manual
covers key aspects such as the service container, update and render workflow, and the ECS model. Understanding these
components will help developers effectively utilize the engine and extend its functionality.

---

### 2. Service Container

#### Overview

The service container in the Rocket Game Engine is a critical component that ensures the flexibility and modularity of
the engine. It allows for the registration and management of various services that the engine or a game might need. The
container can store either instances or factory functions, making it versatile in handling different types of services.

#### Key Features

- **Registration**: You can register services either as instances or factory functions. This means you can provide an
  already constructed object or a function that creates the object when needed.
- **Retrieval**: Services can be retrieved from the container using their registered names. If a factory function was
  registered, a new instance can be created on retrieval.
- **Initialization**: During the engine's initialization phase, all services can have their `init` method called, if
  they have one. This method is used to inject the engine API into the service, ensuring it has all the context it needs
  to function correctly.

#### Usage Example

**Service Container Code Snippet**

The `BaseContainer` class manages the registration and retrieval of services.

```javascript
export default class BaseContainer {
    constructor() {
        this.items = {};
        this.factories = {};
    }

    add(name, item) {
        if (typeof item === 'function') {
            this.factories[name] = item;
        } else {
            this.items[name] = item;
        }
    }

    get(name) {
        return this.items[name] || null;
    }

    create(name, ...params) {
        if (this.factories[name]) {
            return new this.factories[name](...params);
        } else {
            console.warn(`Factory for '${name}' not found.`);
            return null;
        }
    }

    initAll(engineApi) {
        Object.values(this.items).forEach(item => {
            if (typeof item.init === 'function') {
                item.init(engineApi);
            }
        });
    }
}
```

**Engine Service Management Example**

The `Engine` class interacts with the service container to manage services.

```javascript
export default class Engine {
    constructor(rocket) {
        this.rocket = rocket;
    }

    service(name, instance = null) {
        if (instance === null) {
            return this.rocket.serviceContainer.get(name);
        } else if (instance === undefined) {
            this.rocket.serviceContainer.remove(name);
        } else {
            const service = this.rocket.serviceContainer.add(name, instance);
            if (this.rocket.isInitialized && typeof service.init === 'function') {
                service.init(this);
            }
        }
    }
}
```

### 3. Update and Render Workflow

#### Overview

The update and render processes in the Rocket Game Engine are designed to be independent of each other, allowing for
smooth and efficient game loops. This separation ensures that game logic and rendering can be managed separately,
providing flexibility in how each process is handled and optimized.

#### Separation of Update and Render Processes

The `Rocket` class sets up the game loop by defining separate update and render callbacks. These callbacks are then
managed by the engine's timer, which ensures they are called at appropriate intervals.

**Start Method Snippet**

The `start` method initializes the update and render callbacks and starts the timer.

```javascript
start() {
    let updateCallback = () => {};
    let renderCallback = () => {};

    const renderSystem = this.service('renderSystem');
    const sceneDirector = this.service('sceneDirector');
    const application = this.service('application');

    if (application || sceneDirector) {
        updateCallback = (deltaTime, tickCount, totalTime) => {
            if (application) application.update(deltaTime);
            if (sceneDirector) sceneDirector.update(deltaTime, tickCount, totalTime);
        };

        renderCallback = (deltaTime, tickCount, totalTime) => {
            if (application) application.render(deltaTime);
            if (sceneDirector) sceneDirector.render(deltaTime, tickCount, totalTime);
        };
    }

    const timer = this.service('timer');
    timer.start(updateCallback, renderCallback);
}
```

#### Scene Management

The `SceneDirector` manages multiple `SceneManager` instances, each of which handles its own set of scenes. This
structure allows for complex scene management, including transitions and parallel scene rendering.

**SceneDirector Overview**

The `SceneDirector` coordinates scenes and manages the transitions between them. It does not render scenes directly but
delegates this responsibility to the respective `SceneManager`.

```javascript
export default class SceneDirector extends EngineBase {
    constructor() {
        super();
        this.sceneManagers = new Map();
    }

    addSceneManager(name, sceneManager) {
        this.sceneManagers.set(name, sceneManager);
    }

    getSceneManager(name) {
        return this.sceneManagers.get(name);
    }

    update(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.updateCurrentScene(deltaTime, tickCount, totalTime);
        });
    }

    render(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.renderCurrentScene(deltaTime, tickCount, totalTime);
        });
    }
}
```

**Example Setup**

An example setup using the `Rocket` engine to create different stacks for various parts of the game interface.

```javascript
const rocket = new Rocket({ showPerformanceMonitor: true, inputBindings: new MyInputBindings() });
rocket.service('application', new Application());

rocket.stack('world', (stack) => {
    stack.addScene(new WorldScene1());
    stack.addScene(new GameOverScene());
    stack.addScene(new WorldScene3());
}, { width: 1920, height: 1080 });

rocket.stack('cockpit', (stack) => {
    stack.addScene(new Cockpit());
}, { container: document.getElementById('rocket-cockpit'), width: 1920, height: 1080 });

rocket.start();
```

#### Layer Management and Rendering

The `LayerManager` manages multiple layers within a scene, ensuring each layer is rendered onto its own off-screen
canvas. This setup allows for efficient rendering and easy management of different visual elements.

**CanvasRenderer Rendering Snippet**

The `CanvasRenderer` fetches layers from the `LayerManager` and renders them onto the visible canvas.

```javascript
render(scene, deltaTime, tickCount, totalTime) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    scene.getLayers().forEach(layer => {
        if (!layer.lazy || (scene.camera && scene.camera.isMoving())) {
            layer.render(scene, deltaTime, tickCount, totalTime);
        }
        this.context.drawImage(layer.canvas, 0, 0);
    });

    if (this.isFadingOut || this.isFadingIn) {
        this.context.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
```

### 4. ECS (Entity-Component-System) Model

#### Overview

The ECS model allows for a highly modular and flexible way to manage game objects. Entities are essentially containers
for components, which hold data, and systems operate on these entities to update their state.

#### Entity and Component Interaction

Entities can have various components added to them, which encapsulate specific aspects of their behavior or state.
Components can be added, retrieved, or removed dynamically.

**BaseEntity Overview**

The `BaseEntity` class is the foundation for all game entities. It manages its components and provides methods for
adding, retrieving, and removing them.

```javascript
export default class BaseEntity extends EngineBase {
    constructor(id, type) {
        super();
        this.id = id || generateUUID();
        this.type = type || this.constructor.name;
        this.components = {};
    }

    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this;
        if (component.onAdd) {
            component.onAdd();
        }
    }

    getComponent(name) {
        return this.components[name];
    }

    removeComponent(name) {
        const component = this.components[name];
        if (component) {
            if (typeof component.onRemove === 'function') {
                component.onRemove();
            }
            delete this.components[name];
        }
    }
}
```

**SpatialECS2D Overview**

The `SpatialECS2D` class extends `SpatialEntity2D` and integrates ECS-specific functionalities like component management
and messaging. This allows for more complex behaviors and interactions within the game world.

```javascript
export default class SpatialECS2D extends SpatialEntity2D {
    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this;
        if (component.onAdd) {
            component.onAdd(this);
        }
    }

    update(deltaTime) {
        Object.values(this.components).forEach(component => {
            if (component.update) {
                component.update(delta

Time);
            }
        });

        this.children.forEach(child => {
            child.update(deltaTime);
        });
    }

    render(deltaTime) {
        const renderComponent = this.getComponent('render');
        if (renderComponent) {
            renderComponent.render(deltaTime);
        }

        this.children.forEach(child => {
            child.render(deltaTime);
        });
    }
}
```

#### Usage Example

**EntityManager Overview**

The `EntityManager` class manages the creation, retrieval, and deletion of entities. It also handles the querying of
entities based on their components or properties.

```javascript
export default class EntityManager {
    constructor(dataStoreManager) {
        this.dataStoreManager = dataStoreManager;
        this.entities = new Map();
    }

    addEntity(entity, type) {
        this.entities.set(entity.id, entity);
        const store = this.dataStoreManager.getStore(type);
        store.set(entity.id, entity);
    }

    removeEntity(entity) {
        this.entities.delete(entity.id);
        const store = this.dataStoreManager.getStore(entity.type);
        store.delete(entity.id);
    }

    getEntity(id) {
        return this.entities.get(id);
    }

    getEntitiesByType(type) {
        const store = this.dataStoreManager.getStore(type);
        return Array.from(store.values());
    }
}
```

### Summary

The Rocket Game Engine's architecture emphasizes flexibility and modularity. The service container allows for easy
management and replacement of services, the separation of update and render processes ensures efficient game loops, and
the ECS model provides a powerful framework for managing game entities. By understanding and leveraging these
components, developers can build complex and performant games.

### Next Steps

1. **Diving Deeper**: Explore specific components and their integration with entities.
2. **Advanced Usage**: Implement more advanced usage patterns of the ECS model.

For any questions or further assistance, please refer to the developer support resources.