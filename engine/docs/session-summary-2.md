### Session Summary

#### Key Accomplishment:

- **Naming the Engine:**
    - We finally gave our engine a real name, "Rocket".

#### Recap of Relevant Questions and Their Resolutions:

- **Handling ECS for Large Numbers of Entities:**
    - Discussed the balance between pure ECS and hybrid solutions to optimize performance for a large number of
      entities.
    - Decided to keep the position as a core attribute in a hybrid model for simplicity and performance.
- **Service Management and API Exposure:**
    - Refactored the service management system to make API interactions more intuitive and provide proper autocompletion
      and checks in the IDE.
    - Introduced `EngineApi` for handling interactions within the engine and `Rocket` for overall management and
      external interactions.
- **Scene and Camera Management:**
    - Implemented a more flexible scene and camera management system to support multiple scenes and cameras in different
      contexts.

#### Current State of the Application:

- The envisioned parts of the engine are working as expected.
- Encountered an initialization problem with the `scopedMouse`, causing the `this.engine` to not be set and consequently
  the properties `pos` and `world` remain `null`.

#### Summary of Activities:

- **Refactoring and Renaming:**
    - Renamed `Engine` to `Rocket` and moved functionality from `EngineApi` to `Rocket` to improve clarity and API
      usability.
- **Scene and Camera Management:**
    - Improved the `SceneManager` to support methods like `previous()`, `next()`, `first()`, and `last()`.
    - Added initial scene loading with the `first()` method when a stack is created.
- **Service Initialization:**
    - Enhanced the `service` method to automatically initialize services when they are added, if the engine is already
      initialized.
- **Configuration Management:**
    - Introduced a `Config` class for managing engine configurations, allowing for easy access and modification of
      settings.

#### Remarkable Discussions:

- **Parallax Effect for Space Background:**
    - Discussed implementing a parallax effect for stars in the background to create a sense of depth in a top-down 2D
      space game.
- **3D Spatial Hash Grid:**
    - Considered the implications of adding a z-axis to the spatial hash grid for more complex spatial interactions and
      depth representation.

#### Consolidated Git Commit Message:

```
Refactor and Rename Engine to Rocket
- Introduced Rocket as the main class, refactoring EngineApi functionality into Rocket.
- Implemented flexible scene and camera management with SceneManager enhancements.
- Enhanced service initialization and management for better modularity.
- Introduced Config class for streamlined configuration management.
- Addressed initialization issue with scopedMouse.
- Discussed and planned parallax effect and 3D spatial hash grid.
```

### Next Steps:

1. **Fix Initialization Issue with ScopedMouse:**
    - Investigate and resolve the initialization problem causing `this.engine` to not be set properly.
2. **API Documentation:**
    - Update the API documentation to reflect the recent changes and additions.
3. **Further Testing:**
    - Conduct thorough testing to ensure all parts of the engine are functioning correctly, especially the newly
      refactored components.
