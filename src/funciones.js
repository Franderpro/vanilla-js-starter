import { extraerTarea, eliminar, guardarTareas, putTask } from "./index.js";

let lista = document.getElementById('lista');
let add = document.getElementById('crearTarea');
let contador = document.getElementById("contador");
add.addEventListener("click", function () {

    crearTarea()

})
//         const tareaInput = document.getElementById("tarea");
//         const tituloTarea = document.getElementById("tituloTarea");
// input.addEventListener("keypress", async (event) => {
    
//     if (event.key === "Enter") {
        
//         document.getElementById("crearTarea").click();
//         crearTarea();
//     }
// });

async function crearTarea() {
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();

    const tituloTarea = document.getElementById("tituloTarea");
    const titulo = tituloTarea.value.trim();
    if (tarea !== "") {
        let id = await guardarTareas({
            task: titulo,
            description: tarea,
            check: "incompleto"
        });
        mostrarTarea();
        tareaInput.value = "";
    }
}
// funcion que mostrara la informacion al usuario 
async function mostrarTarea() {
    try {
        // llamamos al GET del APPI
        const tareas = await extraerTarea();
        lista.innerHTML = ""; //funciona como un refrescar pero solo para este div
        //funcion que elimina mediante el ID
        const clickEliminar = (id) => {
            return async () => {
                await eliminar(id);
                mostrarTarea();
            }
        }
        // recorre todo el API
        tareas.forEach(t => {
            //crea documento "p"
            const texto = document.createElement("p");
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            const check = document.createElement("input");
            check.id = t.id;
            check.type = "checkbox"
           // if que pregunta si t.check está completo o incompleto, si está completo, hacemos un check.checked = true
            if (t.check == "completo") {
               check.checked = true

           }
            check.addEventListener("click", async () => {
                await putTask(t);
                //llamar contadorTareas()
                contadorTareas()
            })
            texto.innerText = t.task + ": " + t.description;
            texto.appendChild(check);

            texto.appendChild(botonEliminar);
            lista.appendChild(texto);
            botonEliminar.onclick = clickEliminar(t.id, t.task, t.description);
        });
        //llamar contadorTareas()
        contadorTareas()
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}

//vamos a crear una funcion contadorTareas() que lo que llame a extrareTareas, vamos a recorrer tareas, y dentro del for, vamos a hacer un if que pregunte si tarea.check está completo, si está completo vamos a aumentar un contador, y al final del for, vas a cambiar el contador
 async function contadorTareas() {
    const tareas = await extraerTarea();
    tareas.forEach(t => {
        if (t.check == "completo") {
            contador++;
            valor.innerHTML=contador

        }
    });
    
 }
window.addEventListener("load", async () => {
    mostrarTarea();
})



