### Recap and Updates

#### 1. Highlight of the Session

The most significant highlight of this session was renaming our engine to "Rocket" and restructuring its core components
to enhance usability and API clarity. This renaming helped clarify the role of various parts of the engine and provided
a more intuitive naming convention for users.

#### 2. Relevant Questions and How We Addressed Them

- **Handling Entities and Components:**
    - We discussed the hybrid solution for managing entities and components, especially for spatial properties. We
      concluded that using mixins and retaining some properties directly on the entity was a suitable approach.

- **Cameras and Scene Management:**
    - We restructured the scene management to ensure that each scene can have its own camera setup and discussed how to
      handle multiple scenes and canvases. We also ensured that scenes are managed correctly by the SceneDirector and
      SceneManager.

- **API Exposure:**
    - We debated the necessity and the method of exposing various engine services through the Rocket API and concluded
      to keep the current method, ensuring proper autocompletion and IDE support.

- **Utility and Config Management:**
    - We created a Config class to handle default settings and runtime configuration. We also discussed and implemented
      a dynamic way to access configuration properties.

#### 3. Summary of What We Did, Struggles, and Areas for Improvement

- **Rocket and Engine Restructuring:**
    - We successfully renamed and restructured the core engine components. This included renaming Engine to Rocket and
      creating a clear API through Engine.

- **Scene Management Enhancements:**
    - We enhanced the SceneDirector and SceneManager to handle multiple scenes and stacks better, allowing for a more
      flexible scene management system.

- **Utility and Configuration:**
    - We implemented a Config class to manage default and runtime configurations dynamically.

- **Rendering Enhancements:**
    - Added the ability to draw dashed line circles around entities, enhancing the rendering capabilities.

**Struggles:**

- Ensuring the correct passing and initialization of components and services required careful refactoring.
- Handling multiple canvases and ensuring they are correctly managed within the SceneDirector and SceneManager.

**Areas for Improvement:**

- Continue refining the SceneManager and SceneDirector to ensure seamless scene transitions and better resource
  management.
- Improve documentation to cover all aspects of the Rocket engine, especially new features added during this session.

#### 4. Remarkable Discussions and Notes

- **Naming and API Structure:**
    - The discussion on renaming the engine to Rocket was not only fun but also crucial in creating a clear and
      intuitive structure for the engine.

- **Rendering Details:**
    - We had an interesting discussion on how to draw dashed lines and implement more complex rendering techniques
      without compromising performance.

- **Service and Config Management:**
    - The implementation of a dynamic configuration management system was a key discussion point, ensuring flexibility
      and ease of use.

#### 5. Consolidated Git Commit Message

```
feat: Rename engine to Rocket and restructure core components

- Renamed Engine to Rocket for clearer API structure
- Enhanced SceneDirector and SceneManager for better scene and stack management
- Implemented dynamic Config class for managing defaults and runtime configurations
- Added dashed line circle rendering around entities
- Exposed necessary API methods through Rocket and Engine
- Improved handling of multiple canvases and scenes
```

#### 6. Updated API Docs

### Context Overview

We are building a modular game engine using an Entity-Component-System (ECS) architecture. The engine is designed to be
flexible and extendable, providing various managers and services to handle different aspects of game development, such
as rendering, asset management, audio, input, entities, and more. The engine API allows for easy integration and
management of these services.

### Classes and Methods

#### Rocket

The core of the game engine that initializes and manages various services and plugins.

**Methods:**

- `constructor(config)`: Initializes the engine with the provided configuration.
- `service(name, instance = null)`: Adds, retrieves, or removes a service.
- `plugin(name, instance)`: Adds, retrieves, or removes a plugin.
- `init()`: Initializes all plugins.
- `start()`: Starts the game loop.
- `stop()`: Stops the game loop.

#### Engine

Provides convenience methods for interacting with the engine's services and plugins.

**Methods:**

- `service(name, instance = null)`: Adds, retrieves, or removes a service.
- `plugin(name, instance)`: Adds, retrieves, or removes a plugin.
- `store(name)`: Retrieves a data store.
- `createStore(name, dataStore = null)`: Creates a new data store.
- `prune(name)`: Removes a data store.
- `on(event, listener)`: Registers an event listener.
- `off(event, listener)`: Removes an event listener.
- `emit(event, ...args)`: Emits an event.
- `loadImage(key, src)`: Loads an image asset.
- `loadSound(key, src)`: Loads a sound asset.
- `loadJSON(key, src)`: Loads a JSON asset.
- `getAsset(key)`: Retrieves an asset.
- `setProgressHandler(callback)`: Sets a progress handler for asset loading.
- `setCompleteHandler(callback)`: Sets a complete handler for asset loading.
- `loadAudio(key, src)`: Loads an audio asset.
- `playAudio(key, loop = false)`: Plays an audio asset.
- `pauseAudio(key)`: Pauses an audio asset.
- `stopAudio(key)`: Stops an audio asset.
- `getAudio(key)`: Retrieves an audio asset.
- `registerInputBindings(inputBindings)`: Registers input bindings.
- `loadSpritesheet(key, imageUrl, frameWidth, frameHeight)`: Loads a spritesheet.
- `getSpritesheet(key)`: Retrieves a spritesheet.
- `addEntity(entity, type)`: Adds an entity.
- `removeEntity(entity)`: Removes an entity.
- `getEntity(id)`: Retrieves an entity by ID.
- `getEntitiesByType(type)`: Retrieves entities by type.
- `queryEntitiesInArea(area)`: Queries entities within a specific area.
- `getEntitiesByProperty(property, value)`: Retrieves entities by a property value.
- `addScene(scene, sceneName = null, sceneGroup = 'main', container = null)`: Adds a scene to the default or specified
  scene manager.
- `stack(name, setupCallback, options = {})`: Sets up scenes with specific configuration.
- `switchScene(sceneName, sceneGroup = 'main')`: Switches to a specific scene within a scene manager.
- `initService(name)`: Initializes a service.

#### SceneDirector

Manages multiple `SceneManager` instances and facilitates scene switching and stacking.

**Methods:**

- `constructor()`: Initializes the `SceneDirector`.
- `addSceneManager(name, sceneManager)`: Adds a `SceneManager` instance to the director.
- `getSceneManager(name)`: Retrieves a `SceneManager` by name.
- `update(deltaTime, tickCount, totalTime)`: Updates all scenes managed by the `SceneManagers`.
- `render(deltaTime, tickCount, totalTime)`: Renders all scenes managed by the `SceneManagers`.
- `addScene(scene, sceneName = null, sceneGroup = 'main', container = null)`: Adds a scene to the default or
  specified `SceneManager`.
- `stack(name, setupCallback, options = {})`: Sets up scenes with specific configuration.
- `switchScene(sceneName, sceneGroup = 'main')`: Switches to a specific scene within a `SceneManager`.
- `previous()`: Switches to the previous scene.
- `next()`: Switches to the next scene.
- `first()`: Switches to the first scene.
- `last()`: Switches to the last scene.

---

This recap and update should cover the major points discussed and implemented during this session, including the new
additions and improvements made to the Rocket engine.