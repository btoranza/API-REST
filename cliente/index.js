//Funciones para funcionamiento de modal

const addButton = document.getElementById('add-employee-btn');
const modal = document.getElementsByClassName('modal')[0];

addButton.addEventListener('click', () => {
    modal.style.display = 'block';    
})

const closeModal = () => {
    modal.style.display = 'none';
    newName.classList.remove('has-error');
    newEmail.classList.remove('has-error');
    newAddress.classList.remove('has-error');
    newPhone.classList.remove('has-error');
    formNew.reset();
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

const newName = document.getElementById('form-name');
const newEmail = document.getElementById('form-email');
const newAddress = document.getElementById('form-address');
const newPhone = document.getElementById('form-phone');

const formNew = document.getElementById('form-user');

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
            <td class='user-name'>${user.nombre}</td>
            <td class='user-email'>${user.email}</td>
            <td class='user-address'>${user.direccion}</td>
            <td class='user-phone'>${user.telefono}</td>
            <td id='${user.id}'>
                <div class='editBtn'><i class="material-icons edit-icon" title="Edit">&#xE254;</i></div>
                <div class='deleteBtn'><i class="material-icons delete-icon" title="Delete">&#xE872;</i></div>
            </td>
        </tr>`
        )
        
        tableBody.innerHTML = usersList.join('');

        const eliminar = e => {
            
            const deleteModal = document.getElementById('deleteModal');
            deleteModal.style.display = 'block';

            const id = e.target.parentNode.parentNode.id;

            const deleteModalBtn = document.getElementById('delete-btn-modal');
            const cancelModalBtn = document.getElementById('cancel-modal');

            cancelModalBtn.onclick = () => deleteModal.style.display = 'none';

            deleteModalBtn.onclick = () => {
                
                fetch(`http://localhost:3000/api/users/${id}`, {
                    method: 'delete'
                }).then(res => {
                    document.getElementById(id).parentElement.remove();
                    deleteModal.style.display = 'none';
                })
            }
        }

        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach( button => button.onclick = eliminar)

        const editar = e => {

            modal.style.display = 'block';
            const id = e.target.parentNode.parentNode.id;
            const userToEdit = e.target.parentNode.parentNode.parentElement;
            console.log(userToEdit);

            const nameToEdit = userToEdit.getElementsByClassName('user-name')[0];
            const emailToEdit = userToEdit.getElementsByClassName('user-email')[0];
            const addressToEdit = userToEdit.getElementsByClassName('user-address')[0];
            const phoneToEdit = userToEdit.getElementsByClassName('user-phone')[0];

            newName.value = nameToEdit.innerText;
            newEmail.value = emailToEdit.innerText;
            newAddress.value = addressToEdit.innerText;
            newPhone.value = phoneToEdit.innerText;

            formNew.onsubmit = e => {

                e.preventDefault();
                validar();
                if(validar()===true) {

                    const editedUser = {
                        id: id,
                        nombre: newName.value,
                        email: newEmail.value,
                        direccion: newAddress.value,
                        telefono: newPhone.value
                    }

                    fetch(`http://localhost:3000/api/users/${id}`, {
                    
                    method: 'put', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(editedUser)

                    })
                    .then(res => res.json())
                    .then(editedUser => {
                        console.log(editedUser);
                        closeModal();
                        bringUsers();
                    })


                }

            } 

            
            
        }

        const editBtn = document.querySelectorAll('.editBtn');
        editBtn.forEach( button => button.onclick = editar);
        
    }
)}

bringUsers();

//validacion de datos introducidos

const validar = () => {
    let ok = true;
    let msg = 'Please write something in field: ';
    
    if(newName.value == ''){ 
        ok = false;
        msg += 'Name'
        newName.classList.add('has-error');
    }

    if(newEmail.value == ''){ 
        ok = false;
        msg += 'Email';
        newEmail.classList.add('has-error');   
    }
    // else {
    //     const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //     const resultado = regExp.test(newEmail.value);

    //     if(resultado === true) {
    //         ok = false;
    //         msg = 'Email incorrecto'
    //         newEmail.classList.add('has-error');
    //     }

    if(newAddress.value == ''){ 
        ok = false;
        msg += 'Address'
        newAddress.classList.add('has-error');
    }

    if(newPhone.value == ''){ 
        ok = false;
        msg += 'Phone'
        newPhone.classList.add('has-error');
    }

    if( ok == false) {
        alert(msg);
        return false;

    }else { return true}

}

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

            closeModal(); 

            bringUsers()
        })
    }
  
})

const filterForm = document.getElementById('filter-form');

filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const filterInput = document.getElementById('filter-input');
    const filterValue = filterInput.value;

    fetch(`http://localhost:3000/api/users?search=${filterValue}`, {
        method: 'get'
    })
    .then( res => res.json())
    .then( filteredUsers => {

        const tableBody = document.getElementById('table-body');
        let usersList = filteredUsers.map(user => 
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
                <div class='editBtn'><i class="material-icons edit-icon" title="Edit">&#xE254;</i></div>
                <div class='deleteBtn'><i class="material-icons delete-icon" title="Delete">&#xE872;</i></div>
            </td>
        </tr>`
        )

        tableBody.innerHTML = usersList.join('');

        const eliminar = e => {
            
            const deleteModal = document.getElementById('deleteModal');
            deleteModal.style.display = 'block';

            const id = e.target.parentNode.parentNode.id;

            const deleteModalBtn = document.getElementById('delete-btn-modal');
            const cancelModalBtn = document.getElementById('cancel-modal');

            cancelModalBtn.onclick = () => deleteModal.style.display = 'none';

            deleteModalBtn.onclick = () => {
                
                fetch(`http://localhost:3000/api/users/${id}`, {
                    method: 'delete'
                }).then(res => {
                    document.getElementById(id).parentElement.remove();
                    deleteModal.style.display = 'none';
                })
            }
        }

        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach( button => button.onclick = eliminar)
    }) 

})

