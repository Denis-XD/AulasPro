const userName = sessionStorage.getItem('user') || 'Nombre de Usuario';
    $('#nameAd').text(userName);

    document.getElementById('searchByDateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.getElementById('dateInput').value;
        
        try {
            const response = await fetch(`http://localhost:5000/ambiente/disponible/${date}`);
            const data = await response.json();
            
            displayResultsInTable('resultsByDateTable', data);
        } catch (error) {
            console.error("Hubo un error al obtener los ambientes disponibles:", error);
        }
    });
    

    document.getElementById('searchByCapacityForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const capacity = document.getElementById('capacityInput').value;
        
        try {
            // Realizar solicitud GET al backend con la capacidad como parámetro
            ///const response = await fetch(`/disponiblePorCapacidad/${capacity}`);
            const response = await fetch(`http://localhost:5000/ambiente/disponiblePorCapacidad/${capacity}`);
            const data = await response.json();
    
            // Si la respuesta contiene un error, lo muestra
            if (data.error) {
                alert(data.error);
                return;
            }
    
            // Muestra los resultados en la tabla 'resultsByCapacityTable' utilizando la función displayResultsInTable
            displayResultsInTable('resultsByCapacityTable', data);
        } catch (error) {
            console.error('Error al obtener los ambientes por capacidad:', error);
            alert('Error al buscar ambientes por capacidad. Por favor, intenta de nuevo.');
        }
    });
    

    document.getElementById('searchByHourForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const hour = document.getElementById('hourInput').value;
        
        try {
            //const response = await fetch(`/disponiblePorHora/${hour}`);
            const response = await fetch(`http://localhost:5000/ambiente/disponiblePorHora/${hour}`);
            
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            
            const data = await response.json();
            
            displayResultsInTable('resultsByHourTable', data);
    
        } catch (error) {
            alert('Error al buscar ambientes por hora. Por favor, intenta de nuevo.');
            console.error(error);
        }
    });
    
// Ejemplo de función para mostrar los resultados en una tabla
function displayResultsInTable(tableId, results) {
    const table = document.getElementById(tableId);
    table.innerHTML = `
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Número</th>
                <th>Capacidad</th>
                <th>Descripción</th>
                <th>Facilidades</th>
                <th>Periodo</th>
                <th>Reservar</th>
            </tr>
        </thead>
        <tbody>
            ${results.map(result => `
                <tr>
                    <td>${result.nombre_tipo}</td>
                    <td>${result.numero}</td>
                    <td>${result.capacidad}</td>
                    <td>${result.descripcion}</td>
                    <td>
                        <select class="form-control">
                        ${result.facilidades ? result.facilidades.split(',').map(facilidad => `
                            <option value="${facilidad}">${facilidad}</option>
                        `).join('') : '<option value="">Sin facilidades</option>'}
                        </select>
                    </td>
                    <td>
                        <select class="form-control">
                            <option value="06:45:00 - 07:30:00">06:45:00 - 07:30:00</option>
                            <option value="07:30:00- 08:15:00">07:30:00- 08:15:00</option>
                            <!-- Agrega más opciones según necesites -->
                        </select>
                    </td>
                    <td><button class="btn btn-primary">Reservar</button></td>
                </tr>
            `).join('')}
        </tbody>
    `;
}
