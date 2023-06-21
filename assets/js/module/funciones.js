export function imprimirArticulos(arrayPersonajes, elementoHTML) {
    if (arrayPersonajes.length === 0) {
        elementoHTML.innerHTML = `<h2> No hay agentes </h2>`;
    } else {
        elementoHTML.innerHTML = arrayPersonajes.reduce(
            (acc, act) => acc + crearArticle(act),
            ""
        );
    }
}
export function crearArticle(agente) {
    let favoritos = JSON.parse( localStorage.getItem( "favoritos" ) ) ?? []
    favoritos = favoritos.find( fav  => fav.uuid == agente.uuid  )
    let href = location.pathname.includes("agentes")
        ? "./details.html"
        : "./pages/details.html";
    const {
        bustPortrait,
        displayName,
        role: { displayName: role },
        description
    } = agente;


    const btn = location.pathname.includes("agentes")
        ? `<i class="bi bi-arrow-through-heart fs-1 ${favoritos ? "text-danger" : ""}" data-uuid="${ agente.uuid}" role="button"></i>`
        : ""
    return `<article class="card border-dark col-11 col-md-6 col-xl-3">
                <img class="card-img-top" src="${bustPortrait}" alt="Title">
                <div class="card-body">
                    <h4 class="card-title">${displayName}</h4>
                    <p class="card-text text-danger">${role}</p>
                    <p class="card-text">${description}</p>
                    ${btn}
                    <a class="btn btn-primary" href="${href}"> Ver mas </a>
                </div>
            </article>
                `;
}
export function imprimirOptions(roles, select) {
    let template = "";
    for (let role of roles) {
        template += `<option value="${role}">${role}</option>`;
    }
    select.innerHTML += template;
}
export function filtrarPorRol(agentes, rol) {
    if (rol == "all") {
        return agentes;
    }
    return agentes.filter((agente) => agente.role.displayName == rol);
}
export function filtrarPorTexto(agentes, texto) {
    return agentes.filter((agente) =>
        agente.displayName.toLowerCase().includes(texto.toLowerCase())
    );
}
export function filtroCruzado(agentes, rol, texto) {
    const filtradosPorRol = filtrarPorRol(agentes, rol);
    const filtradosPorTexto = filtrarPorTexto(filtradosPorRol, texto);
    return filtradosPorTexto;
}
