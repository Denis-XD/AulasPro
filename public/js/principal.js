document.addEventListener('DOMContentLoaded', function() {
    const userName = sessionStorage.getItem('userName');
    document.getElementById('nameAd').innerHTML = userName;
});


document.addEventListener('DOMContentLoaded', function () {
    // Obtener todas las filas de ejemplo
    const filasEjemplo = document.querySelectorAll('.fila-ejemplo');

    // Iterar a través de cada fila de ejemplo
    filasEjemplo.forEach(fila => {
        // Obtener los elementos select de hora de entrada en la fila
        const horaEntradaSelect = fila.querySelector('.hora-entrada');

        // Obtener el input de "Hora salida" en lugar de la columna "Hora salida"
        const horaSalidaInput = fila.querySelector('.hora-salida');

        // Manejar el evento de cambio en la hora de entrada
        horaEntradaSelect.addEventListener('change', function () {
            // Obtener el valor de la hora de entrada seleccionada
            const horaEntrada = horaEntradaSelect.value;

            // Calcular la siguiente hora y establecerla en el input de "Hora salida"
            const horaEntradaDate = new Date(`2023-01-01 ${horaEntrada}`);
            const horaSalidaDate = new Date(horaEntradaDate.getTime() + 90 * 60000); // Sumar 90 minutos
            const horaSalida = horaSalidaDate.toTimeString().substring(0, 5);

            horaSalidaInput.value = horaSalida;
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todas las filas de ejemplo
    const filasEjemplo = document.querySelectorAll('.fila-ejemplo2');
         // Obtener los elementos select de hora de entrada en la fila
    const horaEntradaSelect = document.querySelector('.hora-entrada2');
    // Iterar a través de cada fila de ejemplo
    filasEjemplo.forEach(fila => {
   

        // Obtener el input de "Hora salida" en lugar de la columna "Hora salida"
        const horaSalidaInput = fila.querySelector('.hora-salida2');

        // Manejar el evento de cambio en la hora de entrada
        horaEntradaSelect.addEventListener('change', function () {
            // Obtener el valor de la hora de entrada seleccionada
            const horaEntrada = horaEntradaSelect.value;

            // Calcular la siguiente hora y establecerla en el input de "Hora salida"
            const horaEntradaDate = new Date(`2023-01-01 ${horaEntrada}`);
            const horaSalidaDate = new Date(horaEntradaDate.getTime() + 90 * 60000); // Sumar 90 minutos
            const horaSalida = horaSalidaDate.toTimeString().substring(0, 5);

            horaSalidaInput.value = horaSalida;
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todas las filas de ejemplo
    const filasEjemplo = document.querySelectorAll('.fila-ejemplo3');
         // Obtener los elementos select de hora de entrada en la fila
    const horaEntradaSelect = document.querySelector('.hora-entrada3');
    // Iterar a través de cada fila de ejemplo
    filasEjemplo.forEach(fila => {
   

        // Obtener el input de "Hora salida" en lugar de la columna "Hora salida"
        const horaSalidaInput = fila.querySelector('.hora-salida3');

        // Manejar el evento de cambio en la hora de entrada
        horaEntradaSelect.addEventListener('change', function () {
            // Obtener el valor de la hora de entrada seleccionada
            const horaEntrada = horaEntradaSelect.value;

            // Calcular la siguiente hora y establecerla en el input de "Hora salida"
            const horaEntradaDate = new Date(`2023-01-01 ${horaEntrada}`);
            const horaSalidaDate = new Date(horaEntradaDate.getTime() + 90 * 60000); // Sumar 90 minutos
            const horaSalida = horaSalidaDate.toTimeString().substring(0, 5);

            horaSalidaInput.value = horaSalida;
        });
    });
});