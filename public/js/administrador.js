
$(document).ready(function() {
    const userName = sessionStorage.getItem('userName');
    document.getElementById('nameAd').innerHTML = userName;

    // Obteniendo los datos
    $.get('/datos-administrador', function(data) {
        let content = '';
        data.forEach((item, index) => {
            content += `
                <tr>
                    <td>${item.N}</td>
                    <td>${item.nombre}</td>
                    <td>${item.numero}</td>
                    <td>${item.capacidad}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.fecha}</td>
                    <td>${item.hora_ini}</td>
                    <td>${item.hora_fin}</td>
                    <td>
                    <select class="estado-selector" data-id-reserva="${item.id_reserva}" data-id="${item.N}">
                        <option value="Pendiente" ${item.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="Aceptado" ${item.estado === "Aceptado" ? "selected" : ""}>Aceptar</option>
                        <option value="Rechazado" ${item.estado === "Rechazado" ? "selected" : ""}>Rechazar</option>
                    </select>
                    </td>
                </tr>`;
        });

        $('#tablaAulas1').html(content);
        asignarEventosYColores();
    });
});

function asignarEventosYColores() {
    // Asignar eventos a los selectores de estado recién creados
    $(".estado-selector").on("change", function () {
        var selectedValue = $(this).val();
        var currentRow = $(this).closest("tr");

        switch (selectedValue) {
            case "Pendiente":
                currentRow.css("background-color", "yellow");
                break;
            case "Aceptado":
                currentRow.css("background-color", "green");
                break;
            case "Rechazado":
                currentRow.css("background-color", "red");
                break;
        }

        var reservaId = $(this).data("id-reserva");
        
        // Realizar petición AJAX para actualizar la base de datos
        $.ajax({
            url: '/actualizar-reserva',  // URL del endpoint en tu servidor que manejará la actualización
            type: 'POST',
            data: {
                id: reservaId,             // ID de la reserva a actualizar
                estado: selectedValue      // Nuevo estado
            },
            success: function(response) {
                if (response.success) {
                    console.log('Estado actualizado correctamente');
                } else {
                    console.error('Error al actualizar el estado');
                }
            },
            error: function() {
                console.error('Error al realizar la petición AJAX');
            }
        });
    });

    // Inicializar colores basados en el valor del selector
    $(".estado-selector").each(function () {
        $(this).trigger("change");
    });
}

