const express = require('express');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);
const router = express.Router();

// Buscar un aula por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    knex('ambiente').where('id_ambiente', id).select()
    .then(aula => {
        if(aula.length) res.json(aula[0]);
        else res.status(404).json({ message: 'Aula no encontrada' });
    })
    .catch(err => res.status(500).json({ message: 'Error al obtener el aula' }));
});

// Buscar aulas por su tipo
router.get('/tipo/:tipoId', (req, res) => {
    const { tipoId } = req.params;
    knex('ambiente').where('id_tipo_am', tipoId).select()
    .then(aulas => res.json(aulas))
    .catch(err => res.status(500).json({ message: 'Error al obtener las aulas' }));
});

//Obtener todas las aulas
router.get('/', (req, res) => {
    knex('ambiente').select()
    .then(aulas => res.json(aulas))
    .catch(err => res.status(500).json({ message: 'Error al obtener todas las aulas' }));
});


// Cambiar el estado del atributo activo de un aula específica
router.put('/:id/activo', (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;  // Aquí esperamos un objeto como { "activo": true } o { "activo": false }

    knex('ambiente').where('id_ambiente', id).update({ activo })
    .then(count => {
        if(count) res.json({ message: 'Estado "activo" actualizado correctamente' });
        else res.status(404).json({ message: 'Aula no encontrada' });
    })
    .catch(err => res.status(500).json({ message: 'Error al actualizar el estado "activo"' }));
});

// Cambiar el estado del atributo habilitado de un aula específica
router.put('/:id/habilitado', (req, res) => {
    const { id } = req.params;
    const { habilitado } = req.body;  // Aquí esperamos un objeto como { "habilitado": true } o { "habilitado": false }

    knex('ambiente').where('id_ambiente', id).update({ habilitado })
    .then(count => {
        if(count) res.json({ message: 'Estado "habilitado" actualizado correctamente' });
        else res.status(404).json({ message: 'Aula no encontrada' });
    })
    .catch(err => res.status(500).json({ message: 'Error al actualizar el estado "habilitado"' }));
});


// Buscar ambientes disponibles en una fecha específica
router.get('/disponible/:fecha', async (req, res) => {
    try {
        const fecha = req.params.fecha;

        const result = await knex.select(
                't.nombre_tipo',
                'a.numero',
                'a.capacidad',
                'a.descripcion',
                knex.raw('GROUP_CONCAT(f.nombre_faci) as facilidades')
            )
            .from('ambiente as a')
            .leftJoin('tipo_ambiente as t', 'a.id_tipo_am', 't.id_tipo_am')
            .leftJoin('tiene_facilidad as tf', 'a.id_ambiente', 'tf.id_ambiente')
            .leftJoin('facilidad as f', 'tf.id_facilidad', 'f.id_facilidad')
            .whereNotIn('a.id_ambiente', function() {
                this.select('r.id_ambiente').from('reserva as r').where('r.fecha', fecha)
            })
            .andWhere('a.activo', true)
            .andWhere('a.habilitado', true)
            .groupBy('a.id_ambiente')
            .orderBy([
                { column: 't.nombre_tipo', order: 'asc' },
                { column: 'a.numero', order: 'asc' },
                { column: 'a.capacidad', order: 'asc' },
                { column: 'a.descripcion', order: 'asc' }
            ]);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los ambientes disponibles." });
    }
});

router.get('/disponiblePorCapacidad/:capacidad', async (req, res) => {
    try {
        const capacidad = parseInt(req.params.capacidad, 10); // Convertir el parámetro a número

        const result = await knex.select(
                't.nombre_tipo',
                'a.numero',
                'a.capacidad',
                'a.descripcion',
                knex.raw('GROUP_CONCAT(f.nombre_faci) as facilidades')
            )
            .from('ambiente as a')
            .leftJoin('tipo_ambiente as t', 'a.id_tipo_am', 't.id_tipo_am')
            .leftJoin('tiene_facilidad as tf', 'a.id_ambiente', 'tf.id_ambiente')
            .leftJoin('facilidad as f', 'tf.id_facilidad', 'f.id_facilidad')
            .where('a.capacidad', '>=', capacidad)
            .andWhere('a.activo', true)
            .andWhere('a.habilitado', true)
            .groupBy('a.id_ambiente')
            .orderBy([
                { column: 't.nombre_tipo', order: 'asc' },
                { column: 'a.numero', order: 'asc' },
                { column: 'a.capacidad', order: 'asc' },
                { column: 'a.descripcion', order: 'asc' }
            ]);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los ambientes disponibles por capacidad." });
    }
});

router.get('/disponiblePorHora/:hora', async (req, res) => {
    try {
        const hora = req.params.hora;

        const result = await knex.select('t.nombre_tipo', 'a.numero', 'a.capacidad', 'a.descripcion', 
        knex.raw('GROUP_CONCAT(f.nombre_faci) as facilidades'))
            .from('ambiente as a')
            .leftJoin('tipo_ambiente as t', 'a.id_tipo_am', 't.id_tipo_am')
            .leftJoin('tiene_facilidad as tf', 'a.id_ambiente', 'tf.id_ambiente')
            .leftJoin('facilidad as f', 'tf.id_facilidad', 'f.id_facilidad')
            .whereNotIn('a.id_ambiente', function() {
                this.select('r.id_ambiente')
                    .from('reserva as r')
                    .join('periodo as p', 'r.id_periodo', 'p.id_periodo')
                    .where('p.hora_ini', '<=', hora)
                    .andWhere('p.hora_fin', '>=', hora);
            })
            .andWhere('a.activo', true)
            .andWhere('a.habilitado', true)
            .groupBy('a.id_ambiente')
            .orderBy(['t.nombre_tipo', 'a.numero', 'a.capacidad', 'a.descripcion']);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al buscar los ambientes por hora." });
    }
});

module.exports = router;  // Exporta las rutas para usarlas en server.js
