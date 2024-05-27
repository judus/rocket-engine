### Session Summary

**Key Accomplishment:**
We significantly enhanced the game engine by adding robust mouse interaction capabilities, entity highlighting, and a
dynamic context menu system. These improvements make the engine more user-friendly and visually intuitive.

**Relevant Questions and Solutions:**

- **Mouse Interaction**: We discussed how to handle mouse events and implemented continuous area selection with visual
  feedback.
- **Entity Highlighting**: Addressed how to highlight entities on selection and added dynamic movement to the highlight
  visuals.
- **Context Menu**: Explored the idea of a dynamic, customizable context menu and implemented it with hierarchical
  structure support.

**Summary of Activities:**

- **Mouse Interaction Enhancements**:
    - Implemented continuous area selection.
    - Improved event handling for mouse movements.
    - Refactored the `InputHandler` to manage selection state and emit selection events.

- **Entity Highlighting**:
    - Added `EntityHighlightRenderComponent` for highlighting selected entities.
    - Enabled dynamic movement for highlight circles.
    - Managed highlighting through `PlayerActions`.

- **Dynamic Context Menu**:
    - Developed a customizable `DynamicContextMenu` and `DynamicBoxConfig`.
    - Enhanced the context menu to support nested rows and columns.
    - Implemented a `DynamicContextMenuLayer` for displaying the context menu.
    - Despite the improvements, clicking on actions is still not working, and the context menus are still immature.
      Drawing UI was a first test, but we will probably go the HTML/CSS route.

- **Code Refactoring**:
    - Separated concerns by creating dedicated classes for different
      functionalities (`EntitySelector`, `EntityController`).
    - Standardized method names and class structures.

**Struggles and Improvements Needed:**

- Initially faced issues with rendering and positioning the context menu, which were resolved by refining calculations
  and event handling.
- Ensured that the highlight component worked correctly by adjusting for camera zoom and position.
- Continued need for further testing and refinement of context menu interactions and styling.

**Remarkable Discussions and Notes:**

- Discussed the importance of modular code and separation of concerns.
- Explored various strategies for rendering and interacting with game entities.
- Had fun moments brainstorming creative names and features for the engine components.

**Consolidated Git Commit Message:**

```
Enhance game engine with mouse interaction, entity highlighting, and dynamic context menu

- Implement continuous area selection and mouse event handling
- Add EntityHighlightRenderComponent for dynamic entity highlighting
- Develop customizable DynamicContextMenu with nested structure support
- Refactor code for better separation of concerns and readability
- Adjust rendering to account for camera position and zoom
```


