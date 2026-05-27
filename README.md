# Aperture Arena

A custom-built 2v2 fighting game created in p5.js, heavily inspired by the atmospheric, brutalist design of the _Portal_ series. Two test subject robots duel in a gritty testing chamber until their chassis gives out.

## 🎨 Theme & Aesthetic

The goal was to strip away the usual colorful sheen of fighting games and replace it with a moody, dark, and pixelated environment. The game relies entirely on p5.js geometric primitives—no image files are used for characters or backgrounds. The UI and character accents utilize the iconic Aperture Science Orange and Cyan.

## 🕹️ Controls

**Player 1 (Blue Chassis):**

- **W:** Jump
- **A / D:** Move Left / Right
- **F:** Punch

**Player 2 (Orange Chassis):**

- **Up Arrow:** Jump
- **Left / Right Arrows:** Move
- **/** (Forward Slash): Punch

## ⚙️ Installation & Running locally

Because this game utilizes `p5.sound` to load external `.mp3` files, modern browsers will block the audio if you simply double-click the `index.html` file due to CORS security policies.

1. Open this repository in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. Ensure your audio files (`jump.mp3`, `hit.mp3`, `gameover.mp3`, `music.mp3`, `start.mp3`) are in the root directory and uncomment the audio lines in `preload()`.
