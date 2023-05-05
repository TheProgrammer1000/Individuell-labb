const express = require('express'); // KRÄV express
const app = express(); // SKAPA en express-applikation
const http = require('http'); // KRÄV http (node)
const server = http.createServer(app); // SKAPA server av typen Express
const { Server } = require('socket.io'); // KRÄV Socket.io-biblioteket och klassen Server
//      ^----^ Klass

const io = new Server(server); // INKLUDERA Socket.io
//         ^--------^ Ny instans av Server-klassen

app.use(express.static('public')); // ANVÄND middleware för statiska filer

const PORT = 3001; // DEFINIERA portnummer

server.listen(PORT, () => {
  // LYSSNA på port
  console.log('Listening on port*:' + PORT);
});

app.get('/', (req, res) => {
  // HANTERA GET-request
  // const nickname = prompt('Skriv användarnamn:');
  res.sendFile(__dirname + '/index.html'); // SKICKA fil
});

const mainRoom = 'main room';
const waitingRoom = 'waiting room';
let peopleInMainRoom = 0;

let users = [];

io.on('connection', (socket) => {
  // PÅ händelsen connection | NIVÅ: I/O (input/output)

  peopleInMainRoom++; // ÖKA antalet personer i main room med 1

  if (peopleInMainRoom <= 2) {
    // OM antalet personer i main room är mindre eller lika med 2, gör följande

    socket.join(mainRoom);

    socket.emit('server message', 'Välkommen till chattrummet');

    console.log('People in main room: ' + peopleInMainRoom);
  } else {
    // ANNARS, gör följande
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommen till väntrummet ');
    socket.emit('server message', 'Du är placerad i kö...');
  }

  socket.on('send-nickname', function (nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    // console.log('socket.nickname: ', socket.nickname);
    console.log(users);
  });

  socket.on('disconnect', () => {
    // PÅ händelsen disconnect | NIVÅ: SOCKET (anslutning)
    console.log('A user disconnected');
    peopleInMainRoom--; // MINSKA antalet personer i main room med 1
  });

  socket.on('chat message', (message) => {
    io.to(mainRoom).emit('chat message', {
      message: message,
      nickname: socket.nickname
    }); // YTTRA (skicka) händelsen chat message till main room
  });
});
