Sure! Here's a comprehensive summary of all the ship components and how they work together to create a fully functional
and customizable starship.

### Ship Components Overview

1. **Entity2D**:
    - **Base Class**: The core entity class representing all objects in the game, including the starship and its
      components.
    - **Hierarchy Management**: Handles parent-child relationships between entities.
    - **Position and Movement**: Manages position, velocity, and physics-related properties.
    - **Component Management**: Adds, removes, and updates components.
    - **Energy Management Integration**: Integrates energy consumption and component activation/deactivation.

2. **ReactorComponent**:
    - **Responsibilities**: Manages the ship's energy capacity and recharge rate.
    - **Energy Supply**: Recharges energy over time and provides energy to other components.
    - **Energy Consumption**: Consumes energy for various operations.
    - **Methods**: `recharge`, `consume`, `update`.

3. **EnergyManagerComponent**:
    - **Responsibilities**: Manages energy distribution to all components.
    - **Component Registration**: Registers components with their energy costs and priorities.
    - **Energy Allocation**: Allocates energy based on priorities and available energy.
    - **Shutdown Mechanism**: Deactivates components in order of priority when energy is insufficient.
    - **Methods**: `registerComponent`, `allocateEnergy`, `update`.

4. **ShipComponent**:
    - **Base Class for Components**: Extends BaseComponent and adds common functionalities.
    - **Profiles and Activation**: Manages profiles for different component settings and activation states.
    - **Methods**: `activate`, `deactivate`, `applyProfile`, `update`.

5. **ComponentProfile**:
    - **Responsibilities**: Defines profiles for components with specific properties and their modification methods.
    - **Properties**: Contains key-value pairs of properties and their modification types (addition or factor).
    - **Methods**: `applyProfile`.

6. **DamperComponent**:
    - **Responsibilities**: Reduces inertia and drag for smoother movement.
    - **Profiles**: Different profiles for various damping settings.
    - **Energy Consumption**: Consumes energy based on active profile.
    - **Methods**: `applyProfile`, `update`.

7. **EngineComponent**:
    - **Responsibilities**: Manages thrust and torque for the starship.
    - **Profiles**: Different profiles for various thrust and efficiency settings.
    - **Energy Consumption**: Consumes energy based on active profile.
    - **Methods**: `applyProfile`, `update`.

8. **WeaponSystemComponent**:
    - **Responsibilities**: Manages weapons, their groups, and firing mechanisms.
    - **Weapon Groups**: Allows creating and managing groups of weapons for simultaneous firing.
    - **Energy Consumption**: Consumes energy when weapons are active and firing.
    - **Methods**: `createWeaponGroup`, `activateWeaponGroup`, `deactivateWeaponGroup`, `fire`, `update`.

9. **Weapon Components (LaserWeapon, KineticWeapon)**:
    - **Responsibilities**: Specific implementations of different weapon types.
    - **Profiles**: Define energy consumption, firing rate, and other weapon-specific properties.
    - **Ammo Management**: For kinetic weapons, manage ammunition and cargo space.
    - **Methods**: `fire`, `applyProfile`, `update`.

10. **EntityMountsComponent**:
    - **Responsibilities**: Manages attachment points (mounts) for weapons and utilities.
    - **Mount Management**: Attaches and detaches entities to/from mounts.
    - **Position Updates**: Updates positions of mounted entities based on parent entity's position and rotation.
    - **Methods**: `attachEntity`, `detachEntity`, `updatePositions`, `update`.

11. **CargoBayComponent**:
    - **Responsibilities**: Manages the ship's cargo space.
    - **Capacity Management**: Tracks and manages available cargo space.
    - **Energy Consumption**: Consumes energy based on active profile.
    - **Methods**: `addCargo`, `removeCargo`, `applyProfile`, `update`.

12. **InventoryComponent**:
    - **Responsibilities**: Manages the ship's inventory for items and resources.
    - **Item Management**: Adds, removes, and tracks items in the inventory.
    - **Methods**: `addItem`, `removeItem`, `update`.

13. **EnvironmentComponent**:
    - **Responsibilities**: Applies environmental effects like drag and gravity.
    - **Profiles**: Different profiles for various environmental settings.
    - **Methods**: `applyProfile`, `update`.

14. **PhysicsComponent**:
    - **Responsibilities**: Manages physics calculations for the starship.
    - **Movement and Rotation**: Updates movement and rotation based on physics.
    - **Methods**: `applyPhysics`, `update`.

15. **ControllerComponent**:
    - **Responsibilities**: Handles user input and controls for the starship.
    - **Input Management**: Maps user inputs to actions like thrust and weapon firing.
    - **Methods**: `setInput`, `update`.

16. **RenderComponent**:
    - **Responsibilities**: Manages rendering of the starship and its components.
    - **Drawing**: Draws the ship and its components on the canvas.
    - **Methods**: `render`.

17. **Scanner and Jammer Components**:
    - **Responsibilities**: Manage scanning and jamming capabilities.
    - **Profiles**: Define range, power, and effectiveness of scanners and jammers.
    - **Energy Consumption**: Consumes energy based on active profile.
    - **Methods**: `applyProfile`, `update`.

18. **ShieldComponent**:
    - **Responsibilities**: Manages defensive shields for the starship.
    - **Profiles**: Define strength, recharge rate, and energy consumption of shields.
    - **Energy Consumption**: Consumes energy based on active profile.
    - **Methods**: `applyProfile`, `update`.

19. **HeatManagementComponent**:
    - **Responsibilities**: Manages heat generation and dissipation.
    - **Heat Sources**: Tracks components that generate heat.
    - **Dissipation Mechanisms**: Uses heat sinks or other methods to dissipate heat.
    - **Methods**: `addHeat`, `dissipateHeat`, `update`.

20. **NavigationComputerComponent**:
    - **Responsibilities**: Manages navigation and route plotting.
    - **Map and Database**: Stores and provides maps and discovered locations.
    - **Autopilot**: Handles autopilot functions for navigating routes.
    - **Methods**: `plotRoute`, `navigateRoute`, `update`.

21. **AutopilotComponent**:
    - **Responsibilities**: Automates navigation and control based on pre-plotted routes.
    - **Integration**: Works with the navigation computer for route execution.
    - **Methods**: `startAutopilot`, `stopAutopilot`, `update`.

### Integration and Workflow

1. **Initialization**:
    - The starship entity (`StarShip`) is created, initializing all components and configuring them based on the
      provided profiles and configurations.
    - Components are registered with the `EnergyManagerComponent`, which tracks their energy consumption and priorities.

2. **Energy Management**:
    - The `EnergyManagerComponent` allocates energy to all registered components based on their priorities.
    - Components consume energy for their operations, and the energy manager ensures they are activated or deactivated
      based on available energy.
    - The `ReactorComponent` recharges the ship's energy over time.

3. **Component Activation and Updates**:
    - Components are updated in each game loop iteration, consuming energy, updating their states, and applying profiles
      as necessary.
    - The `DamperComponent`, `EngineComponent`, and `PhysicsComponent` manage the ship's movement and physics.
    - The `WeaponSystemComponent` manages weapon groups and handles firing mechanisms.
    - Utility components like `Scanner` and `Jammer` perform their specific functions, consuming energy as needed.

4. **Interaction and Control**:
    - The `ControllerComponent` handles user input, translating commands into actions like thrust, weapon firing, and
      utility activation.
    - The `NavigationComputerComponent` and `AutopilotComponent` provide automated navigation and control based on
      pre-plotted routes and maps.

5. **Rendering and Visuals**:
    - The `RenderComponent` handles the rendering of the starship and its components, ensuring they are visually
      represented on the canvas.
    - The `SpriteComponent` manages the drawing of sprites for the starship and its weapons.

6. **Heat and Shields**:
    - The `HeatManagementComponent` tracks heat generation and dissipation, preventing overheating of the starship.
    - The `ShieldComponent` manages the ship's defensive shields, consuming energy to provide protection.

7. **Cargo and Inventory**:
    - The `CargoBayComponent` and `InventoryComponent` manage the ship's cargo space and inventory, tracking items,
      ammunition, and resources.

This comprehensive system allows for a highly customizable and interactive starship, capable of handling complex
gameplay mechanics and providing a rich player experience.