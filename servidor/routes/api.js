const express = require('express');
const router = express.Router();

const users = [
  {
    id: 1,
    nombre: 'Berenice',
    direccion: 'mi calle',
    email: 'btoranza@gmail.com',
    telefono: 111000033,
  },
  {
    id: 2,
    nombre: 'Alma',
    direccion: 'mi calle2',
    email: 'alma@gmail.com',
    telefono: 11100234240033, 
  },
  {
    id: 3,
    nombre: 'Pascal',
    direccion: 'mi calle3',
    email: 'pascal@gmail.com',
    telefono: 15555555033,
  }

]

router.get('/users', (req, res) => {

  if(req.query.search) {
      const searchV = req.query.search
      const searchValue = searchV.toLowerCase();

      const filteredUsers = users.filter( u => u.nombre.toLowerCase().includes(searchValue) || u.direccion.toLowerCase().includes(searchValue) || u.email.toLowerCase().includes(searchValue) || u.telefono.includes(searchValue));

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
   console.log(req.params.id);
   const id = parseInt(req.params.id);

   for (let i = 0; i < users.length; i++) {
     if(users[i].id === id) {
       users.splice(i, 1);
     }
   }
   console.log(users);
   res.json(users);

}) 

module.exports = router;