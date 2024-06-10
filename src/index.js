
// Inserte el código aquí




async function extraerTarea() {
    try {
        const response = await fetch("http://localhost:3000/api/task/");
       
        const data = await response.json();
        if (response.ok) {
            return data;

        } 

    } 
    catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}



async function guardarTareas(nuevaTarea) {
    try {
        nuevaTarea.task.titulo
        nuevaTarea.task.description
        const response = await fetch("http://localhost:3000/api/task/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data[data.length - 1].id
            
           
        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}



async function eliminar(id) {
    try {
        const response = await fetch("http://localhost:3000/api/task/" + id, {
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
async function putTask(tarea) {
    try {
        console.log(tarea);
        tarea.check === "incompleto" ? tarea.check = "completo" : tarea.check = "incompleto"
        const response = await fetch("http://localhost:3000/api/task/"+tarea.id , {
            method: "PUT",
          
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarea)
        });
        if (response.ok) {
            const data = await response.json();
           
            return data[data.length - 1].id
        } else {
            console.error("Error al guardar la tarea:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}

export{extraerTarea,eliminar,guardarTareas,putTask};