const db = require('quick.db');

function sendConsoleMessage(socket, msg)
{
    socket.emit('consoleMessage', msg);
}

function VerifyUser(socket, username, password)
{
    if(!db.has(`user.${username}`)) return socket.emit('errorMessage', 'Nome de usuário não existe');   
    if(db.get(`user.${username}.password`) != password) return socket.emit('errorMessage', 'Senha incorreta!');
    
    return socket.emit('userVerified', username);
}

function RegisterUser(socket, username, password)
{
    if(db.has(`user.${username}`)) return socket.emit('errorMessage', 'Usuário já existe!');
    db.set(`user.${username}`, '');
    db.set(`user.${username}.password`, password);
    return socket.emit('Registered');
}

module.exports = {
    sendConsoleMessage,
    VerifyUser,
    RegisterUser
}