const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Ejemplo de consulta a la base de datos para un archivo HTML
/*app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM usuario');
        // Puedes enviar los datos como respuesta o renderizar una vista
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});*/



app.post('/index', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Error en los datos" });
        }

        const user = rows[0];

        if (user.admi) {
            return res.json({ redirect: '/html/administrador.html', userId: user.id_usuario, userName: user.nombre });
        } else {
            return res.json({ redirect: '/html/principal.html', userId: user.id_usuario, userName: user.nombre });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.get('/datos-administrador', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vista_administrador');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.post('/actualizar-reserva', (req, res) => {
    const reservaId = req.body.id;
    const nuevoEstado = req.body.estado;
    
    //console.log("ID de reserva:", reservaId);
    //console.log("Nuevo estado:", nuevoEstado);
    
    // Crear la consulta SQL para actualizar la reserva
    const sql = 'UPDATE reserva SET estado = ? WHERE id_reserva = ?';
    const values = [nuevoEstado, reservaId];

    // Ejecutar la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Error al actualizar la reserva' });
        }
        res.json({ success: true });
    });
});

app.get('/usuario-historial', async (req, res) => {
    const userId = req.query.userId;
    try {
        const [rows] = await db.execute('CALL usuario_historial(?)', [userId]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

// Repite lo anterior para tus otros archivos HTML y rutas según lo necesites

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
