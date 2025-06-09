const { menubar } = require('menubar');
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const robot = require('robotjs');

// Check if custom icon exists, otherwise use default
const iconPath = path.join(__dirname, 'assets', 'iconTemplate.png');
const hasCustomIcon = fs.existsSync(iconPath);

// Create menubar app
const mb = menubar({
  index: 'http://localhost:3000', // Point to Next.js dev server
  icon: hasCustomIcon ? iconPath : undefined, // Use custom icon if available
  tooltip: 'Counter App',
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
  showDockIcon: false
});

mb.on('ready', () => {
  console.log('Menubar app is ready');
  
  // Optional: Add tray menu
  const { Menu } = require('electron');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Counter',
      click: () => {
        mb.showWindow();
      }
    },
    {
      label: 'Hide Counter', 
      click: () => {
        mb.hideWindow();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        mb.app.quit();
      }
    }
  ]);
  
  mb.tray.setContextMenu(contextMenu);
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
  automationInterval = setInterval(() => {
    try {
      // Press Cmd + Enter
      robot.keyTap('enter', 'command');
      console.log('Pressed Cmd + Enter');
    } catch (error) {
      console.error('Error pressing keys:', error);
    }
  }, 3000); // Every 3 seconds
  
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
