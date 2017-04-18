const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
var fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1360, height: 800});

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});



//TODO: Break this out into its own code
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    // On Win & linux a open dialog can not be both a file and directory opener
    properties: ['openFile', 'multiSelections'],
    filters: [
      {name: 'Images', extensions: ['jpg', 'png', 'gif']}
    ]
  }, (files) => {
    if (files) {
      event.sender.send('selected-file', files)
      SaveImages(files)
    }
  })
})

function SaveImages(files) {
  files.forEach((file, indx) => {
    fs.readFile(file, function (err, data) {
      var imageName = path.basename(file);
      if (err) {
        console.log(`Error reading file: ${file}`)
      } else {
        var newPath = __dirname + "/public/imports/" + imageName
        // write file to ./public/imports/ folder
        fs.writeFile(newPath, data, function (err) {
          // let's see it
          if (err) console.log(`Error writing file to ${newPath}: `, err.message)
          console.log(`Imported ${imageName} Successfully`)
        })
      }
    })
  })
}
