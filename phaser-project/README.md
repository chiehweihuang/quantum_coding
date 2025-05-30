# Phaser Project

This is a basic Phaser.js project.

## Setup

1. Ensure Node.js and npm are installed on your system.
2. Clone or download this project.
3. Navigate to the `phaser-project` directory in your terminal.
4. If you haven't already, or if `node_modules` is missing, run `npm install` to install Phaser and any other dependencies.

## Running the Project

To run this project, you need a simple HTTP server to serve the `index.html` and associated JavaScript files. Here are a couple of common ways to do this:

### Using `npx http-server` (requires Node.js)

1. If you don't have `http-server` installed globally, you can use `npx` (which comes with npm 5.2+):
   ```bash
   npx http-server
   ```
2. Open your web browser and navigate to the URL provided by `http-server` (usually `http://localhost:8080` or `http://127.0.0.1:8080`).

### Using Python's `http.server` (requires Python)

1. If you have Python 3 installed:
   ```bash
   python -m http.server
   ```
2. If you have Python 2 installed:
   ```bash
   python -m SimpleHTTPServer
   ```
3. Open your web browser and navigate to `http://localhost:8000`.

## Gameplay Demo

Once the server is running and you've opened the page in your browser, you will see a simple game scene:

*   **Player:** You control a green square character.
*   **Controls:** Use the **Arrow Keys** (Up, Down, Left, Right) to move the player.

**What to Experience:**

1.  **Dialogue System:**
    *   Find the **yellow circle** (an "Info Spot").
    *   Move your player character onto it.
    *   Press the **'E' key** to display a dialogue box at the bottom of the screen.
    *   Press 'E' again to hide it.

2.  **Observation Mechanic:**
    *   You will see a **blue, semi-transparent rectangular gate** to the right. Initially, you can pass through this gate.
    *   There is an invisible "Observation Zone" in front of (to the left of) this gate.
    *   When you move your player into this invisible zone:
        *   The gate will turn **red and opaque**.
        *   It will become a **solid barrier**, and you will not be able to pass through it.
    *   When you move your player out of the zone:
        *   The gate will revert to its **blue, semi-transparent, passable** state.
    *   The dialogue from the Info Spot provides a hint about this mechanic.

This MVP demonstrates basic player movement, an interactive dialogue system, and a core "observation" mechanic where player proximity affects an object's state.
