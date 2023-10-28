const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile').development);
const ambienteRoutes = require('./ambienteRoutes');
const loginRoutes = require('./loginRoutes');
const cors = require('cors');

const app = express();

// Configuración de middlewares y ajustes de Express
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../client')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../client/html/index.html');
    console.log("Intentando acceder a:", filePath);
    res.sendFile(filePath);
});

// Montar las rutas
app.use('/ambiente', ambienteRoutes);
app.use('/', loginRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Inicio del servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
