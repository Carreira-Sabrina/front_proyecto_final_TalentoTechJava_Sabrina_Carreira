//Decidí agrupar todas las funciones y constantes para hacer fetch y exportarlas

//Constantes de URL de la api
export const URL_API_CATEGORIAS = "http://localhost:8080/api/categoria";
export const URL_API_PRODUCTOS = "http://localhost:8080/api/producto";

//Se puede importar desde cualquier archivo js para no tener que reescribir la funcion
export async function traerDatosDeAPI(URL) {
    try {
        const respuestaApi = await fetch(URL);
        const respuestaApiJson = await respuestaApi.json();
        return respuestaApiJson;
    } catch (error) {
        console.log("Ha ocurrido un error con la API " + error);
    }
}


//Se puede reutilizar para actualizar con el argumento metodo (metodo: "POST" o "PUT")
export async function enviarDatosAApi(URL, datosAEnviar,metodo) {
    try {
        const respuestaApi = await fetch(URL, {
            method: metodo,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosAEnviar)
        });

        if(!respuestaApi.ok){
            throw new Error("Ha ocurrido un error con el status code " + respuestaApi.status);
        }

        //Pasar la respuesta a json
        const respuestaApiJson = await respuestaApi.json();
        return respuestaApiJson;

    } catch (error) {
        console.log("*** Hubo un error al enviar los datos ***")
        console.log(error)
        alert("No se pudieron enviar los datos del elemento correctamente");
    }
    
}

//Decidí crear una función aparte para DELETE porque el backend no devuelve nada 🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️
export async function eliminarDatosApi(URL, datoABorrar){
    try {
        const respuestaApi = await fetch(URL, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datoABorrar)
        });
        if (!respuestaApi.ok) {
            throw new Error(`Borrado fallido: ${respuestaApi.status}`);
        }
        
    } catch (error) {
        console.log("*** Hubo un error al enviar los datos ***")
        console.log(error)
        alert("No se pudo eliminar el elemento correctamente");
    }
}
