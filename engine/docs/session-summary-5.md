### Final Summary

**Key Accomplishment:**

- We successfully named our engine "Rocket."

**Relevant Questions and Solutions:**

- We discussed how other engines handle collision detection and the importance of bounding boxes and polygons for
  efficient and precise collision detection.
- We explored the best approach to integrate quad trees for spatial partitioning.
- We considered the balance between complexity and efficiency in our collision detection system, opting for a hybrid
  approach.

**Summary of Actions:**

- Refactored the `EntityInitialization` class to handle async loading and initialization of entity definitions and
  sprites.
- Ensured proper order of operations for initializing and creating entities to avoid issues with control and sprite
  loading.
- Implemented `CollisionShapeGenerator` and `PolygonTracer` for dynamic collision shape generation based on sprite
  images.
- Added functionality for rotating image bitmaps and vertices to align entity orientation with system expectations.
- Enhanced the `CollisionComponent` to check for various levels of collision detection, including outer boxes,
  sub-boxes, polygons, and frame polygons.
- Introduced a more structured and flexible entity definition format, accommodating rotation and polygon properties
  directly.

**Struggles and Areas for Improvement:**

- Synchronizing async operations during engine initialization, particularly ensuring sprites are loaded before entity
  creation.
- Clarifying the distinction between system-level transformations and entity-specific rotations.
- Ensuring that the collision detection system accurately reflects the current state of entities after transformations.

**Remarkable Discussions:**

- The importance of user-friendly API naming and the potential for renaming some methods for better fluency (
  e.g., `rocket.launch()` instead of `rocket.start()`).
- The fun exploration of creating a more engaging and enjoyable developer experience with Rocket's API.

**Current Issues:**

- Proper initialization of sprites.
- Ensuring the collision detection system accounts for the current transformations of entities.

**Git Commit Message:**

```
feat: Enhance entity initialization and collision detection

- Refactored EntityInitialization for async loading of sprites and definitions
- Improved CollisionShapeGenerator and PolygonTracer for dynamic shape generation
- Added support for rotating image bitmaps and vertices
- Enhanced CollisionComponent with multiple detection levels
- Structured entity definitions to include rotation and polygon properties
```