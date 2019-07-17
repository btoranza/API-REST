const express = require('express');
const router = express.Router();

const users = [];

router.get('/users', (req, res) => {

  if(req.query.search) {
      const searchV = req.query.search
      const searchValue = searchV.toLowerCase().toString();

      const filteredUsers = users.filter( u => u.nombre.toLowerCase().includes(searchValue) || u.direccion.toLowerCase().includes(searchValue) || u.email.toLowerCase().includes(searchValue) || u.telefono.toString().includes(searchValue));

      return res.json(filteredUsers);
  }else {
    return res.json(users);}
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

  if(nombre && direccion && email && telefono) {

    if(nombre.trim().length === 0 || direccion.trim().length === 0 || email.trim().length === 0 || telefono.trim().length === 0) {
      console.log('campos vacios')
      return res.status(400).send('Empty field/s');
    
    }else {
      const regExpNumb = new RegExp('^[0-9]+$');
      const resultadoNombre = regExpNumb.test(nombre);
      const restuladoDir = regExpNumb.test(direccion);
      const resultadoEmail = regExpNumb.test(email);

      if(resultadoNombre || restuladoDir || resultadoEmail === true ) {
        console.log('numeros en nombre o direccion')
        return res.status(400).send('Text fields cannot be filled with numbers only');
      }
    }

    const userToPush = {
      id: nextId,
      nombre: nombre,
      direccion: direccion,
      email: email,
      telefono: telefono
    };
  
    users.push(userToPush);
  
    return res.json(userToPush);
    
  }  
 })

 router.delete('/users/:id', (req, res) => {
   const id = parseInt(req.params.id);

   for (let i = 0; i < users.length; i++) {
     if(users[i].id === id) {
       users.splice(i, 1);
     }
   }
   res.json(users);

}) 

router.put('/users/:id', (req, res) => {
  const id = req.body.id;
  const nombreEditado = req.body.nombre;
  const direccionEditada = req.body.direccion;
  const emailEditado = req.body.email;
  const telefonoEditado = req.body.telefono;

  if(nombreEditado && direccionEditada && emailEditado && telefonoEditado) {
    if(nombreEditado.trim().length === 0 || direccionEditada.trim().length === 0 || emailEditado.trim().length === 0 || telefonoEditado.trim().length === 0) {
      console.log('campos vacios')
      return res.status(400).send('Empty field/s');
    
    }else {
      const regExpNumb = new RegExp('^[0-9]+$');
      const resultadoNombre = regExpNumb.test(nombreEditado);
      const restuladoDir = regExpNumb.test(direccionEditada);
      const resultadoEmail = regExpNumb.test(emailEditado);
  
      if(resultadoNombre || restuladoDir || resultadoEmail === true ) {
        console.log('numeros en nombre o direccion')
        return res.status(400).send('Text fields cannot be filled with numbers only');
      }
    }

    users.forEach( user => {
      if( user.id == id ) {
        user.id = id;
        user.nombre = nombreEditado;
        user.email = emailEditado;
        user.direccion = direccionEditada;
        user.telefono = telefonoEditado;
      }
    })

    console.log(users);
    return res.json(users);
  }
});

module.exports = router