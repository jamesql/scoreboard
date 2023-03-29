const e = require('express')();
const server = require('http').Server(e);
const io = require('socket.io')(server);
const { app, BrowserWindow } = require('electron');
const port = 3000;

e.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

e.get('/shotclock', (req, res) => {
    res.sendFile(__dirname + '/shotclock.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // send message to client

    // receive message from client
    socket.on('set score', (data) => {
        // send to rest of clients
        console.log(data);
        socket.broadcast.emit('set score', data);
    });

    socket.on('set name', (data) => {
        // send to rest of clients
        console.log(data);
        socket.broadcast.emit('set name', data);
    });

    socket.on('set description', (data) => {
        // send to rest of clients
        console.log(data);
        socket.broadcast.emit('set description', data);
    });

    socket.on('reset clock', (data) => {
        // send to rest of clients
        console.log(data);
        socket.broadcast.emit('reset clock', data);
    });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
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
  