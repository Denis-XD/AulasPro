
$(document).ready(function() {
    const userName = sessionStorage.getItem('userName');
    document.getElementById('nameAd').innerHTML = userName;
    
    const userId = sessionStorage.getItem('userId');
    
        $.get(`/usuario-historial?userId=${userId}`, function(data) {
            let content = '';
            data.forEach((item, index) => {
                content += `
                    <tr>
                        <td>${item.N}</td>
                        <td>${item.numero}</td>
                        <td>${item.capacidad}</td>
                        <td>${item.descripcion}</td>
                        <td>${item.fecha}</td>
                        <td>${item.hora_ini}</td>
                        <td>${item.hora_fin}</td>
                        <td>${item.estado}</td>
                    </tr>`;
            });
    
            $('#tablaAulas1').html(content);
            asignarColores();
        });
    });
    
    function asignarColores() {
        $('tbody tr').each(function() {
            const estado = $(this).find('td:last').text().trim();
            
            switch (estado) {
                case "Pendiente":
                    $(this).css("background-color", "yellow");
                    break;
                case "Aceptado":
                    $(this).css("background-color", "green");
                    break;
                case "Rechazado":
                    $(this).css("background-color", "red");
                    break;
                default:
                    // Si hay otros estados, aquí puedes agregar más casos
                    break;
            }
        });

}

