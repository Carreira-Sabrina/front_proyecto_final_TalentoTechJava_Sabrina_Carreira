//LA IDEA ES REUTILIZAR EL FORMULARIO TANTO PARA CREAR COMO PARA ACTUALIZAR UNA CATEGORIA
//LA DIFERENCIA ESTÁ ENTRE LOS URL PARAMS QUE SE RECIBAN O NO

//SI SE RECIBEN URL PARAMS, ES PARA ACTUALIZAR => HAY QUE RELLENAR LOS CAMPOS, HACIENDO FETCH POR ID

//EN SUBMIT SI ES ACTUALIZAR EL FETCH POST DEBE LLAMAR AL ENDPOINT CON /id

import {URL_API_CATEGORIAS,
        traerDatosDeAPI,
        enviarDatosAApi } from "./funcionesFetch.js";

//Event listener del submit
const formulario = document.getElementById("formulario-categoria");
formulario.addEventListener("submit",enviarDatosCategoria)

//Parsear la URL para ver si vienen parámetros
const urlParams = new URLSearchParams(window.location.search);
const idCategoria = urlParams.get("id");

//Tanto el method de fetch como la URL del endpoint dependen de si vino el ulr param id
const METODO = (!idCategoria) ? "POST" : "PUT";
const ENDPOINT = (!idCategoria) ? URL_API_CATEGORIAS : `${URL_API_CATEGORIAS}/${idCategoria}`;

//El título de la página es dinámico, dependiendo si es creación o edición
document.getElementById("titulo").innerText = (!idCategoria)    ? "Completa todos los datos para crear una nueva categoría"
                                                                : "Modifique el nombre de la categoría"


//Capturar el id del input. Hay que rellenarlo si es editar
const inputNombre = document.getElementById("nombre");
if(METODO == "PUT"){
    rellenarCampos();
}



// ************************ FUNCIONES AUXILIARES ************************
//=========================================================================

async function rellenarCampos() {
    //Hacer fetch
    const datosCategoria = await traerDatosDeAPI(ENDPOINT);
    inputNombre.value = datosCategoria.nombre;
}


//Handler del submit, hace el fetch
async function enviarDatosCategoria(event, metodo, endopoint){
    
    event.preventDefault();
    //Capturar el value del input
    const nombre = inputNombre.value;

    if(!nombre){
        alert("El nombre de la categoría no puede estar vacío! ")
        return;
    }

    //Preparo un objeto para enviar
    const categoria = {
        nombre: nombre
    }

    //fetch con POST request
    const respuesta = await enviarDatosAApi(ENDPOINT, categoria, METODO)
    console.log(respuesta)
    // respuesta viene asi {id: 8, nombre: 'Perfumería'}
    //Alert

    //ESTO ESTÁ FALLANDO !!! DA ERROR 🦗🦗🦗🦗🦗🦗🦗🦗🦗🤯🤯🤯👻

    const textoMsj = (METODO == "POST") ? `Se ha creado la categoría ${respuesta.nombre} con id ${respuesta.id} correctamente`
                                        : `Se ha modificado la categoría ${respuesta.nombre} con id ${respuesta.id} correctamente`

    CoolAlert.show({
        icon: "success",
        title: "Todo salió bien",
        text: textoMsj
    });

    //Limpiar formulario
    formulario.reset();

}

