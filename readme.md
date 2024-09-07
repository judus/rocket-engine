# Rocket Engine

## Introduction

Rocket Engine is a modular, JavaScript game engine designed for simplicity, flexibility, and extensibility. It supports
scene management, entity component systems, physics, audio, and much more—all while remaining easy to use for developers
of any level.

### Quick Start Example

Below is an example of initializing the Rocket Engine and setting up a few scenes:

```javascript
// Import necessary components from your project and the engine
import Rocket from "../engine/src/Rocket.js";
import MyInputBindings from "./inputs/MyInputBindings.js";
import MyGameLogic from "./MyGameLogic.js";
import WorldScene1 from "./scenes/WorldScene1.js";
import WorldScene2 from "./scenes/WorldScene2.js";
import GameOverScene from "./scenes/GameOverScene.js";
import UserInterface from "./scenes/UserInterface.js";

// Get the HTML element where the game will be rendered
const main = document.getElementById('rocket-main');

// Initialize the Rocket engine with custom settings
const rocket = new Rocket({
	// Set the main target element for rendering the game
	targetElement: main,
	// Define custom input bindings (e.g., for controls)
	inputBindings: new MyInputBindings(),
});

// Optional: Register a custom game logic service to handle your game-specific logic,
// or you could also define the logic in the scene objects
rocket.service('application', new MyGameLogic());

// Define the 'world' stack and add multiple scenes 
// These scenes will represent different parts of the game, such as levels or game states
rocket.stack('world', (stack) => {
	stack.addScene(new WorldScene1());
	stack.addScene(new WorldScene2());
	stack.addScene(new GameOverScene());
}, {
	width: 1920,  // Set the canvas width
	height: 1080, // Set the canvas height
});

// Define another stack for the 'ui' (User Interface), where different UI elements can be rendered. This allows the UI to render separately from the game world.
rocket.stack('ui', (stack) => {
	stack.addScene(new UserInterface());
}, {
	width: 300,   // Set a smaller canvas width for the UI
	height: 300,  // Set a smaller canvas height for the UI
});

// Launch the Rocket engine, starting the game loop and rendering the first scenes
rocket.launch();

```

---

## Personal Note

This is a fun project that I work on when I have time and the weather is bad. I’m learning about game development and
programming in plain JavaScript, with the main focus on structuring code for larger projects and discovering various
techniques and patterns used in game development.

The project consists of two parts: a game engine and a demo space game.

### Demo Space Game

The demo focuses on controlling a spaceship in infinite space. There are two main control modes that can be switched by
pressing the space bar:

- **Realistic Physics**: For long-distance travel with inertia dampers off.
- **Arcade Mode**: For close combat with inertia dampers on.

Additionally, there’s an energy management system. Various components (engine, weapons, inertia dampers) consume energy
and need sufficient power to function. If components stop working or behave erratically, it's likely due to low energy.
You’ll have to wait until the reactor recharges.

I haven’t finished implementing all components, and the demo is not optimized for portable devices. It requires at least
a 1920x1080 display.

### Main Controls

- **w, a, s, d**: Move the ship.
- **Space Bar**: Toggle inertia dampers.
- **1, 2, 3, 4, 5, 6**: Switch weapons.
- **Mouse 1**: Fire active weapon.
- **Mouse 2 + drag**: Select objects in space.
- **Mouse Wheel**: Zoom in/out.

You can destroy asteroids and space stations, but beyond that, there’s not much to do yet.

Check out the demo [here](https://canvas-playground.crashleague.net/rocket/demo.html).

---

## Core Features

### 1. Scene Management

Rocket Engine uses a stack-based approach for managing game scenes. Each stack can hold multiple scenes, allowing for
smooth transitions between different game states (e.g., menus, gameplay, game over).

**Example:**
```javascript
rocket.stack('gameplay', (stack) => {
    stack.addScene(new WorldScene1());
    stack.addScene(new GameOverScene());
}, { width: 1920, height: 1080 });
```

### 2. Entity Component System (ECS)

ECS allows for highly modular game objects, where behavior is defined through components. The **EntityManager** manages
all entities and their components.

**Example:**
```javascript
const player = new Player();
rocket.entityManager().addEntity(player, 'player');
```

### 3. Physics and Collision Detection

Built-in physics support for 2D and 3D games, including various levels of collision detection (bounding boxes, polygons,
etc.).

**Example:**
```javascript
import CollisionComponent from "./components/CollisionComponent.js";

const player = new Player();
player.addComponent(new CollisionComponent());
rocket.entityManager().addEntity(player);
```

### 4. Rendering

Render your game to multiple HTML elements using Canvas, WebGL, or DOM-based renderers.

**Example:**
```javascript
rocket.stack('world', (stack) => {
    stack.addScene(new WorldScene1());
}, { container: document.getElementById('game-world'), width: 1024, height: 768 });
```

### 5. Sprite Sheet Support

Efficiently manage animated characters and objects with **SpriteSheetManager**, which also supports collision shape
generation.

**Example:**
```javascript
rocket.spriteSheetManager().loadSpritesheet('player', 'player.png', 32, 32);
```

### 6. Audio Management

The **AudioManager** loads and manages sounds, allowing easy playback, pausing, and looping of sound effects or
background music.

**Example:**
```javascript
rocket.audioManager().loadSound('explosion', 'explosion.mp3');
rocket.audioManager().playSound('explosion');
```

### 7. Input Handling

Custom input bindings allow developers to map keyboard or mouse inputs to specific actions in-game.

**Example:**
```javascript
class MyInputBindings extends rocket.InputBindings {
    constructor() {
        super();
        this.bind('ArrowLeft', 'moveLeft');
        this.bind('ArrowRight', 'moveRight');
    }
}

rocket.registerInputBindings(new MyInputBindings());
```

### 8. Asset Management

The **AssetManager** handles loading and managing images, sounds, and JSON data, with support for tracking progress
during asset loading.

**Example:**
```javascript
rocket.assetManager().loadImage('background', 'bg.png');
```

### 9. Event System

The **EventBus** allows components to communicate by emitting and listening for events, making interactions between game
systems easier.

**Example:**
```javascript
rocket.eventBus().on('playerDied', () => {
    console.log('Game Over');
});

rocket.eventBus().emit('playerDied');
```

### 10. Pathfinding

Built-in A* pathfinding algorithm helps navigate complex game environments using grid-based heuristic searching.

**Example:**
```javascript
const path = rocket.pathfinding.search(startNode, endNode);
console.log('Path found:', path);
```

### 11. Performance Monitoring

Keep track of game performance with the built-in **PerformanceMonitor**, which can be toggled during development.

**Example:**
```javascript
const rocket = new Rocket({ showPerformanceMonitor: true });
```

### 12. Extensibility with Plugins and Services

Extend the engine’s functionality by adding custom services and plugins through the **ServiceContainer**.

**Example:**
```javascript
rocket.service('customService', new MyCustomService());
```

### 13. Task Scheduling

Schedule and execute timed actions using the **TaskScheduler**, ideal for animations, AI routines, or event-driven
mechanics.

**Example:**
```javascript
rocket.service('taskScheduler').schedule(() => {
    console.log('Task executed!');
}, 500); // Executes after 500ms
```

### 14. Particle System

Create particle effects such as explosions, fire, or smoke using the **ParticleSystem**.

**Example:**
```javascript
rocket.particleSystem().createEffect('explosion', x, y);
```

---

Rocket Engine offers a broad set of tools for developing games of varying complexity. While it’s a personal project and
not maintained professionally, it covers essential game development aspects such as physics, audio, rendering, and scene
management.

For more details, check the API reference or explore the example projects.