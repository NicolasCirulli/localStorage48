import {imprimirArticulos, imprimirOptions, filtroCruzado} from './module/funciones.js'
// referencias
const $contenedor = document.getElementById( 'contenedor-personajes' )
const $select = document.getElementById( 'select-js' )
const $inputBusqueda = document.getElementById( 'busqueda-js' )

let agentes = []
let favoritos =  JSON.parse( localStorage.getItem( "favoritos" ) ) || []
// peticion
const url = 'https://valorant-api.com/v1/agents'
fetch( url )
    .then( response => response.json() )
    .then( datos => {
        agentes = datos.data.filter( agente => agente.isPlayableCharacter )
        const arrayRoles = [ ...new Set( agentes.map( agente => agente.role.displayName ) ) ]
        imprimirOptions( arrayRoles, $select  )
        imprimirArticulos( agentes, $contenedor )
    } )
    .catch( err => console.log(err) )


// datos
const funcionEvento = () => {
    const agentesFiltrados = filtroCruzado( agentes, $select.value, $inputBusqueda.value )
    imprimirArticulos( agentesFiltrados, $contenedor )
} 

const funcionEventoDos = ( event ) => {
    const uuid = event.target.dataset.uuid
    if( uuid ){
        event.target.classList.toggle( "text-danger" ) 

        const bool = favoritos.some( agente => agente.uuid == uuid )

        if( bool ){
            favoritos = favoritos.filter( agente => agente.uuid != uuid )
        }else{
            const aux = agentes.find( agente => agente.uuid == uuid )
            favoritos.push( aux )
        }

        localStorage.setItem( "favoritos", JSON.stringify( favoritos ) )
        console.log( favoritos )
    }
}

// eventos
$select.addEventListener( 'change', funcionEvento )
$inputBusqueda.addEventListener( 'input', funcionEvento )
$contenedor.addEventListener( "click", funcionEventoDos )































// ejemplo con nodos
/* function imprimirNodos( arrayPersonajes, elementoHTML ){
    const $fragment = document.createDocumentFragment()
    for (const personaje of arrayPersonajes) {
        $fragment.appendChild(  crearNodoArticle( personaje )  )
    }
    elementoHTML.appendChild( $fragment )
}

function crearNodoArticle(agente){
    // crear el nodo article
    const $article = document.createElement('article')
    // agregarle las clases
    $article.className = "card border-primary col-11 col-md-6 col-xl-3"

    // crear el nodo img
    const $imagen = document.createElement('img')
    // modifico el atributo src
    $imagen.src = agente.bustPortrait
    // agregarle la clase
    $imagen.classList.add( 'card-img-top' )
    // agregarle el alt
    $imagen.alt = `Imagen de ${agente.displayName}`

    const $div = document.createElement('div')
    
    $div.className = "card-body"
    
    const $h4 = document.createElement('h4')
    
    $h4.className = "card-title"
    $h4.textContent = agente.displayName
    
    const $p = document.createElement('p')
    $p.className = "card-text"
    $p.textContent = agente.description
    
    $div.append( $h4, $p )
    
    $article.append( $imagen, $div )
    
    return $article
} */