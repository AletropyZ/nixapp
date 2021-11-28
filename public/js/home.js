const USERNAME = sessionStorage.getItem('user');
var stats = {};

LoadUserInfo(); //Carrega as informações de usuário na primeira vez que entrar



function LoadUserInfo()
{
    socket.emit('GetUserInfo', USERNAME);
}

function UpdateStats()
{
    let textVida = document.getElementById('vida');
    let textUmbra = document.getElementById('umbra');

    textVida.innerHTML = `Vida: ${stats.vida}/${stats.maxVida}`;
    textUmbra.innerHTML = `Umbra: ${stats.umbra}%`;
}

function ChangeStat(stat, value)
{
    if(stat == 'vida')
    {
        stats.vida = value;
        socket.emit('UpdateUserStats', USERNAME, stats);
    }
    else if(stat == 'umbra')
    {
        stats.umbra = value;
        socket.emit('UpdateUserStats', USERNAME, stats);
    }
    else return console.log('Status não reconhecido')
}

socket.on('LoadUserInfo', (STATS) => {
    stats = STATS;
    UpdateStats();
});