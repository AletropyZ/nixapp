const socket = io();

if(!sessionStorage.getItem('isAdmin')) window.location.href = '/';

function ResetUserInfo(username)
{
    socket.emit('ResetUserInfo', username);
}