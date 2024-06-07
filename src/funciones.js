import { extraerTarea, eliminar, guardarTareas,putTask } from "./index.js";

let add = document.getElementById('crearTarea')
let contador=0
let valor = document.getElementById("valor")
add.addEventListener("click", function () {

    crearTarea()

})

const tituloTarea = document.getElementById("tituloTarea");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});

async function crearTarea() {
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();

    const tituloTarea = document.getElementById("tituloTarea");
    const titulo = tituloTarea.value.trim();
    if (tarea !== "") {

        const clickEliminar = (id, child) => {
            return () => {
                child.parentNode.removeChild(child);
                eliminar(id);
            }
        }

        const texto = document.createElement("p");
        texto.innerText = titulo + ": " + tarea;
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        const check = document.createElement("input");
        check.id = "check";
        check.type = "checkbox";
        texto.appendChild(check);
        texto.appendChild(botonEliminar);
        document.body.appendChild(texto);
        let id = await guardarTareas({
            task: titulo,
            description: tarea
        });
        botonEliminar.onclick = clickEliminar(id, texto);
       
        tareaInput.value = "";

        console.log(check)
        let indentificador=check.id

        //crear evento para identificar el check por medio de  id y mandar actualizar
        function actualizarContador() {
            if (check.checked) {
                contador++;
            } else {
                contador--;
                putTask(identificador,"incompleto")
            }
            valor.innerHTML = contador;
        }
        
        // Añade el manejador de eventos al checkbox
        check.addEventListener("click", actualizarContador);
        
       

    }
}
async function mostrarTarea() {
    try {
        const clickEliminar = (id, child) => {
            return () => {

                eliminar(id);
            }
        }

        const tareas = await extraerTarea();

        tareas.forEach(t => {
            const texto = document.createElement("p");
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            const check = document.createElement("input");
            check.id = t.id;
            check.type = "checkbox"
            let identificador= check.id;
            check.addEventListener("click",async () =>{
                if (check.checked) {
                    contador++
                    valor.innerHTML=contador
                    putTask(identificador,"completo")
                }else{
                    contador--
                    valor.innerHTML=contador
                    putTask(identificador,"incompleto")
                }
            })
            texto.innerText = t.titulo + ": " + t.description;
            texto.appendChild(check);

            texto.appendChild(botonEliminar);
            document.body.appendChild(texto);
            botonEliminar.onclick = clickEliminar(t.id, t.titulo, t.description);

        });
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }



}
window.addEventListener("load", () => {
    mostrarTarea();
})



