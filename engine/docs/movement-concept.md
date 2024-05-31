Got it. Let's adjust the description to reflect that the "Inertia Dampers" are a core game mechanic that all players
will use, and emphasize the strategic necessity of switching between the two modes during gameplay.

### Arcade Movement Profile

**Description:**
The Arcade Movement Profile prioritizes ease of control and quick responsiveness, making it ideal for combat situations
where agility and maneuverability are crucial. This mode is energy-intensive, reflecting the increased power consumption
required for the simplified control and enhanced agility.

**Controls:**

- **W Key:** Moves the ship upward along the Y-axis.
- **A Key:** Moves the ship left along the X-axis.
- **S Key:** Moves the ship downward along the Y-axis.
- **D Key:** Moves the ship right along the X-axis.

**Mechanics:**

- **Automatic Orientation:** The ship automatically orients itself in the direction of movement, allowing players to
  focus on navigation and combat without worrying about manual rotation.
- **Optional Target Orientation:** Players can toggle an option for the ship to automatically orient itself toward a
  designated target.
- **Low Inertia with Inertia Dampers:** The ship is equipped with advanced inertia dampers that significantly reduce
  inertia, allowing for quick changes in direction and rapid deceleration. This ensures that the ship comes to a halt
  quickly when no directional input is given.

**Consequences of Using Inertia Dampers:**

- **High Energy Cost:** The inertia dampers consume a significant amount of energy, resulting in reduced max speed and
  limited energy availability for other ship systems.
- **Reduced Max Speed:** Due to the high energy consumption, the ship's maximum speed is significantly lowered.
- **Limited Weapon Systems:** Only short-range weapon systems are available, as the energy required for long-range
  weaponry is diverted to the inertia dampers.
- **Enhanced Combat Control:** The ship becomes highly controllable in combat situations, making it easier to evade
  enemy fire and maneuver in tight spaces.

**Visual and Audio Effects:**

- **Bright Thruster Flares:** Indicating rapid changes in direction.
- **Quick Acceleration Sounds:** To emphasize the immediate responsiveness of the ship.

### Advanced Movement Profile

**Description:**
The Advanced Movement Profile introduces a more realistic and physics-based control scheme, providing a greater
challenge and depth for players who need to travel long distances and engage in strategic maneuvers. This mode is less
energy-intensive, allowing for higher speeds and the use of additional ship systems.

**Controls:**

- **W Key:** Applies forward thrust in the current orientation of the ship.
- **A Key:** Rotates the ship counterclockwise.
- **S Key:** Applies backward thrust, reducing forward velocity or moving backward if stationary.
- **D Key:** Rotates the ship clockwise.

**Mechanics:**

- **Manual Orientation:** Players must manually rotate the ship to change its direction, adding a layer of complexity to
  navigation and combat.
- **Optional Target Orientation:** Similar to the arcade profile, players can choose an option for the ship to orient
  itself toward a designated target.
- **High Inertia with Reduced Inertia Dampers:** The ship's inertia dampers are set to a minimal level, allowing for
  more realistic physics-based movement. Velocity accumulates over time, and players must counter-steer to change
  direction, creating a more challenging piloting experience.
- **Momentum Management:** Players need to manage the ship’s momentum carefully, as abrupt changes in direction are not
  as feasible as in the arcade mode.

**Consequences of Turning Off Inertia Dampers:**

- **Energy Efficiency:** Turning off the inertia dampers significantly reduces energy consumption, freeing up energy for
  other ship systems.
- **Increased Max Speed:** With the inertia dampers off, the ship can achieve higher speeds and even warp speed.
- **Enhanced Weapon Systems:** Additional ship systems become available, including devastating long-range weaponry.
- **Challenging Control:** The ship becomes more challenging to control, requiring players to skillfully manage thrust
  and rotation to navigate and engage in combat effectively.

**Visual and Audio Effects:**

- **Subtle Thruster Glows:** Reflecting the sustained thrust and gradual changes in movement.
- **Realistic Engine Sounds:** To emphasize the ongoing thrust and inertia.

### Handling Description

**Arcade Profile Handling:**
In the Arcade profile, the ship handles with high responsiveness and agility. The low inertia, facilitated by advanced
inertia dampers, ensures that the ship quickly adapts to directional inputs, providing immediate feedback and control.
This handling is designed to be forgiving and intuitive, making it easy for players to navigate through space and engage
in combat without worrying about momentum.

**Advanced Profile Handling:**
In the Advanced profile, handling is more nuanced and requires careful attention to thrust and rotation. With the
inertia dampers set to a minimal level, the ship experiences high inertia, meaning that once the ship is set in motion,
it will continue moving in that direction until counter-thrust is applied. This handling model rewards players who can
master the physics-based controls and use momentum to their advantage in strategic maneuvers.

### Summary

By integrating these two distinct movement profiles into your game, you create a dynamic gameplay experience that
requires players to strategically switch between modes. The use of inertia dampers adds a layer of immersive technology,
explaining the difference in handling and making the gameplay more engaging. Players must navigate the challenges of
energy management, speed control, and combat effectiveness, enhancing the overall depth and replayability of your game.

### Technical Description of Movement Profiles

#### Arcade Movement Profile

**Description:**
The Arcade Movement Profile utilizes inertia dampers to minimize inertia, allowing for precise and agile control of the
spacecraft. This mode is characterized by high energy consumption.

**Control Mechanics:**

- **W Key:** \( v_y = v_y + \Delta v \)
- **A Key:** \( v_x = v_x - \Delta v \)
- **S Key:** \( v_y = v_y - \Delta v \)
- **D Key:** \( v_x = v_x + \Delta v \)

**Automatic Orientation:**

- \(\theta = \text{atan2}(v_y, v_x)\)

**Inertia Dynamics:**

- **Low Inertia:**
    - Effective mass \( m_e = m \times 0.1 \)
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a high damping coefficient.

**Energy Consumption:**

- High energy consumption due to inertia dampers:
    - Power \( P \approx k_E \times v^2 \)
    - Energy drain impacts max speed and available power for other systems.

**Consequences:**

- Reduced maximum speed.
- Limited to short-range weapon systems.

#### Advanced Movement Profile

**Description:**
The Advanced Movement Profile reduces the effect of inertia dampers, resulting in realistic physics-based movement. This
mode is less energy-intensive, allowing for higher speeds and more powerful systems.

**Control Mechanics:**

- **W Key:** \( a_{\text{forward}} = \frac{F_{\text{thrust}}}{m} \)
- **A Key:** \( \omega = \omega - \Delta \omega \)
- **S Key:** \( a_{\text{backward}} = -\frac{F_{\text{thrust}}}{m} \)
- **D Key:** \( \omega = \omega + \Delta \omega \)

**Manual Orientation:**

- Angular velocity \(\omega\) affects rotation:
    - \(\theta = \theta + \omega \times \Delta t\)

**Inertia Dynamics:**

- **High Inertia:**
    - Effective mass \( m_e = m \)
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a low damping coefficient.
    - Momentum: \( p = m \times v \)

**Energy Consumption:**

- Lower energy consumption due to reduced use of inertia dampers:
    - Power \( P \approx k_E \times (v^2 / 10) \)
    - Allows higher max speed and additional system usage.

**Consequences:**

- Increased maximum speed and warp capability.
- Access to long-range and more powerful weapon systems.

### Summary

**Arcade Movement Profile:**

- **Controls:** Direct translation on axes.
- **Inertia:** Low inertia, high damping.
- **Energy:** High consumption.
- **Speed:** Reduced max speed.
- **Weapons:** Short-range only.

**Advanced Movement Profile:**

- **Controls:** Thrust-based with rotation.
- **Inertia:** High inertia, low damping.
- **Energy:** Low consumption.
- **Speed:** Increased max speed, warp capable.
- **Weapons:** Long-range and powerful systems available.

### Technical Description of Movement Profiles V1

#### Arcade Movement Profile

**Description:**
The Arcade Movement Profile utilizes inertia dampers to minimize inertia, allowing for precise and agile control of the
spacecraft. This mode is characterized by high energy consumption.

**Control Mechanics:**

- **W Key:** \( v_y = v_y + \Delta v \)
- **A Key:** \( v_x = v_x - \Delta v \)
- **S Key:** \( v_y = v_y - \Delta v \)
- **D Key:** \( v_x = v_x + \Delta v \)

**Automatic Orientation:**

- \(\theta = \text{atan2}(v_y, v_x)\)

**Inertia Dynamics:**

- **Low Inertia:**
    - Effective mass \( m_e = m \times 0.1 \)
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a high damping coefficient.

**Energy Consumption:**

- High energy consumption due to inertia dampers:
    - Power \( P \approx k_E \times v^2 \)
    - Energy drain impacts max speed and available power for other systems.

**Consequences:**

- Reduced maximum speed.
- Limited to short-range weapon systems.

#### Advanced Movement Profile

**Description:**
The Advanced Movement Profile reduces the effect of inertia dampers, resulting in realistic physics-based movement. This
mode is less energy-intensive, allowing for higher speeds and more powerful systems.

**Control Mechanics:**

- **W Key:** \( a_{\text{forward}} = \frac{F_{\text{thrust}}}{m} \)
- **A Key:** \( \omega = \omega - \Delta \omega \)
- **S Key:** \( a_{\text{backward}} = -\frac{F_{\text{thrust}}}{m} \)
- **D Key:** \( \omega = \omega + \Delta \omega \)

**Manual Orientation:**

- Angular velocity \(\omega\) affects rotation:
    - \(\theta = \theta + \omega \times \Delta t\)

**Inertia Dynamics:**

- **High Inertia:**
    - Effective mass \( m_e = m \)
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a low damping coefficient.
    - Momentum: \( p = m \times v \)

**Energy Consumption:**

- Lower energy consumption due to reduced use of inertia dampers:
    - Power \( P \approx k_E \times (v^2 / 10) \)
    - Allows higher max speed and additional system usage.

**Consequences:**

- Increased maximum speed and warp capability.
- Access to long-range and more powerful weapon systems.

### Summary

**Arcade Movement Profile:**

- **Controls:** Direct translation on axes.
- **Inertia:** Low inertia, high damping.
- **Energy:** High consumption.
- **Speed:** Reduced max speed.
- **Weapons:** Short-range only.

**Advanced Movement Profile:**

- **Controls:** Thrust-based with rotation.
- **Inertia:** High inertia, low damping.
- **Energy:** Low consumption.
- **Speed:** Increased max speed, warp capable.
- **Weapons:** Long-range and powerful systems available.

### Technical Description of Movement Profiles with Variable Ship Properties V2

#### Arcade Movement Profile

**Description:**
The Arcade Movement Profile utilizes inertia dampers to minimize inertia, allowing for precise and agile control of the
spacecraft. This mode is characterized by high energy consumption, adjusted for different ship properties.

**Control Mechanics:**

- **W Key:** \( v_y = v_y + \Delta v \)
- **A Key:** \( v_x = v_x - \Delta v \)
- **S Key:** \( v_y = v_y - \Delta v \)
- **D Key:** \( v_x = v_x + \Delta v \)

**Automatic Orientation:**

- \(\theta = \text{atan2}(v_y, v_x)\)

**Inertia Dynamics:**

- **Low Inertia:**
    - Effective mass \( m_e = m \times E_d \), where \( E_d \) is the inertia damper effectiveness coefficient (0 < \(
      E_d \) < 1, with lower values indicating more effective dampers).
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a high damping coefficient, adjusted by
      ship's weight \( W \).

**Energy Consumption:**

- High energy consumption due to inertia dampers:
    - Power \( P \approx k_E \times (v^2 + W) \)
    - Energy drain impacts max speed and available power for other systems.

**Consequences:**

- Reduced maximum speed based on ship's properties.
- Limited to short-range weapon systems.

#### Advanced Movement Profile

**Description:**
The Advanced Movement Profile reduces the effect of inertia dampers, resulting in realistic physics-based movement. This
mode is less energy-intensive, allowing for higher speeds and more powerful systems, adjusted for different ship
properties.

**Control Mechanics:**

- **W Key:** \( a_{\text{forward}} = \frac{F_{\text{thrust}}}{m} \)
- **A Key:** \( \omega = \omega - \Delta \omega \)
- **S Key:** \( a_{\text{backward}} = -\frac{F_{\text{thrust}}}{m} \)
- **D Key:** \( \omega = \omega + \Delta \omega \)

**Manual Orientation:**

- Angular velocity \(\omega\) affects rotation:
    - \(\theta = \theta + \omega \times \Delta t\)

**Inertia Dynamics:**

- **High Inertia:**
    - Effective mass \( m_e = m \)
    - Deceleration: \( F_{\text{damp}} = -k_d \times v \) where \( k_d \) is a low damping coefficient, adjusted by
      ship's weight \( W \).
    - Momentum: \( p = m \times v \)

**Energy Consumption:**

- Lower energy consumption due to reduced use of inertia dampers:
    - Power \( P \approx k_E \times (v^2 / 10 + W / 10) \)
    - Allows higher max speed and additional system usage.

**Consequences:**

- Increased maximum speed and warp capability based on ship's properties.
- Access to long-range and more powerful weapon systems.

### Ship Properties and Inertia Dampers

Each ship has specific properties influencing its performance in both movement profiles:

**Ship Properties:**

- **Weight (W):** Affects inertia and energy consumption.
- **Maximum Speed (V_{\text{max}}):** Limits the ship's speed capabilities.
- **Thrust (T):** Determines acceleration.
- **Energy Capacity (E):** Affects how long inertia dampers can be used and overall power availability.

**Inertia Dampers Effectiveness:**

- **Effectiveness Coefficient (E_d):** Determines how much inertia is reduced.
    - \( E_d \) values range from 0 (fully effective) to 1 (ineffective).
    - Lower \( E_d \) values mean more energy is required to achieve low inertia.
- **Energy Usage:**
    - Inertia dampers' energy consumption \( P \approx k_E \times (v^2 + W) \times E_d \)

### Handling Description

**Arcade Profile Handling:**

- **Controls:** Direct translation on axes.
- **Inertia:** Low inertia, adjusted by \( E_d \).
- **Energy:** High consumption.
- **Speed:** Reduced max speed, affected by \( V_{\text{max}} \).
- **Weapons:** Short-range only.

**Advanced Profile Handling:**

- **Controls:** Thrust-based with rotation.
- **Inertia:** High inertia, adjusted by ship's weight \( W \).
- **Energy:** Low consumption.
- **Speed:** Increased max speed, warp capable.
- **Weapons:** Long-range and powerful systems available.

### Summary

By integrating these two distinct movement profiles with variable ship properties and inertia dampers, your game
provides a dynamic and strategic experience. Players must navigate the challenges of energy management, speed control,
and combat effectiveness, making the gameplay more engaging and challenging. This system rewards players who master the
nuances of both movement profiles and effectively manage their ship's unique properties.