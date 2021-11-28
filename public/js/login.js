const UrlParams = new URLSearchParams(window.location.search);
const Params = Object.fromEntries(UrlParams.entries());

const socket = io();

function VerifyParams()
{
    if(Params.username && Params.password)
    {
        Params.username = Params.username.toLowerCase();
        return true;
    }
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

socket.on('userVerified', (nickname) => {
    sessionStorage.setItem('logged', true);
    sessionStorage.setItem('user', nickname);
    window.location.href = '/';
});

if(VerifyParams())
{
    socket.emit('VerifyUser', Params.username, Params.password);
}