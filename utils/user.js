const db = require('quick.db');

//Manda uma mensagem no console do lado do client
function sendConsoleMessage(socket, msg)
{
    socket.emit('consoleMessage', msg);
}

//Verifica se o usuario passado existe e se a senha coicide
function VerifyUser(socket, username, password)
{
    if(!db.has(`user.${username}`)) return socket.emit('errorMessage', 'Nome de usuário não existe');   
    if(db.get(`user.${username}.password`) != password) return socket.emit('errorMessage', 'Senha incorreta!');
    
    return socket.emit('userVerified', username);
}

//Registar um novo usuário no banco de dados
function RegisterUser(socket, username, password)
{
    if(db.has(`user.${username}`)) return socket.emit('errorMessage', 'Usuário já existe!');
    db.set(`user.${username}`, '');
    db.set(`user.${username}.password`, password);

    db.set(`user.${username}.info`, {
        vida: 0,
        umbra: 0,
        maxVida: 0,
        player:{
            username: 'Player'
        }
    });
    return socket.emit('Registered');
}

//Pega as informações do usuário
function GetUserInfo(socket, username)
{
    if(!db.has(`user.${username}`)) return;
    let INFO = db.get(`user.${username}.info`);
    socket.emit('LoadUserInfo', INFO);
}

//Atualiza as informações do usuário
function UpdateUserInfo(socket, username, info)
{
    if(!db.has(`user.${username}`)) return;
    db.set(`user.${username}.info`, info);
    socket.emit('LoadUserInfo', info);
}

module.exports = {
    sendConsoleMessage,
    VerifyUser,
    RegisterUser,
    GetUserInfo,
    UpdateUserInfo
}