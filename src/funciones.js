import { extraerTarea, eliminar, guardarTareas } from "./index.js";

let add = document.getElementById('crearTarea')
let contador=0
let valor = document.getElementById("valor")
add.addEventListener("click", function () {

    crearTarea()

})


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
       // check.onclick =contadorTareas();
        texto.appendChild(check);
        texto.appendChild(botonEliminar);
        document.body.appendChild(texto);
        let id = await guardarTareas({
            titulo: titulo,
            description: tarea
        });
        botonEliminar.onclick = clickEliminar(id, texto);
       
        tareaInput.value = "";

        console.log(check)

        check.addEventListener("click",function () {
            if (check.checked) {
                contador++
                valor.innerHTML=contador
            }else{
                contador--
                valor.innerHTML=contador
            }
        })
       

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
            check.id = "check";
            check.type = "checkbox"
            check.addEventListener("click",function () {
                if (check.checked) {
                    contador++
                    valor.innerHTML=contador
                }else{
                    contador--
                    valor.innerHTML=contador
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



