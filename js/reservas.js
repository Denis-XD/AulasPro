$(document).ready(function() {
    $('#tablaAulas1 tr').each(function() {
        var estado = $(this).find('td:last').text().trim();

        if (estado == 'Pendiente') {
            $(this).addClass('pendiente');
        } else if (estado == 'Aceptado') {
            $(this).addClass('aceptado');
        } else if (estado == 'Rechazado') {
            $(this).addClass('rechazado');
        }
    });
});
