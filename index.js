const e = require('express')();
const server = require('http').Server(e);
const io = require('socket.io')(server);
const { app, BrowserWindow } = require('electron');
const port = 3000;

e.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('app.html');
}

app.whenReady().then(() => {
    createWindow()
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  