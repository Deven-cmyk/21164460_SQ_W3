# Aperture Arena

## Project Description

This project is a p5.js 1v1 fighting game inspired by the aesthetic and atmosphere of the video game _Portal_. Two test subject robots duel in a gritty testing chamber until their chassis gives out. The project utilizes Object-Oriented Programming (OOP) to manage the fighter objects and custom p5.js primitive shapes to construct the environment.

## Setup and Interaction Instructions

To run the sketch locally, open `index.html` in Google Chrome using Live Server (Right-click `index.html` in Visual Studio Code and select **Open with Live Server**).

Because this game utilizes `p5.sound` to load external `.mp3` files, modern web browsers will block the audio and freeze the game if you simply double-click the `index.html` file due to strict CORS (Cross-Origin Resource Sharing) security policies. Ensure your audio files (`jump.mp3`, `hit.mp3`, `gameover.mp3`, `music.mp3`) are placed correctly inside an `assets/sounds/` folder in your root directory.

**How to interact:**

- When the game loads in your browser window, click the screen once to bypass the browser's autoplay block, initiate the test, and unlock the audio engine.

**Controls:**

- **Player 1 (Blue Chassis):**
  - **W:** Jump
  - **A / D:** Move Left / Right
  - **F:** Punch
- **Player 2 (Orange Chassis):**
  - **Up Arrow:** Jump
  - **Left / Right Arrows:** Move Left / Right
  - **/ (Forward Slash):** Punch
- **Global Controls:**
  - **R:** Restart the protocol (Only available on the Game Over screen).

**Objective:**

- Two test subject robots duel in a gritty testing chamber until their chassis gives out. Each robot can take 6 hits before failure.

**Opening the Chrome Console (for debugging):**

- **Windows:** Press `F12` or `Ctrl + Shift + J`, then click the **Console** tab
- **Mac:** Press `Cmd + Option + J`

## Assets

| File           | Source                                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `jump.mp3`     | CmdRobot - Freesound [1]                                                                                                                  |
| `hit.mp3`      | janbezouska - Freesound [2]                                                                                                               |
| `gameover.mp3` | landlucky - Freesound [3]                                                                                                                 |
| `music.mp3`    | Portal OST / Valve Corporation [4]                                                                                                        |
| Visuals        | Constructed entirely from scratch using native p5.js primitives (`rect`, `line`, etc.). No external image files or sprites were used. [5] |

## References

[1] CmdRobot. 2015. _Text-Message or Videogame-Jump_. Freesound. Retrieved from https://freesound.org/people/CmdRobot/sounds/264828/

[2] janbezouska. 2017. _Major punch_. Freesound. Retrieved from https://freesound.org/people/janbezouska/sounds/399183/

[3] landlucky. 2015. _Game Over SFX and Voice.mp3_. Freesound. Retrieved from https://freesound.org/people/landlucky/sounds/277404/

[4] Valve Corporation. 2007. _Portal OST_.

[5] Processing Foundation. 2026. _p5.js reference_. Retrieved from https://p5js.org/reference/

[6] Dr. Karen Cochrane. 2026. _Week 3 Example 1: Classes and Fighter Objects_. GBDA 302. Course Example Code.

[7] Google. 2026. _Gemini (Advanced version)_ [Large Language Model]. Retrieved from https://gemini.google.com/

[8] Valve Corporation. 2007. _Portal_ [Video Game]. Valve Corporation.

## Author

Deven Agnihotri
