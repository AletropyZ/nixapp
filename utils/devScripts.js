const db = require('quick.db');

function ResetUserInfo(socket, username)
{
    db.set(`user.${username}.info`, {
        vida: 0,
        umbra: 0,
        maxVida: 0,
        player:{
            username: 'Player'
        }
    });
    console.warn(`O Socket de Id: ${socket.id} apagou todos os dados de ${username}!`);
}

module.exports = {
    ResetUserInfo
}