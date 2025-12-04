import {    tailwindFlex, 
            tailwindBotonDefault, 
            tailwindFlexColumn } from "./constantesTailwind.js";

import { eliminarDatosApi,URL_API_CATEGORIAS,URL_API_PRODUCTOS } from "./funcionesFetch.js";

//Toma los datos de un producto de una API y devuelve elementos HTML
export function generarElementoHTMLProducto(item){

    const contenedorProducto = document.createElement("article");
    contenedorProducto.classList.add(...tailwindFlexColumn, "justify-between" ,"shadow-md", "shadow-violet-800/20","mb-8");

    const contenidoSuperior = document.createElement("div");
    contenidoSuperior.classList.add("flex"); //🦜🦜🦜🦜
    
    const contenidoSuperiorIzq = document.createElement("div");
    contenidoSuperiorIzq.classList.add(...tailwindFlexColumn,"items-center","gap-4" ,"border-2", "border-indigo-600", "p-4") //🦗🦗🦗🦗

    const nombre = document.createElement("h3");
    nombre.classList.add("text-2xl","font-bold", "text-center");
    nombre.innerText = item.nombre;

    const imagen = document.createElement("img");
    imagen.classList.add("w-40"); //era 64
    //Si no viene una url de imagen se carga un placeholder
    if(!item.urlImagen){
        imagen.src = "assets/no-img.jpg"
    }else{
        imagen.src = item.urlImagen;
    }

    //Guardo el nombre en la imagen en contenidoSuperiorIzq
    contenidoSuperiorIzq.appendChild(nombre);
    contenidoSuperiorIzq.appendChild(imagen);

    const contenidoSuperiorDer = document.createElement("div");
    contenidoSuperiorDer.classList.add("border-2", "border-red-600", "p-4")

    //La categoria
    const categoria = document.createElement("p");
    categoria.innerHTML = "Categoria: " + item.categoria.nombre + " con id " + item.categoria.id;

    const descripcion = document.createElement("p");
    descripcion.innerText = item.descripcion;
    const precio = document.createElement("p");
    precio.innerText = "$ " + item.precio;
    
    contenidoSuperiorDer.appendChild(descripcion);
    contenidoSuperiorDer.appendChild(categoria);
    contenidoSuperiorDer.appendChild(precio);

    //Guardar bloques izquierdo y derecho en superior
    contenidoSuperior.appendChild(contenidoSuperiorIzq);
    contenidoSuperior.appendChild(contenidoSuperiorDer);

    const miniFooter = document.createElement("div");
    //Clases Tailwind
    miniFooter.classList.add(...tailwindFlex, "p-4");

    const botonEditar = document.createElement("button");
    botonEditar.classList.add(...tailwindBotonDefault, "bg-indigo-600");
    botonEditar.textContent = "EDITAR";
    
    botonEditar.addEventListener("click", (e)=>{manejardorClickActualizarProducto(item.id)})

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add(...tailwindBotonDefault, "bg-red-600");    
    botonEliminar.textContent = "BORRAR";

    botonEliminar.addEventListener("click", (e)=>{manejadorClickEliminarProducto(item.id)})

    //Guardar botones en miniFooter
    miniFooter.appendChild(botonEditar);
    miniFooter.appendChild(botonEliminar);

    //Guardar bloques superior e inferior en contenedor general
    contenedorProducto.appendChild(contenidoSuperior);
    contenedorProducto.appendChild(miniFooter);

    return contenedorProducto;
}

export function generarElementoHTMLCategoria(item){

    const contenedorCategoria = document.createElement("article");
    //Clases Tailwind del contenedor
    contenedorCategoria.classList.add(...tailwindFlex,"shadow-md","text-3xl","p-5","mb-4");

    //Vamos a guardar el id para ver como usarlo 🔍🦜
    const idCategoria = item.id;

    const texto = document.createElement("p");
    texto.innerText = "Categoría: " + item.nombre + " id: " + item.id;

    const contenedorBotones = document.createElement("div");

    //Botones editar y eliminar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "EDITAR";
    //Clases Tailwind POR AHORA FALTA HOVER ETC 🦜🦜🦜
    botonEditar.classList.add(...tailwindBotonDefault, "bg-indigo-600","mr-5" )
    botonEditar.addEventListener("click", (e)=>{manejardorClickActualizarCategoria(item.id)})

    const botonEliminar = document.createElement("button");    
    botonEliminar.textContent = "BORRAR";
    //Clases Tailwind POR AHORA FALTA HOVER ETC 🦜🦜🦜
    botonEliminar.classList.add("py-4", "px-5", "rounded-xl", "text-neutral-100", "bg-red-600")
    botonEliminar.addEventListener("click", (e)=>{manejadorClickEliminarCategoria(item.id)})

    //Guardar los botones en su contenedor
    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);

    //Agregar el texto y los botones al contenedor principal
    contenedorCategoria.appendChild(texto);
    contenedorCategoria.appendChild(contenedorBotones);

    return contenedorCategoria;
}


//Funciones para eventListeners de botones creados dinámicamente
//===============================================================

//Botones actualizar producto
function manejardorClickActualizarProducto(id){
    const URLDestino = `formulario-producto.html?id=${id}`
    window.location.href = URLDestino;
}

//Botones borrar producto ESTO PIDE UN ALERT A GRITOS !!!!
function manejadorClickEliminarProducto(id){
    //Alert con diálogo de confirmación con CoolAlert
    CoolAlert.show({
        text: `Se va a borrar el producto con el id ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar producto",
    }).then((result) => {
        if (result.isConfirmed) {
            //El borrado ocurre aqui
            const productoABorrar ={
                id:id
            }
        
        eliminarDatosApi(`${URL_API_PRODUCTOS}/${id}`, productoABorrar)

        CoolAlert.show({icon: "success", text: "El producto ha sido borrado correctamente",showCancelButton: false});
        //Tengo que recargar la pagina para que vuelva a hacer fetch pero no está resultando muy bien 🦗🦗🦗🦗🦗
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    });    
}

//Botones actualizar categoria
function manejardorClickActualizarCategoria(id){
    const URLDestino = `formulario-categoria.html?id=${id}`
    window.location.href = URLDestino;
}

//Botones borrar categoria
function manejadorClickEliminarCategoria(id){
    //Alert con diálogo de confirmación con CoolAlert
    CoolAlert.show({
        text: `Se va a borrar la categoría con el id ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar categoría",
    }).then((result) => {
        if (result.isConfirmed) {
            //El borrado ocurre aqui
            const categoriaABorrar ={
                id:id
            }
        
        eliminarDatosApi(`${URL_API_CATEGORIAS}/${id}`, categoriaABorrar)

        CoolAlert.show({icon: "success", text: "La categoría ha sido borrada correctamente",showCancelButton: false});
        //Tengo que recargar la pagina para que vuelva a hacer fetch pero no está resultando muy bien 🦗🦗🦗🦗🦗
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    });    
}

