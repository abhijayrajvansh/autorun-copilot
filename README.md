# 🧮 macOS Menubar Counter App

A beautiful, modern counter app that lives in your macOS menubar, built with Electron and Next.js.

## ✨ Features

- 🎯 **Menubar Integration**: Lives in your macOS menubar for quick access
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 💾 **Persistent Storage**: Counter value persists across app restarts
- 🌙 **Dark Mode Support**: Automatically adapts to your system theme
- ⚡ **Fast & Responsive**: Built with Next.js and Tailwind CSS
- 🖱️ **Easy Controls**: Increment (+), decrement (-), and reset buttons

## 🛠️ Technology Stack

- **Electron**: Native macOS menubar integration
- **Next.js**: Modern React framework for the UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful icons
- **TypeScript**: Type-safe development

## 📁 Project Structure

```
macapp/
├── electron/           # Electron main process
│   ├── main.js        # Main Electron application
│   ├── package.json   # Electron dependencies
│   └── assets/        # App icons and resources
├── nextjs-ui/         # Next.js frontend
│   ├── src/
│   │   ├── app/       # Next.js app directory
│   │   └── components/ # React components
│   └── package.json   # Frontend dependencies
├── start.sh           # Development helper script
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- macOS (required for menubar functionality)
- Node.js 18 or later
- npm or yarn

### Installation & Development

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   ./start.sh
   ```

3. **Run the development servers:**

   **Terminal 1 - Start Next.js:**
   ```bash
   cd nextjs-ui
   npm run dev
   ```

   **Terminal 2 - Start Electron:**
   ```bash
   cd electron
   npm run dev
   ```

4. **Look for the menubar icon** in your macOS menubar (top-right area)

5. **Click the icon** to open the counter app!

## 🎮 Usage

- **Click the menubar icon** to show/hide the counter
- **Green + button**: Increment the counter
- **Red - button**: Decrement the counter  
- **Gray reset button**: Reset counter to 0
- **Right-click the menubar icon** for context menu options

## 🎨 Customization

### Changing the Menubar Icon

1. Create a 16x16 or 22x22 pixel PNG image
2. Save it as `electron/assets/iconTemplate.png`
3. Restart the Electron app

### Modifying the UI

- Edit `nextjs-ui/src/components/Counter.tsx` to change the counter appearance
- Modify Tailwind classes for different colors, sizes, or layouts
- The counter value is automatically saved to localStorage

## 📦 Building for Production

### Step 1: Build the Next.js App

```bash
cd nextjs-ui
npm run build
npm run export  # If using static export
```

### Step 2: Update Electron to Use Built Files

Update `electron/main.js` to point to the built files instead of the dev server:

```javascript
// Change from:
index: 'http://localhost:3000'

// To:
index: `file://${__dirname}/../nextjs-ui/out/index.html`
```

### Step 3: Package the App

Install electron-builder:
```bash
cd electron
npm install --save-dev electron-builder
```

Add to `electron/package.json`:
```json
{
  "scripts": {
    "build": "electron-builder",
    "dist": "electron-builder --publish=never"
  },
  "build": {
    "appId": "com.yourname.menubar-counter",
    "productName": "Menubar Counter",
    "directories": {
      "output": "dist"
    },
    "mac": {
      "category": "public.app-category.utilities"
    }
  }
}
```

Build the app:
```bash
npm run dist
```

## 🔮 Future Features

- [ ] **Global Shortcuts**: Keyboard shortcuts to increment/decrement
- [ ] **Themes**: Multiple color themes and customization options
- [ ] **Auto-launch**: Start app automatically on system boot
- [ ] **Notifications**: Alerts when counter reaches specific values
- [ ] **Multiple Counters**: Support for multiple named counters
- [ ] **Export Data**: Save counter history to file

## 🐛 Troubleshooting

### App doesn't appear in menubar
- Make sure both Next.js and Electron are running
- Check if Next.js is running on http://localhost:3000
- Look for any error messages in the terminal

### Counter doesn't save
- Check browser localStorage in DevTools
- Ensure the app has write permissions

### Can't see the menubar icon
- The icon appears in the top-right area of your screen
- Try clicking in the empty space near other menubar icons
- Check if the Electron process is running

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Built with love using:
- [Electron](https://electronjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [menubar](https://github.com/maxogden/menubar) package

---

**Happy Counting! 🎉**
