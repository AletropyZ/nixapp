const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

//Minhas classes e scripts
const routes = require('./routes');
const User = require('./utils/user.js');

const PORT = 3000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(routes);

//Conexão e tratamento de dados dos sockets ==>

io.on('connect', socket => {
    User.sendConsoleMessage(socket, 'Conectado no servidor com sucesso!')

    //Login emits
    socket.on('VerifyUser', (username, password) => {
        User.VerifyUser(socket, username, password);
    });
    //<== Login emits
})

//<== Conexão e tratamento de dados dos sockets //

server.listen(PORT, () => console.log(`O servidor foi iniciado em http://localhost:${PORT}`));