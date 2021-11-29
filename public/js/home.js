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

//Função para mostrar a tabela de editar os status do personagem
function ShowEditStats(stat, value)
{
    if(stat == 0 && value == 1)
    {
        document.getElementById('vida-edit').style.left = 0;
        document.getElementById('edit-vida-value').value = stats.vida;
        document.getElementById('edit-vida-max-value').value = stats.maxVida;
    }
    else if(stat == 0 && value == 0)
    {
        document.getElementById('vida-edit').style.left = '-250px';
    }
    else if(stat == 1 && value == 1)
    {
        document.getElementById('umbra-edit').style.left = 0;
        document.getElementById('edit-umbra-value').value = stats.umbra;
    }
    else if(stat == 1 && value == 0)
    {
        document.getElementById('umbra-edit').style.left = '-250px';
    }
}

//Aplica as edições feitas nos status
function EditStat(stat)
{
    if(stat == 0)
    {
        let value = document.getElementById('edit-vida-value').value;
        let maxValue = document.getElementById('edit-vida-max-value').value;
        stats.vida = value;
        stats.maxVida = maxValue;
        document.getElementById('vida-edit').style.left = '-250px';
    }
    else if(stat == 1)
    {
        let value = document.getElementById('edit-umbra-value').value;
        stats.umbra = value;
        document.getElementById('umbra-edit').style.left = '-250px';
    }

    socket.emit('UpdateUserStats', USERNAME, stats);
}