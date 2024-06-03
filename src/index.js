
// Inserte el código aquí
document.querySelector('.añadir').addEventListener('click', function () {
    crearTarea();
});
async function extraerTarea() {
    try { const response= await fetch("http://localhost:3000/api/task/");
    const data= await response.json();
        
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
    
}
function crearTarea() {
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();
    const tituloTarea = document.getElementById("tituloTarea");
    const titulo = tituloTarea.value.trim();
    if (tarea !== "") {
        const texto = document.createElement("p");
        texto.innerText = titulo + ": " + tarea;
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = function () {
            texto.parentNode.removeChild(texto);
        };
        texto.appendChild(botonEliminar);
        document.body.appendChild(texto);
        console.log(document.body.appendChild(texto))
        guardarTareas({
            title: titulo,
            description: tarea
        });
        tareaInput.value = "";
    }
}
document.getElementById("eliminar").addEventListener("click", function () {
    eliminarUltimaTarea();
    eliminar({
        id
    })
});
function eliminarUltimaTarea() {
    const elementos = document.querySelectorAll("p");
    const ultimoElemento = elementos[elementos.length - 1];
    if (ultimoElemento) {
        const id = ultimoElemento.dataset.id;
        eliminar(id);
        ultimoElemento.parentNode.removeChild(ultimoElemento);
        eliminar(id )
    }
    eliminar({
        title: titulo,
        description: tarea
    })
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
        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}
async function eliminar() {
    try {
        const response = await fetch("http://localhost:3000/api/task/"+id, {
            method: "DELETE",
            
        });
        if (response.ok) {
            const data = await response.json();

        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}