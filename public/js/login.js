// Tu código de JavaScript en el frontend

document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario = document.querySelector('#usuario').value;
    const contrasena = document.querySelector('#contrasena').value;

    const response = await fetch('/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena }),
    });

    const data = await response.json();

    if (data.message) {
        alert(data.message);
    } else {
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userName', data.userName);
        window.location.href = data.redirect;
    }
});
