const socket = io();

if(!localStorage.getItem('logged')) window.location.href = '/login';

socket.on('consoleMessage', (msg) => {
    console.log(msg);
});