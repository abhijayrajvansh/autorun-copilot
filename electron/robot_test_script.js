const robot = require('robotjs');

// Set a small delay for keyboard operations if needed, though often not necessary for keyTap
// robot.setKeyboardDelay(1);

console.log("Starting isolated RobotJS script. Press Ctrl+C to stop.");
console.log("This script will press Command+Enter every 3 seconds.");

let pressCount = 0;

const intervalId = setInterval(() => {
  try {
    // Press Command + Enter
    // On macOS, the 'command' modifier is correct.
    robot.keyTap('enter', ['command']);
    pressCount++;
    console.log(`Pressed Command+Enter (Count: ${pressCount})`);
  } catch (error) {
    console.error('Error pressing keys:', error);
    // Optionally, stop the script on error
    // clearInterval(intervalId);
    // console.log("Script stopped due to error.");
  }
}, 3000); // Every 3 seconds

// Graceful shutdown (optional, but good practice)
process.on('SIGINT', () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");
  clearInterval(intervalId);
  process.exit();
});

// Keep the script running
(function wait() {
  if (true) setTimeout(wait, 10000); // Keep alive, adjust as needed
})();
