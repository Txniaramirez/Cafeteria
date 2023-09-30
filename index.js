const express = require('express')
const app = express()
const routes = require('./server/routes/routes')
const bodyParser = require('body-parser');

const connection = require('./knexfile')['development']
const database = require('knex')(connection)

app.use(express.json())
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3001;

app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`)
})

app.use('/', routes)

// Sedes

app.post('/sedes', (req, res)=>{
    const toCreate = req.body
    database('sedes').insert(toCreate)
    .then((sedes)=>{
        res.json(sedes)
    })
})
app.delete('/sedes/:id', (req, res)=>{
    const {id} = req.params
    database('sedes')
        .where({id_sede: id})
        .del()
        .then((nombre_sede, direccion_sede, telefono_sede)=>{
            res.json(nombre_sede)
            res.json(direccion_sede)
            res.json(telefono_sede)
        })
})
app.get('/sedes', (req, res)=>{
    database('sedes').then((nombre_sede, direccion_sede, telefono_sede)=>{
        res.json(nombre_sede)
        res.json(direccion_sede)
        res.json(telefono_sede)
    })
})

app.get('/sedes/:id', (req, res)=>{
    const {id} = req.params
    database('sedes')
    .where({id_sede: id})
    .then((nombre_sede, direccion_sede, telefono_sede)=>{
        res.json(nombre_sede)
        res.json(direccion_sede)
        res.json(telefono_sede)
    })
})

app.put('/sedes/:id', (req, res)=>{
    const {id} = req.params
    const toEdit = req.body
    database('sedes')
        .where({id_sede: id})
        .update(toEdit)
        .then((nombre_sede, direccion_sede, telefono_sede)=>{
            res.json(nombre_sede)
            res.json(direccion_sede)
            res.json(telefono_sede)
        })
})

//Reserva

app.post('/reserva', (req, res)=>{
    const toCreate = {
        nombre: req.body.nombre,
        email: req.body.email,
        cantidad_personas: req.body.cantidad_personas,
        hora: req.body.hora,
        fecha: req.body.fecha,
        sede_reserva: req.body.sede_reserva,
    }
    database('reserva').insert(toCreate)
    .then((reserva) => {
        res.json(reserva);
    })
    .catch((error) => {
        console.error('Error al insertar la reserva:', error);
        res.status(500).json({ error: 'Error al procesar la reserva' });
    });
})
app.delete('/reserva/:id', (req, res)=>{
    const {id} = req.params
    database('reserva')
        .where({id_reserva: id})
        .del()
        .then((nombre, email, cantidad_personas, fecha, hora, sede_reserva)=>{
            res.json(nombre)
            res.json(email)
            res.json(cantidad_personas)
            res.json(fecha)
            res.json(hora)
	        res.json(sede_reserva)
        })
})
app.get('/reserva', (req, res)=>{
    database('reserva').then((nombre, email, cantidad_personas, fecha, hora, sede_reserva)=>{
        res.json(nombre)
        res.json(email)
        res.json(cantidad_personas)
        res.json(fecha)
        res.json(hora)
	    res.json(sede_reserva)
    })
})

app.get('/reserva/:id', (req, res)=>{
    const {id} = req.params
    database('reserva')
    .where({id_reserva: id})
    .then((nombre, email, cantidad_personas, fecha, hora, sede_reserva)=>{
        res.json(nombre)
        res.json(email)
        res.json(cantidad_personas)
        res.json(fecha)
        res.json(hora)
	    res.json(sede_reserva)
    })
})

app.put('/reserva/:id', (req, res)=>{
    const {id} = req.params
    const toEdit = req.body
    database('reserva')
        .where({id_reserva: id})
        .update(toEdit)
        .then((nombre, email, cantidad_personas, fecha, hora, sede_reserva)=>{
            res.json(nombre)
            res.json(email)
            res.json(cantidad_personas)
            res.json(fecha)
            res.json(hora)
	        res.json(sede_reserva)
    })
})

// Paginas

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
