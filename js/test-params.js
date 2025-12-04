import { URL_API_PRODUCTOS, traerDatosDeAPI } from "./funcionesFetch.js";



async function cargarDatosDinamicamente() {
    //Tengo que extraer los datos de la URL

// Obtener la URL actual y sus parámetros
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");
const metodo = urlParams.get("action")
const algo = urlParams.get("algo")
if(!algo){
    alert("el parametro ALGO no vino")
}

//Hacer el fetch del producto con ese id, COMPONER LA URL AGREGANDO ID
const URLFetch = `${URL_API_PRODUCTOS}/${idProducto}`;

const datosApi = await traerDatosDeAPI(URLFetch);

//DEBUG
const textContainer = document.getElementById("text-container");
textContainer.innerText = datosApi.nombre + datosApi.descripcion + metodo

    
}

cargarDatosDinamicamente()
