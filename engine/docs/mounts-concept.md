### Key Components, Their Interactions, and Concepts

1. **EntityMounts Component**
    - **Responsibilities**:
        - Manage all types of mounts (weapons, utilities, etc.) for any entity.
        - Handle attachment and detachment of mountable entities.
        - Update positions of mounted entities based on the parent entity's position and orientation.
    - **Interactions**:
        - **With Entity**: Updates positions based on the parent entity's global position and rotation.
        - **With Mountable Entities**: Ensures entities are attached to the correct mounts and updated appropriately.
    - **Methods**:
        - `setProfile(profile, accumulate)`: Sets or accumulates mounts based on the given profile.
        - `attachEntity(entity, mountIndex, type)`: Attaches an entity to a specific mount.
        - `detachEntity(mountIndex, type)`: Detaches an entity from a specific mount.
        - `getMounts(type)`: Retrieves mounts of a specific type.
    - **Mount Types and Compatibility**:
        - **Weapon Mounts**:
            - Compatible with specific weapon types (e.g., laser, kinetic).
            - Consume energy when active.
            - May require ammunition, which occupies cargo space.
        - **Utility Mounts**:
            - Compatible with specific utility types (e.g., scanners, jammers, repairbots).
            - Consume energy when active.
            - Provide strategic advantages and support functions.

2. **WeaponSystem Component**
    - **Responsibilities**:
        - Manage weapon mounts specifically.
        - Create and manage weapon groups.
        - Activate and deactivate weapon groups.
        - Fire all active weapon groups.
    - **Interactions**:
        - **With EntityMounts**: Retrieves and manages weapon mounts.
        - **With PowerPlant**: Consumes energy for firing weapons and managing groups.
    - **Methods**:
        - `createWeaponGroup(name, weaponIndices)`: Creates a weapon group.
        - `activateWeaponGroup(name)`: Activates a weapon group.
        - `deactivateWeaponGroup(name)`: Deactivates a weapon group.
        - `fire()`: Fires all active weapon groups.
    - **Weapon Groups**:
        - **Grouping**:
            - Players can create weapon groups to manage multiple weapons simultaneously.
            - Groups can be activated or deactivated based on tactical requirements.
            - Only active weapon groups consume energy.

3. **PowerPlantComponent**
    - **Responsibilities**:
        - Manage the energy capacity and recharge rate of an entity.
        - Consume energy for various operations, including weapon firing and utility usage.
    - **Interactions**:
        - **With WeaponSystem**: Provides energy for weapon firing.
        - **With Utility Systems**: Provides energy for active utilities.
    - **Methods**:
        - `recharge(deltaTime)`: Recharges energy over time.
        - `consume(amount)`: Consumes a specified amount of energy.
    - **Energy Management**:
        - **Power Consumption**:
            - Weapons and utilities consume energy when activated.
            - Each type of weapon or utility has a base energy consumption rate.
            - The power plant component manages the available energy and recharges it over time.
        - **Energy Efficiency**:
            - Different profiles can adjust the efficiency of energy usage.
            - Inertia dampers, if active, consume a significant portion of the available energy.

4. **Entity Class**
    - **Responsibilities**:
        - Use the `EntityMounts` and `WeaponSystem` components to manage mounts and weapon groups.
        - Leverage parent/child relationships for updating and rendering entities.
    - **Interactions**:
        - **With EntityMounts and WeaponSystem**: Delegates mount and weapon management to respective components.
        - **With Children**: Updates and renders child entities.
    - **Methods**:
        - `update(deltaTime)`: Updates the entity and its components.
        - `render(ctx)`: Renders the entity and its children.
    - **Space Management**:
        - **Cargo Space**:
            - Kinetic weapons require ammunition, which occupies cargo space.
            - Ammunition has weight and affects the total mass of the entity.
            - Managing cargo space is crucial for maintaining balance and performance.

5. **MountProfile Class**
    - **Responsibilities**:
        - Define the available mounts and their positions relative to the entity.
        - Specify compatibility requirements for each mount.
    - **Methods**:
        - `constructor(mounts)`: Initializes the profile with a list of mount definitions.
    - **Example MountProfile Definition**:
      ```javascript
      const mountProfile = [
          {
              type: 'weapon',
              typeCompatibility: ['laser', 'kinetic'],
              position: { x: 10, y: 20 }
          },
          {
              type: 'utility',
              typeCompatibility: ['scanner', 'jammer'],
              position: { x: -10, y: 20 }
          },
          // Additional mounts...
      ];
      ```

6. **MountableEntity Interface**
    - **Responsibilities**:
        - Define common behaviors for mountable entities (e.g., attach, detach, activate, deactivate).
    - **Interactions**:
        - **With EntityMounts**: Ensures compatibility and proper management when mounted.

7. **Inertia Dampers**
    - **Functionality**:
        - Reduce inertia, allowing for quick changes in direction and rapid deceleration.
        - High energy consumption when active.
        - Can be toggled on/off by the player.

8. **Visual and Audio Effects**
    - **Indicators**:
        - Bright thruster flares indicate rapid changes in direction.
        - Quick acceleration sounds emphasize immediate responsiveness.
        - Subtle thruster glows reflect sustained thrust and gradual changes in movement.
        - Realistic engine sounds emphasize ongoing thrust and inertia.

### Example Usage

```javascript
const entity = new Entity(engine, { mountProfile: someProfile }, 'entity1');

// Setting a new mount profile
entity.hasComponent('entityMounts', (component) => component.setProfile(anotherProfile));

// Attaching an entity to a specific mount
entity.hasComponent('entityMounts', (component) => component.attachEntity(someWeapon, 0, 'weapon'));

// Detaching an entity from a specific mount
entity.hasComponent('entityMounts', (component) => component.detachEntity(0, 'weapon'));

// Creating a weapon group
entity.hasComponent('weaponSystem', (component) => component.createWeaponGroup('group1', [0, 1]));

// Activating a weapon group
entity.hasComponent('weaponSystem', (component) => component.activateWeaponGroup('group1'));

// Firing all weapons
entity.hasComponent('weaponSystem', (component) => component.fire());
```

### Summary

- **EntityMounts Component**: Manages all types of mounts and their positions relative to the entity.
- **WeaponSystem Component**: Manages weapon mounts and groups.
- **PowerPlantComponent**: Manages energy consumption and recharge.
- **Entity Class**: Uses the `EntityMounts` and `WeaponSystem` components to handle mounts and weapons.
- **MountProfile Class**: Defines mount configurations.
- **MountableEntity Interface**: Ensures common behavior for mountable entities.
- **Inertia Dampers**: Reduce inertia for quick changes in direction but consume significant energy.



### 1. Base Entity (Entity2D) Class

Handles the parent/child relationships, updates, and rendering.

```javascript
class Entity2D {
    constructor(engine, config, id) {
        this.engine = engine;
        this.config = config;
        this.id = id;
        this.children = [];
        // Other initialization...
    }

    addChild(child) {
        if (this.children.includes(child)) {
            console.warn(`Child ${child.id} already added to entity ${this.id}`);
            return;
        }
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

    update(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
        CustomPhysics2D.update(this, deltaTime);
        this.children.forEach(child => child.update(deltaTime));
    }

    render(ctx) {
        // Render entity-specific elements...
        this.children.forEach(child => child.render(ctx));
    }
}
```

### 2. Entity Class

Uses the `EntityMounts` and `WeaponSystem` components.

```javascript
import Entity2D from "./Entity2D.js";
import EntityMounts from "./EntityMountsComponent.js";
import WeaponSystem from "./WeaponSystem.js";

export default class Entity extends Entity2D {
    constructor(engine, config, id) {
        super(engine, config, id);

        this.entityMounts = new EntityMounts();
        this.weaponSystem = new WeaponSystem();
        this.addComponent('entityMounts', this.entityMounts, 1 / 60, 7);
        this.addComponent('weaponSystem', this.weaponSystem, 1 / 60, 8);

        if (config.mountProfile) {
            this.entityMounts.setProfile(config.mountProfile);
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.entityMounts.update(deltaTime);
        this.weaponSystem.update(deltaTime);
    }

    render(ctx) {
        super.render(ctx);
        // Render entity-specific elements...
    }
}
```

### 3. EntityMounts Component

Manages all types of mounts and their positions relative to the entity.

```javascript
import BaseComponent from "../../abstracts/BaseComponent.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class EntityMounts extends BaseComponent {
    constructor() {
        super();
        this.mounts = {};
    }

    setProfile(profile, accumulate = false) {
        if (!accumulate) {
            this.mounts = {};
        }

        profile.mounts.forEach(mount => {
            if (!this.mounts[mount.type]) {
                this.mounts[mount.type] = [];
            }
            this.mounts[mount.type].push({
                typeCompatibility: mount.typeCompatibility,
                position: new Vector3D(mount.position.x, mount.position.y, mount.position.z),
                currentEntity: null
            });
        });
    }

    attachEntity(entity, mountIndex, type) {
        const mounts = this.mounts[type];
        if (mounts) {
            const mount = mounts[mountIndex];
            if (mount && mount.typeCompatibility.includes(entity.type)) {
                mount.currentEntity = entity;
                this.entity.addChild(entity);
            } else {
                throw new Error('Entity type not compatible with this mount.');
            }
        }
    }

    detachEntity(mountIndex, type) {
        const mounts = this.mounts[type];
        if (mounts) {
            const mount = mounts[mountIndex];
            if (mount && mount.currentEntity) {
                this.entity.removeChild(mount.currentEntity);
                mount.currentEntity = null;
            }
        }
    }

    updatePositions() {
        const entityPosition = this.entity.getGlobalPosition();
        const entityOrientation = this.entity.getGlobalRotation();

        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if (mount.currentEntity) {
                    const rotatedPosition = mount.position.rotate(entityOrientation);
                    mount.currentEntity.setPosition(entityPosition.add(rotatedPosition));
                    mount.currentEntity.setOrientation(entityOrientation);
                }
            });
        });
    }

    update(deltaTime) {
        this.updatePositions();
    }

    getMounts(type) {
        return this.mounts[type] || [];
    }
}
```

### 4. MountProfile Class

Defines the available mounts and their positions relative to the entity.

```javascript
class MountProfile {
    constructor(mounts) {
        this.mounts = mounts; // Array of mount definitions
    }
}
```

### 5. WeaponSystem Component

Manages only weapon mounts, creating and managing weapon groups.

```javascript
import BaseComponent from "../../abstracts/BaseComponent.js";

export default class WeaponSystem extends BaseComponent {
    constructor() {
        super();
        this.weaponGroups = {};
    }

    createWeaponGroup(name, weaponIndices) {
        this.weaponGroups[name] = weaponIndices;
    }

    activateWeaponGroup(name) {
        const weaponIndices = this.weaponGroups[name];
        const weaponMounts = this.entity.getComponent('entityMounts').getMounts('weapon');
        weaponIndices.forEach(index => {
            const mount = weaponMounts[index];
            if (mount && mount.currentEntity) {
                mount.currentEntity.activate();
            }
        });
    }

    deactivateWeaponGroup(name) {
        const weaponIndices = this.weaponGroups[name];
        const weaponMounts = this.entity.getComponent('entityMounts').getMounts('weapon');
        weaponIndices.forEach(index => {
            const mount = weaponMounts[index];
            if (mount && mount.currentEntity) {
                mount.currentEntity.deactivate();
            }
        });
    }

    fire() {
        // Example method to fire all active weapon groups
        Object.keys(this.weaponGroups).forEach(name => this.activateWeaponGroup(name));
    }
}
```

### 6. Render System

A simple render system that loops over the `children` array and renders each child entity.

```javascript
class RenderSystem {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(entity) {
        entity.render(this.ctx);
    }
}
```

### Example Usage

Interacting with the components directly to manage mounts and weapon groups.

```javascript
const entity = new Entity(engine, { mountProfile: someProfile }, 'entity1');

// Setting a new mount profile
entity.hasComponent('entityMounts', (component) => component.setProfile(anotherProfile));

// Attaching an entity to a specific mount
entity.hasComponent('entityMounts', (component) => component.attachEntity(someWeapon, 0, 'weapon'));

// Detaching an entity from a specific mount
entity.hasComponent('entityMounts', (component) => component.detachEntity(0, 'weapon'));

// Creating a weapon group
entity.hasComponent('weaponSystem', (component) => component.createWeaponGroup('group1', [0, 1]));

// Activating a weapon group
entity.hasComponent('weaponSystem', (component) => component.activateWeaponGroup('group1'));

// Deactivating a weapon group
entity.hasComponent('weaponSystem', (component) => component.deactivateWeaponGroup('group1'));

// Firing all weapons
entity.hasComponent('weaponSystem', (component) => component.fire());
```

### Summary

- **Entity2D Class**: Manages the parent/child relationships, updates, and rendering.
- **Entity Class**: Uses the `EntityMounts` and `WeaponSystem` components.
- **EntityMounts Component**: Manages all types of mounts and their positions relative to the entity.
- **MountProfile Class**: Defines the available mounts and their positions relative to the entity.
- **WeaponSystem Component**: Manages only weapon mounts, creating and managing weapon groups.
- **Render System**: Loops over the `children` array and renders each child entity.

This approach ensures a clean separation of concerns, efficient handling of mountable entities, and straightforward
rendering logic.