const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800, // Ширина окна
        height: 600, // Высота окна
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('src/index.html'); // Загружаем HTML-файл
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
