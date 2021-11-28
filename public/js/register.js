const UrlParams = new URLSearchParams(window.location.search);
const Params = Object.fromEntries(UrlParams.entries());

const socket = io();

function VerifyParams()
{
    if(Params.username && Params.password)
    {
        if(Params.username.length < 4 || Params.username.length > 20) return showErrorMessage('Nome de usuario muito curto ou muito longo!');
        if(Params.password.length < 4 || Params.password.length > 20) return showErrorMessage('Senha muito curta ou muito longa!');
        if(Params.username == Params.password) return showErrorMessage('Você não pode usar seu nome de usuário como senha!');
        Params.username = Params.username.toLowerCase();
        return true;
    }
    else return false;
}


function showErrorMessage(msg)
{
    const errorText = document.querySelector('.error-text');
    errorText.innerHTML = msg;
    errorText.style.display = "block";
}

socket.on('consoleMessage', (msg) => {
    console.log(msg);
});

socket.on('errorMessage', (msg) => {
    showErrorMessage(msg);
});

socket.on('Registered', () => {
    window.location.href = '/login';
});

if(sessionStorage.getItem('user') != 'aletropy') window.location.href = '/'

if(VerifyParams())
{
    socket.emit('RegisterNewUser', Params.username, Params.password);
}