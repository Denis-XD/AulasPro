$(document).ready(function() {
    // Muestra el nombre de usuario desde sessionStorage
    const userName = sessionStorage.getItem('user') || 'Nombre de Usuario';
    $('#nameAd').text(userName);

   
    const data = [
        { 
            N: 1, nombre: 'Denis Brun', numeroAula: '690B', capacidad: 50,
            descripcion: 'Ubicación: Departamento de matemáticas', fecha: '2023-10-07', 
            horaEntrada: '11:14:00', horaSalida: '12:45:00', estado: 'Pendiente' 
        }
    ];

    let content = '';
    data.forEach(item => {
        content += `
            <tr>
                <td class="numero">${item.N}</td>
                <td class="nombre">${item.nombre}</td>
                <td class="numero-aula">${item.numeroAula}</td>
                <td class="capacidad">${item.capacidad}</td>
                <td class="descripcion">${item.descripcion}</td>
                <td class="fec">${item.fecha}</td>
                <td class="ho_en">${item.horaEntrada}</td>
                <td class="ho_sali">${item.horaSalida}</td>
                <td class="estado">
                    <select class="estado-selector">
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

function asignarEventosYColores() {
    $(".estado-selector").on("change", function() {
        const selectedValue = $(this).val();
        const currentRow = $(this).closest("tr");

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

        
    });

    
    $(".estado-selector").each(function() {
        $(this).trigger("change");
    });
}
