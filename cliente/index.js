// Trayendo los datos del servidor al home

const bringUsers = () => {
    fetch('http://localhost:3000/api/users')
    .then( res => res.json())
    .then( data => {
        const users = data;
        const tableBody = document.getElementById('table-body');
        let usersList = users.map(user => 
        `<tr>
            <td>
            <input type="checkbox" class='css-checkbox' />
            <label class='css-label'></label>
            </td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.direccion}</td>
            <td>${user.telefono}</td>
            <td>
                <i class="material-icons edit-icon" title="Edit">&#xE254;</i>
                <i class="material-icons delete-icon" title="Delete">&#xE872;</i>
            </td>
        </tr>`
    )
    tableBody.innerHTML = usersList.join('');
    })

}

bringUsers();

//Funciones para funcionamiento de modal

const addButton = document.getElementById('add-employee-btn');
const modal = document.getElementsByClassName('modal')[0];
addButton.addEventListener('click', () => {
    modal.style.display = 'block';    
})

const closeModal = () => {
    modal.style.display = 'none';
}

const closeButton = document.getElementsByClassName('close')[0];
const cancelButton = document.getElementsByClassName('btn btn-secondary')[0];
closeButton.addEventListener('click', closeModal)
cancelButton.addEventListener('click', closeModal)


const clickOutsideModal = (e) => {    
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('click', clickOutsideModal)

//Guardando la info del nuevo empleado

const newName = document.getElementById('form-name');
const newEmail = document.getElementById('form-email');
const newAddress = document.getElementById('form-address');
const newPhone = document.getElementById('form-phone');

//validacion de datos introducidos

const validar = () => {
    let ok = true;
    let msg = 'Please write something in field: ';
    
    if(newName.value == ''){ 
        ok = false;
        msg += 'Name'
        newName.style.borderColor = 'red';
    }

    if(newEmail.value == ''){ 
        ok = false;
        msg += 'Email'
        newEmail.style.borderColor = 'red';
    }

    if(newAddress.value == ''){ 
        ok = false;
        msg += 'Address'
        newAddress.style.borderColor = 'red';
    }

    if(newPhone.value == ''){ 
        ok = false;
        msg += 'Phone'
        newPhone.style.borderColor = 'red';
    }

    if( ok == false) {
        alert(msg);
        return false;

    }else { return true}

}

formNew = document.getElementById('form-user');

// Agrego on submit al form y hago POST a la API con los nuevos datos

formNew.addEventListener('submit', (e) => {
    e.preventDefault();
    validar()
    if(validar()===true) {

        const newUser = {
            nombre: newName.value,
            email: newEmail.value,
            direccion: newAddress.value,
            telefono: newPhone.value,
        }

        fetch('http://localhost:3000/api/users', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(newUser => {
            console.log(newUser);
        })

        closeModal();
        formNew.reset();

    }
})



