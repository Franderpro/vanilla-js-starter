const { response } = require("express");

// Inserte el código aquí
document.querySelector('.añadir').addEventListener('click', function() {
    crearTarea();
});


function crearTarea() {
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();
    const tituloTarea = document.getElementById("tituloTarea");
    const titulo =tituloTarea.value.trim();

    if (tarea !== "") {
        const texto = document.createElement("p");
        texto.innerText = titulo + ": " + tarea;


        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = function() {
            texto.parentNode.removeChild(texto); 
        };

        texto.appendChild(botonEliminar); 
        document.body.appendChild(texto);

        guardarTareas({
            title: titulo,
            description: tarea
        });

        tareaInput.value = "";
    }
}


document.getElementById("eliminar").addEventListener("click", function() {
    eliminarUltimaTarea();
});


function eliminarUltimaTarea() {
    const elementos = document.querySelectorAll("p");
    const ultimoElemento = elementos[elementos.length - 1];

    if (ultimoElemento) {
        ultimoElemento.parentNode.removeChild(ultimoElemento); 
    }
}
async function guardarTareas(nuevaTarea) {
    try {
        const response = await fetch("http://localhost:3000/api/task/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Tarea guardada correctamente:", data);
        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
    
}
async function eliminar(nuevaTarea) {
    try {
        const response = await fetch("http://localhost:3000/api/task/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });
    } 
    
    catch (error) {
        
    }
    
}