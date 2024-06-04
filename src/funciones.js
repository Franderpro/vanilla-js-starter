
// Inserte el código aquí

let add = document.getElementById('crearTarea')


add.addEventListener("click",function () {
  
    crearTarea()
    
})



async function extraerTarea() {
    try {
        const response = await fetch("http://localhost:3000/api/task/");
        const data = await response.json();
        
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
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
            return data[data.length-1].id

        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}
 async function crearTarea() {
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();
    
    const tituloTarea = document.getElementById("tituloTarea");
    const titulo = tituloTarea.value.trim();
    if (tarea !== "") {
        const onDelete=(id, child) => { 

            return () => { 
                child.parentNode.removeChild(child);
               
                eliminar(id);
             }
         }
        const texto = document.createElement("p");
        texto.innerText = titulo + ": " + tarea;
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
       
        texto.appendChild(botonEliminar);
        document.body.appendChild(texto);
        let id= await guardarTareas({
            titulo: titulo, 
            description: tarea

        });
        botonEliminar.onclick = onDelete(id, texto);
        console.log(id);
        tareaInput.value = "";
    }
}


async function eliminar(id) { 
    try { 
        const response = await fetch("http://localhost:3000/api/task/"+id , {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
        } else {
            console.error("Error al eliminar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}