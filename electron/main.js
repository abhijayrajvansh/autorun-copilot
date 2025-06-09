const { menubar } = require('menubar');
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const robot = require('robotjs');

// Configure robot for better performance and reliability
robot.setKeyboardDelay(100); // Increased delay for testing

// Test function to verify robotjs functionality
function testRobotKeys() {
  console.log('Testing robotjs key commands...');
  try {
    // Test individual key presses first
    console.log('Testing command key...');
    robot.keyToggle('command', 'down');
    robot.keyToggle('command', 'up');
    
    console.log('Testing enter key...');
    robot.keyTap('enter');
    
    // Test combined press
    console.log('Testing command+enter combination...');
    robot.keyToggle('command', 'down');
    setTimeout(() => {
      robot.keyTap('enter');
      setTimeout(() => {
        robot.keyToggle('command', 'up');
        console.log('Key test complete');
      }, 100);
    }, 100);
  } catch (error) {
    console.error('RobotJS test failed:', error);
  }
}

// Check if custom icon exists, otherwise use default
const iconPath = path.join(__dirname, 'assets', 'iconTemplate.png');
const hasCustomIcon = fs.existsSync(iconPath);

// Create menubar app
const mb = menubar({
  index: 'http://localhost:3000', // Point to Next.js dev server
  icon: hasCustomIcon ? iconPath : undefined, // Use custom icon if available
  tooltip: 'Key Automation',
  browserWindow: {
    width: 300,
    height: 350,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    resizable: false,
    minimizable: false,
    maximizable: false,
    show: false, // Hide until ready
    alwaysOnTop: false,
    skipTaskbar: true,
    transparent: false,
    frame: false,
    hasShadow: true,
    vibrancy: 'popover' // macOS specific
  },
  preloadWindow: true,
  showDockIcon: false,
  windowPosition: 'trayCenter'
});

mb.on('ready', () => {
  console.log('Menubar app is ready');
  
  // Test robotjs functionality
  setTimeout(testRobotKeys, 2000);

  // Remove the default context menu and set click behavior
  const { Menu } = require('electron');
  mb.tray.setContextMenu(null);
  
  // Only show window on click (both left and right click)
  mb.tray.on('click', () => {
    mb.showWindow();
  });
});

mb.on('after-create-window', () => {
  console.log('Window created');
  
  // Hide dock icon on macOS
  if (process.platform === 'darwin') {
    mb.app.dock.hide();
  }
});

// Handle window ready
mb.on('show', () => {
  console.log('Window shown');
});

mb.on('hide', () => {
  console.log('Window hidden');
});

// Prevent the app from closing when all windows are closed (macOS behavior)
mb.app.on('window-all-closed', (e) => {
  e.preventDefault();
});

// For development: enable hot reload
if (process.env.NODE_ENV === 'development') {
  // Optional: Enable DevTools
  mb.on('after-create-window', () => {
    // mb.window.webContents.openDevTools({ mode: 'detach' });
  });
}

// Automation state
let automationInterval = null;
let isRunning = false;

// IPC handlers for automation
ipcMain.handle('start-automation', () => {
  if (isRunning) {
    return { success: false, message: 'Automation is already running' };
  }
  
  isRunning = true;
  mb.hideWindow();
  
  console.log('Starting automation sequence...');
  
  // Start the automation with more detailed debugging
  automationInterval = setInterval(() => {
    try {
      console.log('Attempting to send Cmd+Enter...');
      
      // More controlled key sequence with delays
      robot.keyToggle('command', 'down');
      console.log('Command key down');
      
      setTimeout(() => {
        robot.keyTap('enter');
        console.log('Enter key pressed');
        
        setTimeout(() => {
          robot.keyToggle('command', 'up');
          console.log('Command key up');
        }, 50);
      }, 50);
      
    } catch (error) {
      console.error('Detailed error in key automation:', error);
      console.error('Error stack:', error.stack);
    }
  }, 3000);
  
  console.log('Started automation - pressing Cmd + Enter every 3 seconds');
  return { success: true, message: 'Automation started' };
});

ipcMain.handle('stop-automation', () => {
  if (!isRunning) {
    return { success: false, message: 'Automation is not running' };
  }
  
  if (automationInterval) {
    clearInterval(automationInterval);
    automationInterval = null;
  }
  
  isRunning = false;
  console.log('Stopped automation');
  return { success: true, message: 'Automation stopped' };
});

ipcMain.handle('get-automation-status', () => {
  return { isRunning };
});
