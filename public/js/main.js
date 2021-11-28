const socket = io();

if(!sessionStorage.getItem('logged')) window.location.href = '/login';

socket.on('consoleMessage', (msg) => {
    console.log(msg);
});