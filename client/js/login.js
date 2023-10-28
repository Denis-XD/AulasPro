document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recoger los datos del formulario
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Enviar los datos al servidor para autenticación
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, contrasena })
            });

            const data = await response.json();

            // Comprobar si el usuario es válido

            if (data.valido) {
                
                
                sessionStorage.setItem('user', data.nom);

                if (data.admi) {
                    // Redirigir al usuario a la página de administrador si el atributo "admi" es verdadero
                    window.location.href = '../html/administrador.html';
                    
                } else {
                    // Redirigir al usuario a la página principal si el atributo "admi" es falso
                    window.location.href = '../html/principal.html';
                }
            } else {
                // Mostrar un mensaje si las credenciales son incorrectas
                alert('Usuario o contraseña incorrecta');
            }
        } catch (error) {
            console.error('Hubo un error:', error);
            alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
    });
});
