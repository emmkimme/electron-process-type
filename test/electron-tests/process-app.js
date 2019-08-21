const { app, BrowserWindow } = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let done
let x = 0, y = 0

function createWindow(title, webPreferences) {
    // Create the browser window.
    let win = new BrowserWindow({ x, y, width: 800, height: 200, webPreferences })
    win.loadFile(path.join(__dirname, 'process-page.html'))

    // Open the DevTools.
    // win.webContents.openDevTools()
    win.setTitle(JSON.stringify(webPreferences))

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    y += 200
    if (y > 800) {
        y = 0
        x += 800
    }
    return win;
}

function createWindows() {
    done = true
    createWindow('{}', {})
    createWindow('nodeIntegration: false', { nodeIntegration: false })
    createWindow('nodeIntegration: false, sandbox: true', { nodeIntegration: false, sandbox: true })
    createWindow('sandbox: true', { nodeIntegration: false, sandbox: true })

    createWindow('{}', { preload: path.join(__dirname, 'process-page-preload.bundle.js') })
    createWindow('nodeIntegration: false', { nodeIntegration: false, preload: path.join(__dirname, 'process-page-preload.bundle.js') })
    createWindow('nodeIntegration: false, sandbox: true', { nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'process-page-preload.bundle.js') })
    createWindow('sandbox: true', { nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'process-page-preload.bundle.js') })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!done) {
        createWindows();
    }
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.