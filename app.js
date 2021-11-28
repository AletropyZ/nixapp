const express = require('express');
const socketio = require('socket.io');
const Discord = require('discord.js');
const path = require('path');
const http = require('http');

//Minhas classes e scripts
const discordConfig = require('./discord/config.json');
const routes = require('./routes');
const User = require('./utils/user.js');
const DevUser = require('./utils/devScripts');

const PORT = 3000 || process.env.PORT;

//Declarando as váriaves do servidor
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(routes);


// Conexão e tratamento dos dados do Discord ==>

client.on('ready', () => {
    console.log(`Discord bot ${client.user.username} logado!`);
});
//<== Conexão e tratamento dos dados do Discord



//Conexão e tratamento de dados dos sockets ==>

io.on('connect', socket => {
    User.sendConsoleMessage(socket, 'Conectado no servidor com sucesso!')
    socket.on('consoleMessage', (msg) => console.log(msg));

    //Login emits
    socket.on('VerifyUser', (username, password) => {
        User.VerifyUser(socket, username, password);
    });

    socket.on('RegisterNewUser', (username, password) => {
        User.RegisterUser(socket, username, password);
    });

    //<== Login emits
    
    //User Emits ==>
    socket.on('GetUserInfo', (username) => {
        User.GetUserInfo(socket, username);
    });

    socket.on('UpdateUserStats', (username, stats) => {
        User.UpdateUserStats(socket, username, stats);
    });
    //<== User Emits

    //Dev User Emits ==>

    

    //<== Dev User Emits
})

//<== Conexão e tratamento de dados dos sockets //

client.login(discordConfig.token);
server.listen(PORT, () => console.log(`O servidor foi iniciado em http://localhost:${PORT}`));