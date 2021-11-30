const USERNAME = sessionStorage.getItem('user');
var userInfo = {};

LoadUserInfo(); //Carrega as informações de usuário na primeira vez que entrar

function LoadUserInfo()
{
    socket.emit('GetUserInfo', USERNAME);

    document.getElementById('icon-image').setAttribute('src', `/assets/images/${USERNAME.toLowerCase()}.png`);
}

//Atualiza as informações na tela de acordo com os status
function UpdateInfo()
{
    let textVida = document.getElementById('vida');
    let textUmbra = document.getElementById('umbra');
    let textPlayername = document.getElementById('player-username');

    textVida.innerHTML = `Vida: ${userInfo.vida}/${userInfo.maxVida}`;
    textUmbra.innerHTML = `Umbra: ${userInfo.umbra}%`;
    textPlayername.innerHTML = userInfo.player.username;
}

//Muda os status quando aplicado as mudanças
function ChangeStat(stat, value)
{
    if(stat == 'vida')
    {
        userInfo.vida = value;
        socket.emit('UpdateUserInfo', USERNAME, userInfo);
    }
    else if(stat == 'umbra')
    {
        userInfo.umbra = value;
        socket.emit('UpdateUserInfo', USERNAME, userInfo);
    }
    else return console.log('Status não reconhecido')
}

//Função para mostrar a tabela de editar os status do personagem
function ShowEditStats(stat, value)
{

    switch(stat) {
        case 0:
            if(value == 1)
            {
                document.getElementById('vida-edit').style.left = 0;
                document.getElementById('edit-vida-value').value = userInfo.vida;
                document.getElementById('edit-vida-max-value').value = userInfo.maxVida;
            }
            else document.getElementById('vida-edit').style.left = '-250px';
            break;

        case 1:
            if(value == 1)
            {
                document.getElementById('umbra-edit').style.left = 0;
                document.getElementById('edit-umbra-value').value = userInfo.umbra;
            }
            else document.getElementById('umbra-edit').style.left = '-250px';
            break;

        case 2:
            if(value == 1)
            {
                document.getElementById('name-edit').style.left = 0;
                document.getElementById('edit-name-value').value = userInfo.player.username;
            }
            else document.getElementById('name-edit').style.left = '-250px';
            break;
            
    }
}

//Aplica as edições feitas nos status
function EditStat(stat)
{
    if(stat == 0)
    {
        let value = document.getElementById('edit-vida-value').value;
        let maxValue = document.getElementById('edit-vida-max-value').value;
        userInfo.vida = value;
        userInfo.maxVida = maxValue;
        document.getElementById('vida-edit').style.left = '-250px';
    }
    else if(stat == 1)
    {
        let value = document.getElementById('edit-umbra-value').value;
        userInfo.umbra = value;
        document.getElementById('umbra-edit').style.left = '-250px';
    }
    else if(stat == 2)
    {
        let value = document.getElementById('edit-name-value').value;
        userInfo.player.username = value;
        document.getElementById('name-edit').style.left = '-250px';
    }

    socket.emit('UpdateUserInfo', USERNAME, userInfo);
}

socket.on('LoadUserInfo', (INFO) => {
    userInfo = INFO;
    UpdateInfo();
});