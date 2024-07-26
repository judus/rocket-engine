# Rocket Engine    

This is a fun project that I am working on when I have time and the weather is bad. I am learning different things about
game development and programming in plain JavaScript in general. The main focus is on structuring the code in larger
projects while also discovering the many techniques and patterns used in game development.

The project consists of two parts: a game engine and a demo space game.

The demo space game focuses on controlling a spaceship in infinite space. There are two main control modes that can be
switched by pressing the space bar:

- **Realistic Physics:** For long-distance travel with inertia dampers off.
- **Arcade Mode:** For close combat with inertia dampers on.

Additionally, the game includes an energy management system. Various components like the engine, weapons, and inertia
dampers consume energy and require sufficient power to operate effectively. If you notice some components not working,
it may be due to insufficient energy.

I haven't finished implementing all ship components into the energy management system. Also, the demo is not optimized
for portable devices. It requires at least a 1920x1080 display.

**The main controls are:**

- **w, a, s, d** for moving the ship
- **space bar** to switch the inertia dampers on/off
- **1, 2, 3, 4, 5, 6** for the weapons
- **mouse 1** for firing the current active weapon configuration
- **mouse 2 + drag** to select objects in space
- **mouse wheel** to zoom in/out

You can destroy the asteroids and space stations. Beyond that there is not much to do yet.

https://canvas-playground.crashleague.net/rocket/demo.html