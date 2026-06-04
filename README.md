# Project Title

**Aperture Arena**

## Setup and Interaction Instructions

### How to Run the Game:

Because this game utilizes `p5.sound` to load external `.mp3` files, modern web browsers will block the audio and freeze the game if you simply double-click the `index.html` file due to strict CORS (Cross-Origin Resource Sharing) security policies.

To run the game properly:

1. Open this repository folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Ensure your audio files (`jump.mp3`, `hit.mp3`, `gameover.mp3`, `music.mp3`) are placed correctly inside an `assets/sounds/` folder in your root directory.
4. Right-click the `index.html` file and select **"Open with Live Server"**.
5. When the game loads in your browser window, **click the screen once** to bypass the browser's autoplay block, initiate the test, and unlock the audio engine.

### How to Play:

Two test subject robots duel in a gritty testing chamber until their chassis gives out. Each robot can take 6 hits before failure.

**Player 1 (Blue Chassis):**

- **W:** Jump
- **A / D:** Move Left / Right
- **F:** Punch

**Player 2 (Orange Chassis):**

- **Up Arrow:** Jump
- **Left / Right Arrows:** Move Left / Right
- **/** (Forward Slash): Punch

**Global Controls:**

- **R:** Restart the protocol (Only available on the Game Over screen).

## Assets

- **Visuals:** All geometric shapes, background designs, UI elements, and character chassis were constructed entirely from scratch using native p5.js primitives (`rect`, `line`, etc.). No external image files or sprites were used.
- **Audio:** \* `jump.mp3`: Sourced from [Insert Website Name, e.g., freesound.org].
  - `hit.mp3`: Sourced from [Insert Website Name, e.g., freesound.org].
  - `gameover.mp3`: Sourced from [Insert Website Name, e.g., freesound.org].
  - `music.mp3`: Sourced from [Insert Website Name, e.g., Portal OST / Valve Corporation].

## References

**Software & Libraries**

1. Lauren McCarthy and Processing Foundation. 2023. p5.js (Version 1.9.0) [Software Library]. Retrieved from https://p5js.org/
2. Processing Foundation. 2023. p5.sound (Version 1.9.0) [Software Library]. Retrieved from https://p5js.org/reference/#/libraries/p5.sound

**Course Materials** 3. [Insert Professor's Name]. 2024. _Week 3 Example 1: Classes and Fighter Objects_. [Insert University/Course Code, e.g., GBDA 302]. Course Example Code.

**Generative AI** 4. Google. 2024. _Gemini_ (Advanced version) [Large Language Model]. Retrieved from https://gemini.google.com/ (Used for assistance with OOP refactoring, code formatting, and debugging Live Server CORS audio issues).

**Thematic Inspiration** 5. Valve Corporation. 2007. _Portal_ [Video Game]. Valve Corporation. (Used as the core aesthetic, color palette, and atmospheric inspiration for the visual design).
s