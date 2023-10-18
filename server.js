const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(bodyParser.json());

// Ejemplo de consulta a la base de datos para un archivo HTML
app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM usuario');
        // Puedes enviar los datos como respuesta o renderizar una vista
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Error en los datos" });
        }

        const user = rows[0];

        if (user.admi) {
            return res.json({ redirect: '/administrador.html', userId: user.id_usuario });
        } else {
            return res.json({ redirect: '/principal.html', userId: user.id_usuario });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});


// Repite lo anterior para tus otros archivos HTML y rutas según lo necesites

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
