// Get elements
const btn = document.getElementById('btn__submit');
const input  = document.getElementById('input__task');
const space  = document.getElementById('div__showTask');


let listTask = [];

//Functions 

//Agregar la tarea a la lista de tareas con push
function createTask (){

    let task = {
        text: input.value
    }

    listTask.push(task);
}

// Funcion para guardar la lista en el local storage
function saveToLocalStorage(){

    localStorage.setItem('task', JSON.stringify(listTask));
    readLocalStorage();

}

//Leer el local
function readLocalStorage(){
    
    //Vaciar el contenedor donde se muestran las tareas
    div__showTask.innerHTML = '';

    
    let listTask = [];

    //Verificar que la lista exista 
    if(listTask === null){
        listTask = [];
    }
    else{
    //Convertir el JSON a la lista
    listTask = JSON.parse(localStorage.getItem('task'));

    }

    //Recorrer la lista    
        listTask.forEach( (element, index )=> {

        //Se crea el elemento div
        let nuevaTarea = document.createElement('div');

        //Al div se le asigna la clase task
        nuevaTarea.classList.add('task');

        //Creando el elemento p 
        let texto = document.createElement('p');
        texto.classList.add('p_style');

        //Se agrega la tarea
        texto.innerText = element.text;
        
        //Al div se le agrega el texto
        nuevaTarea.appendChild(texto);

        //Iconos
        let hecho = document.createElement('i');
        hecho.classList.add('bi','bi-check2-circle', 'icono');
        hecho.addEventListener('click', completarTarea);
        nuevaTarea.appendChild(hecho);

        let borrar = document.createElement('i');
        borrar.classList.add('bi', 'bi-trash', 'icono');
        borrar.setAttribute('data-index', index);
        borrar.addEventListener('click', borrarTarea);
        nuevaTarea.appendChild(borrar);

        


        //Al espacio para tareas se agrega una nueva
        space.appendChild(nuevaTarea);

        });
    
}

function completarTarea(e) {

    let tarea = e.target.parentNode;
    //Toggle se usa para asignar o quitar una clase
    tarea.classList.toggle('tasktoDoBackground');
  }

function borrarTarea(e){

    const index = e .target.getAttribute('data-index');
    var listTask;
    //Verificar que la lista exista 
    if(localStorage.getItem('task') == null){
        listTask = [];
    }
    else{
        //Convertir el JSON a la lista
    listTask = JSON.parse(localStorage.getItem('task'));

    }

    listTask.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(listTask));

    readLocalStorage();
    location.reload();
    
}


btn.addEventListener('click', (e) =>
{
    e.preventDefault();  
    createTask();
    saveToLocalStorage();
    input.value = "";
});

input.addEventListener('keydown', (e)=>{
    if(e.key=='Enter'){
        e.preventDefault();
        input.reset;     
        createTask();
        saveToLocalStorage();
        input.value = "";
    }
});


document.addEventListener('DOMContentLoaded', readLocalStorage);

