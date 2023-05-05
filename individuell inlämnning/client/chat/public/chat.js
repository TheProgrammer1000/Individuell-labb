var socket = io();

// socket.on('server message', (message) => {

//     console.log(message);
// });

// socket.emit('client message', 'Hello from client!');

const nickname = prompt('Skriv in nickname').trim();

// console.log('nickname: ', nickname);

socket.emit('send-nickname', nickname);

const btnSend = document.querySelector('#send');

btnSend.addEventListener('click', () => {
  const input = document.querySelector('#input');
  socket.emit('chat message', input.value);
});

socket.on('chat message', (message) => {
  console.log('message: ', message);

  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDate.getDate()).slice(-2);
  let hours = ('0' + currentDate.getHours()).slice(-2);
  let minutes = ('0' + currentDate.getMinutes()).slice(-2);
  let seconds = ('0' + currentDate.getSeconds()).slice(-2);

  let currentDateTime =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  console.log(currentDateTime);

  const messageBox = document.querySelector('.message-box');
  messageBox.innerHTML += `<div class="message">${currentDateTime} ${message.nickname}: ${message.message}</div>`;
});

socket.on('server message', (message) => {
  const messageBox = document.querySelector('.message-box');
  messageBox.innerHTML += `<div class="message">${message}</div>`;
});
