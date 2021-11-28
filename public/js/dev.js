const socket = io();

if(!sessionStorage.getItem('isAdmin')) window.location.href = '/';