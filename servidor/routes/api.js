const express = require('express');
const router = express.Router();

const users = [];

router.get('/users', (req, res) => {
  res.json(users);
})

router.post('/users', (req, res) => {
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const telefono = req.body.telefono;

  let nextId = 1;
  if(users.length > 0) {
    nextId = users[users.length-1].id+1;
  };

  const userToPush = {
    id: nextId,
    nombre: nombre,
    direccion: direccion,
    email: email,
    telefono: telefono
  };

  users.push(userToPush);
  console.log(userToPush);

  res.json(userToPush);
  
 })

module.exports = router;