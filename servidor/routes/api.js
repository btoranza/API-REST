const express = require('express');
const router = express.Router();

const users = [{
  nombre: 'Ada',
  apellido: 'Lovelace',
  telefono: '1234567890',
  email: 'contacto@gmail.com'
}, {
  nombre: 'Grace',
  apellido: 'Hopper',
  telefono: '087654321',
  email: 'contacto@hotmail.com'
}]

router.get('/users', (req, res) => {
  res.json(users);
})







module.exports = router;