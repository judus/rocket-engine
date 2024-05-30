#### 1. **BaseComponent**

This is an abstract class for creating components that can be added to entities. It defines lifecycle methods that can
be overridden by subclasses.

```javascript
export default class BaseComponent {
    constructor() {
        this.entity = null;
    }

    onAdd(entity) {
        this.entity = entity;
    }

    onRemove() {
        this.entity = null;
    }

    update(deltaTime) {
        // Logic to execute each frame
    }

    receiveMessage(message, data) {
        // Logic to handle messages sent to the component
    }
}
```

#### 2. **TaskScheduler**

This class manages tasks, allowing them to be scheduled and executed at specified frequencies.

```javascript
class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task, frequency = 1, priority = 0) {
        this.tasks.push({ task, frequency, counter: 0, priority });
        this.tasks.sort((a, b) => b.priority - a.priority);
    }

    runTasks(deltaTime) {
        this.tasks.forEach(taskInfo => {
            taskInfo.counter += deltaTime;
            if (taskInfo.counter >= taskInfo.frequency) {
                taskInfo.task(deltaTime);
                taskInfo.counter = 0;
            }
        });
    }

    adjustTaskFrequency(task, newFrequency) {
        const taskInfo = this.tasks.find(t => t.task === task);
        if (taskInfo) {
            taskInfo.frequency = newFrequency;
        }
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t.task !== task);
    }
}
```

#### 3. **EntityTransform**

This class provides geometric transformation utilities for entities.

```javascript
export default class EntityTransform {
    static updateVertices(entity, vertices) {
        return vertices.map(vertex => {
            const scaledX = vertex.x * entity.scale;
            const scaledY = vertex.y * entity.scale;
            const rotatedX = scaledX * Math.cos(entity.rotation) - scaledY * Math.sin(entity.rotation);
            const rotatedY = scaledX * Math.sin(entity.rotation) + scaledY * Math.cos(entity.rotation);
            return { x: rotatedX + entity.pos.x, y: rotatedY + entity.pos.y };
        });
    }

    static updateBoundingBox(entity) {
        const { x, y, width, height } = entity.boundingBox;
        const vertices = [{ x, y }, { x: x + width, y }, { x, y: y + height }, { x: x + width, y: y + height }];
        return this.updateVertices(entity, vertices);
    }

    static getGlobalPosition(entity) {
        let globalPos = { x: entity.pos.x, y: entity.pos.y };
        let currentParent = entity.parent;

        while (currentParent) {
            const scaledX = globalPos.x * currentParent.scale;
            const scaledY = globalPos.y * currentParent.scale;
            const rotatedX = scaledX * Math.cos(currentParent.rotation) - scaledY * Math.sin(currentParent.rotation);
            const rotatedY = scaledX * Math.sin(currentParent.rotation) + scaledY * Math.cos(currentParent.rotation);

            globalPos.x = rotatedX + currentParent.pos.x;
            globalPos.y = rotatedY + currentParent.pos.y;
            currentParent = currentParent.parent;
        }

        return globalPos;
    }

    static getGlobalScale(entity) {
        let globalScale = entity.scale;
        let currentParent = entity.parent;

        while (currentParent) {
            globalScale *= currentParent.scale;
            currentParent = currentParent.parent;
        }

        return globalScale;
    }

    static getGlobalRotation(entity) {
        let globalRotation = entity.rotation;
        let currentParent = entity.parent;

        while (currentParent) {
            globalRotation += currentParent.rotation;
            currentParent = currentParent.parent;
        }

        return globalRotation;
    }
}
```

#### 4. **Entity**

This is the core class representing an entity in the game. It includes properties for geometry, physics, functional
components, collision detection, and hierarchy management.

```javascript
import TaskScheduler from "../services/TaskScheduler.js";
import EntityTransform from "../services/EntityTransform.js";
import EntityManager from "./EntityManager.js";
import EngineParts from "../EngineParts.js";
import StringHelpers from "../utils/StringHelpers.js";

export default class Entity {
    constructor(engine, config, id = null) {
        this.engine = engine;
        this.id = id || config.id || StringHelpers.generateUUID();
        this.type = config.type || this.constructor.name;

        // Geometry
        this.pos = Spatial2D((config.pos.x || 0), (config.pos.y || 0));
        this.width = config.width || 0;
        this.height = config.height || 0;
        this.scale = config.scale || 1;
        this.rotation = config.rotation || 0;

        // Physics
        this.vel = config.vel || {x: 0, y: 0};
        this.acc = config.acc || {x: 0, y: 0};
        this.drag = config.drag || 0.99;
        this.rotationSpeed = config.rotationSpeed || Math.PI * 5;

        // Functional
        this.taskScheduler = engine.service(EngineParts.TASK_SCHEDULER);
        this.eventBus = engine.service(EngineParts.EVENT_BUS);
        this.components = config.components || {};
        this.behavior = config.behavior || null;
        this.spriteSheet = config.spriteSheet || null;

        // Collision
        this.boundingBox = this.createBoundingBox();
        this.collisionBoxes = config.collisionBoxes || [];
        this.polygon = config.polygon || [];
        this.frames = config.frames || {};

        // Hierarchy
        this.children = config.children || [];
        this.parent = config.parent || null;

        // Storage
        this.entityManager = engine.service(EngineParts.ENTITY_MANAGER);
        this.storeName = config.storeName || EngineParts.ENTITY_STORE_NAME;
        this.spatialHash = null;
        this.pos.onChange = () => {
            if(this.entityManager) {
                this.entityManager.updateEntity(this);
            }
        };
    }

    createBoundingBox() {
        return {
            x: this.pos.x,
            y: this.pos.y,
            width: this.width,
            height: this.height
        };
    }

    getComponent(name) {
        return this.components[name];
    }

    addComponent(componentType, component, updateFrequency = 1, renderFrequency = 1) {
        this.components[componentType] = component;
        component.onAdd(this);

        if(component.update) {
            this.taskScheduler.addTask(component.update.bind(component), updateFrequency);
        }
        if(component.render) {
            this.taskScheduler.addTask(component.render.bind(component), renderFrequency);
        }
    }

    removeComponent(componentType) {
        const component = this.components[componentType];
        if(component) {
            component.onRemove();
            this.taskScheduler.removeTask(component.update.bind(component));
            this.taskScheduler.removeTask(component.render.bind(component));
            delete this.components[componentType];
        }
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child) {
        this.children = this.children.filter(c => c !== child);
        child.parent = null;
    }

    getGlobalPosition() {
        return EntityTransform.getGlobalPosition(this);
    }

    getGlobalScale() {
        return EntityTransform.getGlobalScale(this);
    }

    getGlobalRotation() {
        return EntityTransform.getGlobalRotation(this);
    }

    setBehavior(behavior, frequency = 1) {
        this.behavior = behavior;
        if(behavior) {
            this.taskScheduler.addTask(behavior.perform.bind(behavior, this), frequency);
        }
    }

    update(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
        this.children.forEach(child => child.update(deltaTime));
    }

    render(context) {
        Object.values(this.components).forEach(component => {
            if(component.render) {
                const globalPos = this.getGlobalPosition();
                component.render(context, globalPos.x, globalPos.y);
            }
        });
        this.children.forEach(child => child.render(context));
    }

    onCollision(otherEntity, collisionResult) {
        console.log(`Entity ${this.id} collided with ${otherEntity.id}`);
    }

    destroy() {
        // Remove entity from the spatial hash grid
        if(this.entityManager) {
            this.entityManager.deleteSpatial(this.pos.x, this.pos.y, this);
            this.entityManager.delete(this.id);
        }

        // Notify the parent if there is one
        if(this.parent) {
            this.parent.removeChild(this);
        }

        // Destroy children
        this.children.forEach(child => {
            child.destroy();
        });

        // Emit a destroy event or handle other clean up if needed
        if(this.eventBus) {
            this.eventBus.emit('entityDestroyed', this);
        }
    }
}
```

#### 5. **StarShip**

This class extends `Entity` to create a specific type of entity with additional methods for firing weapons and handling
damage.

```javascript
import Entity from './Entity';
import SpriteSheet from '../services/SpriteSheet';

class StarShip extends Entity {
    constructor(engine, config, id = null) {
        super(engine, config, id);

        if (config.spriteSheet) {
            this.addComponent('spriteSheet', config.spriteSheet);
        }
    }

    fireWeapon() {
        console.log(`${this.id} is firing its weapon

!`);
        // Add weapon firing logic here
    }

    takeDamage(damageAmount) {
        console.log(`${this.id} took ${damageAmount} damage!`);
        // Add damage handling logic here
    }
}

// Example usage:
const spriteSheetImage = new Image();
spriteSheetImage.src = 'path/to/spritesheet.png';

const spriteSheet = new SpriteSheet(spriteSheetImage, 64, 64, 10, 0.1);

const starShip = new StarShip(
    engine,
    {
        id: 'starShip1',
        pos: { x: 200, y: 200 },
        width: 64,
        height: 64,
        collisionDetection: 2,
        spriteSheet: spriteSheet
    }
);

starShip.fireWeapon();
starShip.takeDamage(25);

export default StarShip;
```

#### 6. **CollisionComponent**

This class manages collision detection and response for entities.

```javascript
import BaseComponent from "../../abstracts/BaseComponent.js";
import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import QuadTree from "../../services/QuadTree.js";
import EntityTransform from "../../services/EntityTransform";

export default class CollisionComponent extends BaseComponent {
    constructor(collisionResponse = null, debug = false) {
        super();
        this.collidingEntities = [];
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
    }

    check(entities) {
        const boundary = new Rectangle(this.entity.pos.x - 240, this.entity.pos.y - 310, 480, 620);
        const quadTree = new QuadTree(boundary, 2);

        entities.forEach(entity => quadTree.insert(entity));

        quadTree.query(boundary).forEach(candidate => {
            if(this.entity !== candidate && this.checkCollision(this.entity, candidate).collided) {
                this.handleCollision(this.entity, candidate, {collided: true});
            }
        });

        this.entity.quadTree = quadTree; // Store the quad tree in the entity for future reference
    }

    checkCollision(entity, candidate) {
        if(!entity) {
            console.error(`This entity is invalid or has been removed`);
            return {collided: false};
        }

        if(!candidate) {
            console.error(`Other entity is null`);
            return {collided: false};
        }

        const detectionLevel = this.entity.config.collisionDetection || DetectionTypes.OUTER_BOX;
        let collisionResult;

        // Check outer bounding box
        if(detectionLevel >= DetectionTypes.OUTER_BOX) {
            this.updateBoundingBox();
            collisionResult = CollisionDetector.checkBoundingBoxCollision(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check sub bounding boxes
        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            this.updateSubBoundingBoxes();
            collisionResult = CollisionDetector.checkSubBoxCollision(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either main entity polygon...
        if(detectionLevel === DetectionTypes.POLYGON) {
            this.updateEntityPolygon();
            collisionResult = CollisionDetector.checkEntityPolygonCollision(entity, candidate);
            return collisionResult;
        }

        // ... or check the current sprite sheet frame polygon
        if(detectionLevel === DetectionTypes.FRAME_POLYGON) {
            this.updateSpriteSheetFramePolygon();
            collisionResult = CollisionDetector.checkFramePolygonCollision(entity, candidate);
            return collisionResult;
        }

        return {collided: false};
    }

    updateBoundingBox(entity, candidate) {
        const boundingBox = {}; // Calculate bounding box based on entity.pos, entity.width, and entity.height
        EntityTransform.updateVertices(boundingBox);
    }

    updateSubBoundingBoxes(entity, candidate) {
        entity.collisionBoxes.forEach(box => EntityTransform.updateVertices(box));
    }

    updateEntityPolygon(entity, candidate) {
        EntityTransform.updateVertices(entity.polygon);
    }

    updateSpriteSheetFramePolygon(entity, candidate) {
        const currentFrame = entity.getComponent('sprite').getFrame();
        EntityTransform.updateVertices(entity.frames[currentFrame]);
    }

    handleCollision(entity, otherEntity, collisionResult) {
        this.collisionResponse.handleCollision(entity, otherEntity, collisionResult);
        otherEntity.onCollision(entity, collisionResult);

        if(this.debug) {
            console.log(`${entity.id} collided with ${otherEntity.id}`);
        }
    }
}
```
