### Summary of Changes and Rocket Functionality

#### Overview

We have built a modular game engine using an Entity-Component-System (ECS) architecture. The engine is designed to be
flexible and extendable, providing various managers and services to handle different aspects of game development such as
rendering, asset management, audio, input, entities, and more. The engine API has been structured to allow for easy
integration and management of these services.

### Key Features and Changes

#### 1. **Initialization and Configuration**

- **Rocket Configuration:** The engine is initialized with a configuration object that sets default values for various
  parameters.
- **Service and Plugin Containers:** The engine uses `BaseContainer` to manage services and plugins, allowing for easy
  addition, retrieval, and removal of services and plugins.

#### 2. **Rocket API Enhancements**

- **Proxy Methods:** We have added explicit method definitions in the `Rocket` class to expose all methods
  of `Engine`. This ensures better IDE support and autocompletion.
- **Scene Management:** The `SceneDirector` class has been enhanced to manage scenes and scene stacks, encapsulating the
  logic for adding scenes and switching between them.

#### 3. **Scene and Stack Management**

- **Scene Director:** The `SceneDirector` now handles the creation and management of scenes and scene managers,
  including rendering and updating scenes.
- **Stack Setup:** The `stack` method allows for setting up scenes with specific configurations, including renderer,
  dimensions, and target HTML element.

#### 4. **Rendering Enhancements**

- **Canvas Renderer:** The `CanvasRenderer` class now supports setting dimensions and attaching the canvas to specific
  HTML elements, allowing for flexible rendering configurations.

#### 5. **Layer Management**

- **Layer Manager:** Each scene is associated with a `LayerManager` that manages rendering layers. The dimensions of
  the `LayerManager` are now set based on the scene dimensions.

### Detailed Breakdown

#### Rocket Class

- **Initialization:** Configures default values and initializes services and plugins.
- **Proxy Methods:** Exposes all `Engine` methods to ensure better IDE support.
- **Start/Stop Methods:** Manages the game loop by starting and stopping the timer.

#### Engine Class

Provides methods to interact with various services and manage the game engine, including:

- **Service Management:** `service`, `create`, `plugin`.
- **Scene Management:** `addScene`, `stack`, `switchScene`.
- **Asset Management:** `loadImage`, `loadSound`, `loadJSON`, `getAsset`, `setProgressHandler`, `setCompleteHandler`.
- **Audio Management:** `loadAudio`, `playAudio`, `pauseAudio`, `stopAudio`, `getAudio`.
- **Input Management:** `registerInputBindings`.
- **Entity Management:
  ** `addEntity`, `removeEntity`, `getEntity`, `getEntitiesByType`, `queryEntitiesInArea`, `getEntitiesByProperty`.

#### SceneDirector Class

Manages scene stacks and scenes within the engine:

- **Scene and Stack Management:** `addScene`, `stack`, `switchScene`.
- **Update and Render:** Handles updating and rendering of all scenes managed by scene managers.

#### CanvasRenderer Class

Handles rendering of scenes to a canvas element:

- **Initialization:** Creates a canvas element and attaches it to a specified HTML element.
- **Rendering:** Clears the canvas and renders all layers of the scene.
- **Fade Effects:** Supports fade-in and fade-out effects for scene transitions.

### How the Rocket Works Now

1. **Initialization:**

   ```javascript
   const engine = new Rocket({
       targetElement: document.getElementById('main'),
       showPerformanceMonitor: true
   });
   ```

2. **Setting up Scene Stacks:**

   ```javascript
   engine.stack('world', (stack) => {
       stack.addScene(new WorldScene1());
       stack.addScene(new WorldScene2());
   }, { container: document.getElementById('world') });

   engine.stack('cockpit', (stack) => {
       stack.addScene(new CockpitScene());
   }, { container: document.getElementById('cockpit'), width: 200, height: 200 });
   ```

3. **Starting the Rocket:**

   ```javascript
   engine.start();
   ```

The engine now manages multiple scene stacks, each associated with its own HTML element and renderer. Scenes can be
added to stacks, and the `SceneDirector` handles switching between scenes and updating/rendering them.

### Conclusion

These enhancements have made the engine more modular and flexible, allowing for better management of scenes, stacks, and
various services. The explicit method definitions ensure better IDE support, making the engine easier to work with and
extend. The overall architecture promotes a clean separation of concerns, facilitating future development and
maintenance.