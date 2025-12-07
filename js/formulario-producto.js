//LA IDEA ES REUTILIZAR EL FORMULARIO TANTO PARA CREAR COMO PARA ACTUALIZAR UN PRODUCTO
//LA DIFERENCIA ESTÁ ENTRE LOS URL PARAMS QUE SE RECIBAN O NO

//SI SE RECIBEN URL PARAMS, ES PARA ACTUALIZAR => HAY QUE RELLENAR LOS CAMPOS, HACIENDO FETCH POR ID

//EN SUBMIT SI ES ACTUALIZAR EL FETCH POST DEBE LLAMAR AL ENDPOINT CON /id

import {URL_API_CATEGORIAS,
        URL_API_PRODUCTOS, 
        traerDatosDeAPI,
        enviarDatosAApi } from "./funcionesFetch.js";

//Es buena práctica esperar a que se cargue la página para traer cosas
document.addEventListener("DOMContentLoaded",poblarSelectorCategorias);

//Capturar el formulario y agregar eventListener
const formulario = document.getElementById("formulario-producto");
formulario.addEventListener("submit", enviarDatosProducto)

//Capturar los id de los campos del formulario
const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const inputPrecio = document.getElementById("precio");
const inputUrlImagen = document.getElementById("urlImagen");
const inputCategorias = document.getElementById("categorias") //ESTO ESTA REPETIDO 🦜🦜🦜


//Parsear la URL para ver si vienen parámetros
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");

//Tanto el method de fetch como la URL del endpoint dependen de si vino el ulr param id
const METODO = (!idProducto) ? "POST" : "PUT";
const ENDPOINT = (!idProducto) ? URL_API_PRODUCTOS : `${URL_API_PRODUCTOS}/${idProducto}`;

//El título de la página es dinámico, dependiendo si es creación o edición
document.getElementById("titulo").innerText = (!idProducto) ? "Completa todos los datos para crear un nuevo producto"
                                                            : "Modifique los datos para editar el producto"

//Si hay id pasado como parámetro,hay que pre-rellenar los campos del formulario
if(METODO == "PUT"){
    rellenarCampos();
}

//Si no hay id pasado como parámetro, el formulario es para crear un producto desde cero
//no hay que pre-rellenar los campos del formulario ni hacer fetch


// ************************ FUNCIONES AUXILIARES ************************
//=========================================================================

async function rellenarCampos() {
    //Hacer fetch
    const datosProducto = await traerDatosDeAPI(ENDPOINT);
    inputNombre.value = datosProducto.nombre;
    inputDescripcion.value = datosProducto.descripcion;
    inputPrecio.value = datosProducto.precio;
    inputUrlImagen.value = datosProducto.urlImagen;
    inputCategorias.value = datosProducto.categoria.id; // NO LO TOMA CORRECTAMENTE ojo como viene el dato de la API! 🦗🦗🦗🤯🤯🤯
}

//Hay que hacer fetch de la api de categorías para poblar el selector
async function poblarSelectorCategorias(){
    const selectorCategorias = document.getElementById("categorias");

    const dataCategorias = await traerDatosDeAPI(URL_API_CATEGORIAS);

    console.log(dataCategorias)

    dataCategorias.forEach(categoria => {
        selectorCategorias.options.add(new Option(categoria.nombre, categoria.id))
    });

}

//La función para enviar los datos
async function enviarDatosProducto(event, metodo, endpoint){
    event.preventDefault();

    //Capturar los valores de los campos del formulario
    
    const nombre = inputNombre.value;
    const descripcion = inputDescripcion.value;
    const precio = inputPrecio.value;
    const urlImagen = inputUrlImagen.value;
    const idCategoria = inputCategorias.value;

    //DEBUG 🦗🦗🦗🦗🦗
    console.log(nombre, descripcion, precio, urlImagen, idCategoria);

    //Se consideran obligatorios el nombre, el precio y la categoria
    if(!nombre || isNaN(precio) || isNaN(idCategoria)){
        alert("Nombre, precio y categoría son cambios obligatorios!")
        return
    }

    //Crear un objeto para enviar
    const producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio:precio,
        urlImagen: urlImagen,
        idCategoria: idCategoria
    }

    //fetch con POST request
    const respuesta = await enviarDatosAApi(ENDPOINT, producto, METODO)

    //Alert (El texto debe ser condicional a crear o modificar)
    const textoMsj = (METODO == "POST") ? `Se ha creado el producto ${respuesta.nombre} con id ${respuesta.id} correctamente`
                                        : `Se ha modificado el producto ${respuesta.nombre} con id ${respuesta.id} correctamente`
    CoolAlert.show({
        icon: "success",
        title: "Todo salió bien",
        text: textoMsj
    });

    //Ahora si, limpiar el formulario
    formulario.reset()
}
