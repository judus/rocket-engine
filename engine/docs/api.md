### Context Overview

We are building a modular game engine using an Entity-Component-System (ECS) architecture. The engine is designed to be
flexible and extendable, providing various managers and services to handle different aspects of game development, such
as rendering, asset management, audio, input, entities, and more. The engine API allows for easy integration and
management of these services.

### Classes and Methods

#### Engine

The core of the game engine that initializes and manages various services and plugins.

**Methods:**

- `constructor(config)`: Initializes the engine with the provided configuration.
- `service(name, instance = null)`: Adds, retrieves, or removes a service.
- `plugin(name, instance)`: Adds, retrieves, or removes a plugin.
- `init()`: Initializes all services and plugins.
- `start()`: Starts the game loop.
- `stop()`: Stops the game loop.
- `defaultTimer()`: Returns the default Timer service.
- `defaultRenderSystem()`: Returns the default RenderSystem.
- `defaultDataStoreManager(defaultDataStore)`: Returns the default DataStoreManager.
- `defaultEventBus()`: Returns the default EventBus.
- `defaultAssetManager()`: Returns the default AssetManager.
- `defaultAudioManager()`: Returns the default AudioManager.
- `defaultInputManager()`: Returns the default InputManager.
- `defaultInputBindingsManager()`: Returns the default InputBindingsManager.
- `defaultSpritesheetManager()`: Returns the default SpritesheetManager.
- `defaultEntityManager()`: Returns the default EntityManager.
- `defaultGlobalMouse()`: Returns the default GlobalMouse.
- `defaultScopedMouse()`: Returns the default ScopedMouse.

#### EngineApi

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

#### Entity

Represents an entity in the ECS architecture.

**Methods:**

- `constructor(id, type)`: Initializes an entity with an ID and type.
- `addComponent(componentType, component)`: Adds a component to the entity.
- `removeComponent(componentType)`: Removes a component from the entity.
- `getComponent(componentType)`: Retrieves a component from the entity.
- `hasComponent(componentType)`: Checks if the entity has a specific component.
- `addProperty(key, value)`: Adds a property to the entity.
- `getProperty(property)`: Retrieves a property from the entity.
- `update(deltaTime, tick, totalTime)`: Updates the entity by calling update on each component.
- `render(deltaTime, tick, totalTime)`: Renders the entity by calling render on the render component and recursively
  rendering the hierarchy.

#### HierarchyComponent

Manages parent-child relationships for entities.

**Methods:**

- `constructor()`: Initializes the hierarchy component.
- `setParent(parent)`: Sets the parent entity.
- `addChild(child)`: Adds a child entity.
- `removeChild(child)`: Removes a child entity.

#### Timer

Handles the game loop timing.

**Methods:**

- `constructor(fps, showPerformanceMonitor)`: Initializes the timer with FPS and performance monitor options.
- `start(updateCallback, renderCallback)`: Starts the game loop.
- `stop()`: Stops the game loop.

#### DataStoreManager

Manages data stores for entities.

**Methods:**

- `constructor(defaultDataStore)`: Initializes the data store manager with a default data store.
- `create(name, dataStore = null)`: Creates or registers a new data store.
- `getStore(name)`: Retrieves a data store by name.
- `remove(name)`: Removes a data store by name.

#### EventBus

Handles event-based communication.

**Methods:**

- `constructor()`: Initializes the event bus.
- `on(event, listener)`: Registers an event listener.
- `off(event, listener)`: Removes an event listener.
- `emit(event, ...args)`: Emits an event.

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

#### AssetManager

Manages loading and retrieving assets.

**Methods:**

- `constructor()`: Initializes the asset manager.
- `loadImage(key, src)`: Loads an image asset.
- `loadSound(key, src)`: Loads a sound asset.
- `loadJSON(key, src)`: Loads a JSON asset.
- `getAsset(key)`: Retrieves an asset.
- `setProgressHandler(callback)`: Sets a progress handler for asset loading.
- `setCompleteHandler(callback)`: Sets a complete handler for asset loading.

#### AudioManager

Manages loading and playing audio assets.

**Methods:**

- `constructor()`: Initializes the audio manager.
- `loadSound(key, src)`: Loads a sound asset.
- `playSound(key, loop = false)`: Plays a sound asset.
- `pauseSound(key)`: Pauses a sound asset.
- `stopSound(key)`: Stops a sound asset.
- `getSound(key)`: Retrieves a sound asset.

#### InputManager

Handles input events and state.

**Methods:**

- `constructor(eventBus, globalMouse, scopedMouse)`: Initializes the input manager.
- `initialize()`: Sets up event listeners.
- `setupKeyboardListeners()`: Sets up keyboard event listeners.
- `handleKeyDown(event)`: Handles key down events.
- `handleKeyUp(event)`: Handles key up events.
- `emitKeyEvent(actionType, event)`: Emits key events through the event bus.
- `getCombinedKey(event)`: Gets the combined key representation.
- `normalizeKey(key)`: Normalizes the key to a standard representation.
- `setupGlobalMouseListeners()`: Sets up global mouse event listeners.
- `setupScopedMouseListeners()`: Sets up scoped mouse event listeners.
- `emitMouseButtonEvent(eventBus, eventType, scopedMouse, event)`: Emits mouse button events.

#### InputBindingsManager

Manages input bindings.

**Methods:**

- `constructor(eventBus, inputBindings)`: Initializes the input bindings manager.
- `registerInputBindings(inputBindings)`: Registers input bindings with the event bus.
- `handleInputEvent(eventType, event)`: Handles input events.

#### SpritesheetManager

Manages loading and retrieving spritesheets.

**Methods:**

- `constructor()`: Initializes the spritesheet manager.
- `loadSpritesheet(key, imageUrl, frameWidth, frameHeight)`: Loads a spritesheet.
- `getSpritesheet(key)`: Retrieves a spritesheet.

#### Spritesheet

Represents a spritesheet.

**Methods:**

- `constructor(imageUrl, frameWidth, frameHeight)`: Initializes the spritesheet.
- `addFrame(x, y)`: Adds a frame to the spritesheet.
- `getFrame(index)`: Retrieves a frame from the spritesheet.
- `isLoaded()`: Checks if the spritesheet is loaded.

#### GlobalMouse

Handles global mouse events.

**Methods:**

- `constructor()`: Initializes the global mouse.
- `updatePosition(event)`: Updates the mouse position.
- `updateButton(event)`: Updates the mouse button state.

#### ScopedMouse

Handles scoped mouse events relative to a specific element.

**Methods:**

- `constructor(element, dataStoreManager)`: Initializes the scoped mouse.
- `updatePosition(event)`: Updates the mouse position relative to the scoped element.
- `updateButton(event)`: Updates the mouse button state.

#### EntityManager

Manages entities and their components.

**Methods:**

- `constructor(dataStoreManager)`: Initializes the

entity manager with a data store manager.

- `addEntity(entity, type)`: Adds an entity to the manager.
- `removeEntity(entity)`: Removes an entity from the manager.
- `getEntity(id)`: Retrieves an entity by ID.
- `getEntitiesByType(type)`: Retrieves entities by type.
- `queryEntitiesInArea(area)`: Queries entities within a specific area.
- `getEntitiesByProperty(property, value)`: Retrieves entities by a property value.
- `getStoreNameForType(type)`: Determines the store name based on the entity type.

### Utility Classes

#### Vector2D

Represents a 2D vector.

**Methods:**

- `constructor(x, y)`: Initializes a vector with x and y coordinates.
- `add(vector)`: Adds another vector.
- `subtract(vector)`: Subtracts another vector.
- `scale(scalar)`: Scales the vector by a scalar.
- `magnitude()`: Returns the magnitude of the vector.
- `normalize()`: Normalizes the vector.

#### Vector3D

Represents a 3D vector.

**Methods:**

- `constructor(x, y, z)`: Initializes a vector with x, y, and z coordinates.
- `add(vector)`: Adds another vector.
- `subtract(vector)`: Subtracts another vector.
- `scale(scalar)`: Scales the vector by a scalar.
- `magnitude()`: Returns the magnitude of the vector.
- `normalize()`: Normalizes the vector.

#### Matrix

Represents a matrix for transformations.

**Methods:**

- `constructor(rows, cols)`: Initializes a matrix with rows and columns.
- `identity(size)`: Creates an identity matrix of the given size.
- `multiply(matrix)`: Multiplies by another matrix.
- `transform(vector)`: Transforms a vector using the matrix.

#### Rectangle

Represents a rectangle.

**Methods:**

- `constructor(x, y, width, height)`: Initializes a rectangle with position and dimensions.
- `contains(point)`: Checks if a point is inside the rectangle.
- `intersects(rectangle)`: Checks if it intersects with another rectangle.

#### Circle

Represents a circle.

**Methods:**

- `constructor(x, y, radius)`: Initializes a circle with position and radius.
- `contains(point)`: Checks if a point is inside the circle.
- `intersects(circle)`: Checks if it intersects with another circle.

#### Polygon

Represents a polygon.

**Methods:**

- `constructor(vertices)`: Initializes a polygon with vertices.
- `contains(point)`: Checks if a point is inside the polygon.
- `intersects(polygon)`: Checks if it intersects with another polygon.

#### Color

Represents a color and provides methods for manipulation.

**Methods:**

- `constructor(r, g, b, a)`: Initializes a color with red, green, blue, and alpha components.
- `setRGB(r, g, b, a)`: Sets the color using RGB values.
- `setHex(hex)`: Sets the color using a hex string.
- `setHSL(h, s, l, a)`: Sets the color using HSL values.
- `toHex()`: Returns the color as a hex string.
- `toRGB()`: Returns the color as an RGB string.
- `toRGBA()`: Returns the color as an RGBA string.
- `toHSL()`: Returns the color as an HSL string.
- `lighten(amount)`: Lightens the color by a given amount.
- `darken(amount)`: Darkens the color by a given amount.
- `rotateHue(amount)`: Rotates the hue of the color by a given amount.
- `setOpacity(alpha)`: Sets the opacity of the color.
- `clone()`: Creates a copy of the color.
- `toString()`: Returns a string representation of the color.
- `equals(color)`: Checks if this color is equal to another color.

#### StringHelpers

Provides various string manipulation methods.

**Methods:**

- `snakeCase(string, delimiter)`: Converts a string to snake_case.
- `kebabCase(string)`: Converts a string to kebab-case.
- `camelCase(string)`: Converts a string to camelCase.
- `pascalCase(string)`: Converts a string to PascalCase.
- `capitalizeWords(string)`: Capitalizes the first letter of each word in a string.
- `reverse(string)`: Reverses the characters in a string.
- `truncate(string, length)`: Truncates a string to a specified length and adds an ellipsis.
- `pad(string, length, char)`: Pads a string on the left and right to a specified length.
- `removeWhitespace(string)`: Removes all whitespace from a string.
- `titleCase(string)`: Converts a string to title case.
- `replaceAll(string, search, replacement)`: Replaces all instances of a substring with a new substring.

#### HtmlHelper

Provides methods for creating and manipulating HTML elements.

**Methods:**

- `htmlToElement(html)`: Converts an HTML string to an HTMLElement.
- `createCanvas(width, height, id)`: Creates a canvas element with the specified dimensions and id.
- `createElement(tag, attributes, innerHTML)`: Creates an element with the specified tag, attributes, and inner HTML.
- `clearElement(element)`: Removes all child elements from a specified element.
- `appendChildren(parent, ...children)`: Appends multiple children to a specified element.
- `setAttributes(element, attributes)`: Sets multiple attributes on a specified element.

#### MathHelper

Provides common mathematical operations and utilities.

**Methods:**

- `clamp(value, min, max)`: Clamps a number between a minimum and maximum value.
- `lerp(start, end, t)`: Linearly interpolates between two values.
- `degreesToRadians(degrees)`: Converts degrees to radians.
- `radiansToDegrees(radians)`: Converts radians to degrees.
- `randomInt(min, max)`: Generates a random integer between min and max.
- `randomFloat(min, max)`: Generates a random float between min and max.
- `roundTo(value, decimals)`: Rounds a number to a specified number of decimal places.
- `distance(x1, y1, x2, y2)`: Calculates the distance between two points in 2D space.
- `factorial(n)`: Calculates the factorial of a number.
- `isPrime(n)`: Checks if a number is a prime number.

#### ImageHelper

Provides methods for handling image operations.

**Methods:**

- `loadImage(url)`: Loads an image from a URL.
- `resizeImage(img, width, height)`: Resizes an image to the specified width and height.
- `imageToBase64(img)`: Converts an image to a base64 data URL.
- `base64ToImage(base64)`: Converts a base64 data URL to an image.
- `createImage(width, height, src)`: Creates an image element with the specified width, height, and source.
- `drawImagePortion(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`: Draws a rectangular portion of an image
  onto a canvas.

#### DrawHelper

Provides methods for drawing various shapes on a canvas.

**Methods:**

- `drawRectangle(ctx, x, y, width, height, fillColor, strokeColor, lineWidth)`: Draws a rectangle on the canvas.
- `drawCircle(ctx, x, y, radius, fillColor, strokeColor, lineWidth)`: Draws a circle on the canvas.
- `drawPolygon(ctx, vertices, fillColor, strokeColor, lineWidth)`: Draws a polygon on the canvas.
- `drawLine(ctx, x1, y1, x2, y2, color, width)`: Draws a line on the canvas.
- `drawText(ctx, text, x, y, color, font)`: Draws text on the canvas.

#### SVGHelper

Provides methods for creating and manipulating SVG elements.

**Methods:**

- `createSVG(width, height)`: Creates an SVG element.
- `createRectangle(x, y, width, height, fill, stroke, strokeWidth)`: Creates an SVG rectangle.
- `createCircle(cx, cy, radius, fill, stroke, strokeWidth)`: Creates an SVG circle.
- `createLine(x1, y1, x2, y2, stroke, strokeWidth)`: Creates an SVG line.
- `createPolygon(points, fill, stroke, strokeWidth)`: Creates an SVG polygon.
- `createText(textContent, x, y, fill, fontSize, fontFamily)`: Creates an SVG text element.
- `setAttributes(element, attributes)`: Sets multiple attributes on an SVG element.
- `clear(svg)`: Clears all child elements from an SVG element.

### Updated Documentation

#### Engine

The core of the game engine that initializes and manages various services and plugins.

**Methods:**

- `constructor(config)`: Initializes the engine with the provided configuration.
- `service(name, instance = null)`: Adds, retrieves, or removes a service.
- `plugin(name, instance)`: Adds, retrieves, or removes a plugin.
- `init()`: Initializes all plugins.
- `start()`: Starts the game loop.
- `stop()`: Stops the game loop.

#### EngineApi

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

