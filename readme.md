# Rocket Engine

It draws. It simulates real physics.
It detects collisions with quad trees and spatial partitioning.
Until `Number` says, “Nope, you’re not YOLOing past IEEE 754.”

Oh yes — you can totally reach the stars.
But only if your unit of measurement is AU… and precision isn’t an issue.
I mean, at a cosmic scale… what’s a light second gonna change?

### Quick Start Example

Example of initializing the Rocket Engine and setting up a few scenes:

```javascript
// Initialize the Rocket engine with custom settings
const rocket = new Rocket({
    // Set the main target element for rendering the game
    targetElement: document.getElementById('my-container'),
    // Define custom input bindings (e.g., for controls)
    inputBindings: new MyInputBindings(),
});

// Optional: Register a custom application to handle more complex stuff 
// Not necessary for simple animations, but you'll probably want it for games
rocket.service('application', new MyGameLogic());

// Define the 'world' stack and add multiple scenes. The scenes can represent 
// different parts of the game, such as levels, menus, start and game over screens. 
rocket.stack('world', (stack) => {
    stack.addScene(new WorldScene1());
    stack.addScene(new WorldScene2());
    stack.addScene(new GameOverScene());
}, { width: 1920, height: 1080 }); // Set the canvas size

// You can define multiple stacks. Each stack will create a separate canvas element
rocket.stack('minimap', (stack) => {
    stack.addScene(new MiniMap());
}, { width: 300, height: 300 }); // Set the canvas size

// Launch the Rocket engine, starting the game loop and rendering the first scene of each stack
rocket.launch();

// You can navigate between scenes using the scene manager and the stack name
rocket.sceneManager('world').next();
rocket.sceneManager('world').previous();
```

Find more examples in the ./examples folder.

---

### Demo Space Game

The demo focuses on controlling a spaceship infinite space (well — theoretically, but IEEE 754 keeps contradicting me). There are two main control modes that can be switched by
**pressing the space bar**:

- **Realistic Physics**: For long-distance travel with inertia dampers off.
- **Arcade Mode**: For close combat with inertia dampers on.

Additionally, there’s an energy management system. Various components (engine, weapons, inertia dampers) consume energy
and need sufficient power to function. If components stop working or behave erratically, it's likely due to low energy.
You’ll have to wait until the reactor recharges.

I haven’t finished implementing all components, and the demo is not optimized for portable devices. It requires at least
a 1920x1080 display.

### Main Controls

Beware: The controls behave differently depending on the selected control mode. **Press the space bar**.
Also: If you can't fire or control the ship, **check the energy levels**!


- **w, a, s, d**: Move the ship. 
- **Space Bar**: Toggle inertia dampers (control mode).
- **1, 2, 3, 4, 5, 6**: Switch weapons.
- **Mouse 1**: Fire active weapon.
- **Mouse 2 + drag**: Select objects in space.
- **Mouse Wheel**: Zoom in/out.

You can destroy asteroids and space stations, but beyond that, there’s not much to do yet.

Check out the demo [here](https://rocket-engine.maduser.net).
 _(Temporarily offline due to a rapid unscheduled disassembly. It'll be back — once I'm done defying the limitations of reality in other projects. No really, there is real working demo)_

## Important Note

This is a fun side project I poke at when the weather is bad, the stars misalign, or I feel like arguing with floating point numbers.

It’s written in plain JavaScript (because I enjoy unsurmountable challenges and pain) and exists mainly so I can learn about game development, figure out how to structure bigger codebases, and discover patterns — usually right as the entire foundation starts to implode.

It’s how I earned the right to rant at other (livestreaming, pep-talking) devs and pretend I know exactly why their code is miserable.
When I say I’m experienced, I mean I’ve already suffered enough consequences to foresee when the code is doomed to eternal Early Access.

😂

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
all entities and their components. (Just use ECS, dude! It'll fix everything!)

**Example:**
```javascript
const player = new Player();
rocket.entityManager().addEntity(player, 'player');
```

### 3. Physics and Collision Detection

Built-in physics support for 2D and 3D games, including various levels of collision detection (bounding boxes, polygons,
etc.) (Yes, real Newtonian physics — allegedly. I outsourced the math to ChatGPT because I panicked at the first integral. Don't blame me if it's wrong).

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
_(To be honest: I only provide the ability to replace the Canvas renderer with your own. If you really want WebGL or — god help you — DOM rendering, you're completely on your own.)_

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
(Okay, that’s a lie — it’s still on the TODO list. I’m just working on the README ahead of time for efficiency.)

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
(Because yes, I'm a PHP dev who builds his own service containers. So what?! It works...)

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
management. (That’s what ChatGPT recommends I say — I even may be proud. Unlike others who install Unity, launch it once, and never touch it again… I actually tried.
And somehow, I ended up with _something_.)

For more details, check the API reference or explore the example projects.

> Rocket Engine: Powered by effort, duct tape, and 53 bits of hope.
