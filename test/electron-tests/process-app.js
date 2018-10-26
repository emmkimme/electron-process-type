const { app, BrowserWindow } = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow(title, webPreferences) {
    // Create the browser window.
    let win = new BrowserWindow({ width: 800, height: 600, webPreferences })
    win.loadFile(path.join(__dirname, 'process-app.html'))

    // Open the DevTools.
    win.webContents.openDevTools()
    win.setTitle(JSON.stringify(webPreferences))

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    return win;
}

let win1
let win2
let win3
let win4
let win5
let win6
function createWindows() {
    if (win1 == null) {
        win1 = createWindow('{}', {})
    }
    if (win2 == null) {
        win2 = createWindow('nodeIntegration: false', { nodeIntegration: false })
    }
    if (win3 == null) {
        win3 = createWindow('nodeIntegration: false, sandbox: true', { nodeIntegration: false, sandbox: true })
    }
    if (win4 == null) {
        win4= createWindow('{}', { preload: path.join(__dirname, 'process-app-preload.js') })
    }
    if (win5 == null) {
        win5 = createWindow('nodeIntegration: false', { nodeIntegration: false, preload: path.join(__dirname, 'process-app-preload.js') })
    }
    if (win6 == null) {
        win6 = createWindow('nodeIntegration: false, sandbox: true', { nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'process-app-preload.js') })
    }
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
    if (win1 == null) {
        createWindows();
    }
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.