import {generarElementoHTMLProducto,generarElementoHTMLCategoria} from "./elementosDinamicos.js"
import { URL_API_CATEGORIAS,URL_API_PRODUCTOS,traerDatosDeAPI } from "./funcionesFetch.js";

//Elementos padre del contenido generado dinámicamente
const contenedorCategorias = document.getElementById("contenedor-categorias");
const contenedorProductos = document.getElementById("contenedor-productos");

//La función para hacer fetch ahora se importa desde otro archivo porque las necesitaba
//también en otras partes

//Qué lindo que es reutilizar código, no necesito crear una función para las categorías y otra
//para los productos, usan la misma 🤡
async function procesarElementosDinamicos(URL, contenerdorDestino, funcionGeneradoraHTLM) {
    //Esperar los datos
    const datosApi = await traerDatosDeAPI(URL);
    //Generar elementos HTML dinámicos
    const elementosHTLMDinamicos = datosApi.map(item =>{
        return funcionGeneradoraHTLM(item)
    })

    //Agregar los elementos generados dinámicamente a su contenedor
    elementosHTLMDinamicos.forEach(elemento => {
        contenerdorDestino.appendChild(elemento)
    });
}


//La función se llama una vez para las categorías y otra para los productos
procesarElementosDinamicos(URL_API_CATEGORIAS,contenedorCategorias,generarElementoHTMLCategoria);
procesarElementosDinamicos(URL_API_PRODUCTOS,contenedorProductos,generarElementoHTMLProducto);




