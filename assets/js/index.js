import {imprimirArticulos} from "./module/funciones.js"
let $contenedor = document.getElementById( 'contenedor-personajes' )
const url = 'https://valorant-api.com/v1/agents'
let favoritos = JSON.parse( localStorage.getItem( "favoritos" ) ) ?? []

fetch( url )
    .then( response => response.json() )
    .then( datos => {
        imprimirArticulos(  favoritos, $contenedor )
    } )
    .catch( err => console.log(err) )