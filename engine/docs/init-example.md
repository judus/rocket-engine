### Initialization Example

#### 1. Set Up Your HTML File

Make sure you have an HTML file set up as follows:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Game</title>
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
      overflow: hidden;
      background-color: #000;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #gameContainer {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    #loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-family: Arial, sans-serif;
      font-size: 24px;
    }
  </style>
</head>
<body>
  <div id="gameContainer">
    <canvas id="gameCanvas"></canvas>
    <div id="loading">Loading...</div>
  </div>
  <script type="module" src="main.js"></script>
</body>
</html>
```

#### 2. Define Your Main JavaScript File (`main.js`)

Here's an example of how you might initialize the game engine in your `main.js` file:

```javascript
import { Rocket } from './path/to/engine';
import { Timer } from './path/to/timer';
import { RenderSystem } from './path/to/renderSystem';
import { DataStoreManager } from './path/to/dataStoreManager';
import { EventBus } from './path/to/eventBus';
import { AssetManager } from './path/to/assetManager';
import { AudioManager } from './path/to/audioManager';
import { InputManager } from './path/to/inputManager';
import { InputBindingsManager } from './path/to/inputBindingsManager';
import { SpritesheetManager } from './path/to/spritesheetManager';
import { EntityManager } from './path/to/entityManager';
import { GlobalMouse } from './path/to/globalMouse';
import { ScopedMouse } from './path/to/scopedMouse';
import { ExampleApplication } from './path/to/exampleApplication';
import { ExamplePlugin } from './path/to/examplePlugin';

// Initialize the engine
const engine = new Rocket({
  disableRenderSystem: false, // Use the default render system unless specified otherwise
  disableDataStores: false    // Use the default data store manager unless specified otherwise
});

// Register services
engine.service('timer', new Timer(60, true));
engine.service('application', new ExampleApplication());
engine.service('renderSystem', new RenderSystem(engine.canvasElement));
engine.service('dataStoreManager', new DataStoreManager());
engine.service('eventBus', new EventBus());
engine.service('assetManager', new AssetManager());
engine.service('audioManager', new AudioManager());
engine.service('inputManager', new InputManager(engine.getService('eventBus'), new GlobalMouse(), new ScopedMouse(engine.canvasElement, engine.getService('dataStoreManager'))));
engine.service('inputBindingsManager', new InputBindingsManager(engine.getService('eventBus'), null));
engine.service('spritesheetManager', new SpritesheetManager());
engine.service('entityManager', new EntityManager(engine.getService('dataStoreManager')));

// Register plugins
engine.plugin('examplePlugin', new ExamplePlugin());

// Initialize all plugins and services
engine.init().start();

// Handle window resizing
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeCanvas() {
  const gameContainer = document.getElementById('gameContainer');
  const canvas = document.getElementById('gameCanvas');
  const aspectRatio = canvas.width / canvas.height;
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;

  if (containerWidth / containerHeight > aspectRatio) {
    canvas.style.width = `${containerHeight * aspectRatio}px`;
    canvas.style.height = `${containerHeight}px`;
  } else {
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerWidth / aspectRatio}px`;
  }
}

// Hide the loading text once the canvas is ready
const canvas = document.getElementById('gameCanvas');
const loadingText = document.getElementById('loading');

canvas.addEventListener('load', () => {
  loadingText.style.display = 'none';
});
```

### Explanation

1. **HTML Setup**: The HTML file sets up a container for the game canvas and includes styles to ensure the canvas fills
   the screen and scales appropriately.
2. **Rocket Initialization**:
    - The `Rocket` class is initialized with a configuration object. In this example, the render system and data store
      manager are enabled by default.
    - Various services such
      as `Timer`, `RenderSystem`, `DataStoreManager`, `EventBus`, `AssetManager`, `AudioManager`, `InputManager`, `InputBindingsManager`, `SpritesheetManager`,
      and `EntityManager` are registered with the engine.
    - Plugins are registered using the `plugin` method.
3. **Canvas Resizing**: The `resizeCanvas` function ensures the canvas maintains its aspect ratio and fits within the
   game container. This function is called initially and whenever the window is resized.
4. **Loading Indicator**: The loading text is displayed while the game is loading and is hidden once the canvas is
   ready.

### Application Flow Overview

The following description outlines the flow of the game application, providing new developers with an understanding of
how the components work, how to use them, and the overall flow of the application.

### 1. Initialization Phase

#### HTML Setup

1. **HTML Structure**:
    - The HTML file includes a `div` element with the id `gameContainer` that serves as the container for the canvas.
    - A `canvas` element is created dynamically and appended to the `gameContainer`.
    - A `div` element with the id `loading` is used to display a loading message while assets are being loaded.

#### JavaScript Initialization

2. **Rocket Initialization**:
    - The `Rocket` class is instantiated with a configuration object. This object can disable the default render system
      and data store manager if desired.
    - Example:
      ```javascript
      const engine = new Rocket({
        disableRenderSystem: false,
        disableDataStores: false
      });
      ```

#### Service Registration

3. **Register Services**:
    - Various services are registered with the engine using the `service` method.
    - Services include:
        - `Timer`: Handles the game loop timing.
        - `RenderSystem`: Manages rendering of the game.
        - `DataStoreManager`: Manages data storage for entities.
        - `EventBus`: Handles event-based communication.
        - `AssetManager`: Manages loading and retrieving assets.
        - `AudioManager`: Manages audio assets.
        - `InputManager`: Handles input events and state.
        - `InputBindingsManager`: Manages input bindings.
        - `SpritesheetManager`: Manages spritesheets.
        - `EntityManager`: Manages entities and their components.

#### Plugin Registration

4. **Register Plugins**:
    - Plugins are registered using the `plugin` method to extend the functionality of the engine.
    - Example:
      ```javascript
      engine.plugin('examplePlugin', new ExamplePlugin());
      ```

#### Initialization and Start

5. **Initialize and Start**:
    - The `init` method initializes all registered plugins and services.
    - The `start` method starts the game loop.
    - Example:
      ```javascript
      engine.init().start();
      ```

### 2. Game Loop

#### Timer Service

6. **Game Loop Execution**:
    - The `Timer` service manages the game loop, calling the `update` and `render` methods at the specified frame rate.
    - Example:
      ```javascript
      timer.start(updateCallback, renderCallback);
      ```

#### Update Phase

7. **Update Phase**:
    - The `update` method is called to update the game state.
    - Each entity's `update` method is called, which in turn calls the `update` method of each component.

#### Render Phase

8. **Render Phase**:
    - The `render` method is called to render the game state.
    - Each entity's `render` method is called, which in turn calls the `render` method of the render component and
      recursively renders the entity hierarchy.

### 3. Event Handling

#### EventBus

9. **Event Handling**:
    - The `EventBus` service handles event-based communication within the game.
    - Listeners can register for specific events, and events can be emitted to notify listeners of changes or actions.

### 4. Asset Management

#### AssetManager

10. **Asset Loading**:
    - The `AssetManager` service manages the loading and retrieval of assets such as images, sounds, and JSON data.
    - Progress and completion handlers can be set to provide feedback during asset loading.

### 5. Input Management

#### InputManager

11. **Input Handling**:
    - The `InputManager` service handles input events such as keyboard and mouse actions.
    - Input bindings can be registered to map specific actions to input events.

### Example Initialization Script (`main.js`)

```javascript
import { Rocket } from './path/to/engine';
import { Timer } from './path/to/timer';
import { RenderSystem } from './path/to/renderSystem';
import { DataStoreManager } from './path/to/dataStoreManager';
import { EventBus } from './path/to/eventBus';
import { AssetManager } from './path/to/assetManager';
import { AudioManager } from './path/to/audioManager';
import { InputManager } from './path/to/inputManager';
import { InputBindingsManager } from './path/to/inputBindingsManager';
import { SpritesheetManager } from './path/to/spritesheetManager';
import { EntityManager } from './path/to/entityManager';
import { GlobalMouse } from './path/to/globalMouse';
import { ScopedMouse } from './path/to/scopedMouse';
import { ExampleApplication } from './path/to/exampleApplication';
import { ExamplePlugin } from './path/to/examplePlugin';

// Initialize the engine
const engine = new Rocket({
  disableRenderSystem: false,
  disableDataStores: false
});

// Register services
engine.service('timer', new Timer(60, true));
engine.service('application', new ExampleApplication());
engine.service('renderSystem', new RenderSystem(engine.canvasElement));
engine.service('dataStoreManager', new DataStoreManager());
engine.service('eventBus', new EventBus());
engine.service('assetManager', new AssetManager());
engine.service('audioManager', new AudioManager());
engine.service('inputManager', new InputManager(engine.getService('eventBus'), new GlobalMouse(), new ScopedMouse(engine.canvasElement, engine.getService('dataStoreManager'))));
engine.service('inputBindingsManager', new InputBindingsManager(engine.getService('eventBus'), null));
engine.service('spritesheetManager', new SpritesheetManager());
engine.service('entityManager', new EntityManager(engine.getService('dataStoreManager')));

// Register plugins
engine.plugin('examplePlugin', new ExamplePlugin());

// Initialize all plugins and services
engine.init().start();

// Handle window resizing
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeCanvas() {
  const gameContainer = document.getElementById('gameContainer');
  const canvas = document.getElementById('gameCanvas');
  const aspectRatio = canvas.width / canvas.height;
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;

  if (containerWidth / containerHeight > aspectRatio) {
    canvas.style.width = `${containerHeight * aspectRatio}px`;
    canvas.style.height = `${containerHeight}px`;
  } else {
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerWidth / aspectRatio}px`;
  }
}

// Hide the loading text once the canvas is ready
const canvas = document.getElementById('gameCanvas');
const loadingText = document.getElementById('loading');

canvas.addEventListener('load', () => {
  loadingText.style.display = 'none';
});
```

### Application Flow Summary

1. **HTML Setup**: Prepare the HTML structure with a canvas for rendering and a loading indicator.
2. **Rocket Initialization**: Instantiate the `Rocket` class with optional configuration settings.
3. **Service Registration**: Register essential services
   like `Timer`, `RenderSystem`, `DataStoreManager`, `EventBus`, `AssetManager`, `AudioManager`, `InputManager`, `InputBindingsManager`, `SpritesheetManager`,
   and `EntityManager`.
4. **Plugin Registration**: Register plugins to extend the engine's functionality.
5. **Initialization and Start**: Call `init` to initialize all services and plugins, then start the game loop
   with `start`.
6. **Game Loop Execution**: The `Timer` service manages the game loop, periodically calling `update` and `render`.
7. **Event Handling**: The `EventBus` facilitates event-driven communication between different parts of the game.
8. **Asset Management**: The `AssetManager` loads and retrieves game assets.
9. **Input Handling**: The `InputManager` handles input events and maps them to game actions.
10. **Canvas Resizing**: The canvas is resized to maintain the correct aspect ratio within the game container.

This comprehensive example should provide new developers with a clear understanding of how the components work together
and the overall flow of the application.