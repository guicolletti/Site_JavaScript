let imoveis = buscarTodosImoveis()

if (window.localStorage.getItem("lista") == null) {
    window.localStorage.setItem("lista", JSON.stringify(imoveis))
} else {
    imoveis = JSON.parse(window.localStorage.getItem("lista"))
}

function criarimovelHTML(imovel) {
    const section = document.createElement("section")
    section.setAttribute("class", "listing")

    const img = document.createElement("img")
    img.setAttribute("class", "listing-photo")
    img.setAttribute("src", imovel.url_foto)

    section.appendChild(img)

    const h2 = document.createElement("h2")
    h2.setAttribute("class", "listing-heading")
    h2.textContent = imovel.nome

    section.appendChild(h2)

    const p = document.createElement("p")
    p.setAttribute("class", "listing-location")
    p.textContent = `${imovel.cidade}, ${imovel.estado}`

    section.appendChild(p)

    const a = document.createElement("a")
    a.textContent = "Veja Mais"

    const URL = `detalhes.html?imovelID=${imovel.id}`

    a.setAttribute("href", URL)

    section.appendChild(a)

    const favorito = document.createElement("img")
    const favID = `fav-${imovel.id}`
    favorito.setAttribute("id", favID)

    if (imovel.favorito == true) {
        favorito.setAttribute("src", "IMG/coracao.png")
    } else {
        favorito.setAttribute("src", "IMG/descoracao.png")
    }

    favorito.setAttribute("class", "favorito")
    favorito.setAttribute("onclick", `favoritar(${JSON.stringify(imovel)})`)
    section.appendChild(favorito)

    //Section Pai
    const sectionResults = document.getElementById("lista-imoveis")
    sectionResults.appendChild(section)
}

function filtrar() {
    const pesquisa = document.getElementById("pesquisa").value
    listarImoveisComFiltro(pesquisa)
}

function favoritar(imovel) {

    const favID = `fav-${imovel.id}`
    const fav = document.getElementById(favID)
    const posicaoLista = imovel.id - 1

    if (fav.getAttribute("src") == "IMG/coracao.png") {
        fav.setAttribute("src", "IMG/descoracao.png")
        imoveis[posicaoLista].favorito = false
    } else {
        fav.setAttribute("src", "IMG/coracao.png")
        imoveis[posicaoLista].favorito = true

        window.localStorage.setItem("lista", JSON.stringify(imoveis))
    }
}

function filtrarComEnter(naosei) {
    if (naosei.keyCode == 13) {
        naosei.preventDefault()
        filtrar()
    }
}

function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mostrarFavoritos() {
    limparImoveisComFiltro()

    for (let i = 0; i < imoveis.length; i++) {
        const imovel = imoveis[i];

        if (imovel.favorito == true) {
            criarimovelHTML(imovel)
        }
    }
}

function listarImoveisComFiltro(texto) {

    limparImoveisComFiltro()

    if (texto == "") {

        mostrarTodosOsImoveis()

    } else {

        for (let i = 0; i < imoveis.length; i++) {

            const imovel = imoveis[i]

            const textoM = removerAcentos(texto.toUpperCase())
            const cidadeImovelM = removerAcentos(imovel.cidade.toUpperCase())
            const estadoImovelM = removerAcentos(imovel.estado.toUpperCase())

            if (cidadeImovelM.search(textoM) == 0 ||
                estadoImovelM.search(textoM) == 0) {
                criarimovelHTML(imovel, false)
            }
        }
    }
}

function limparImoveisComFiltro() {
    const sectionResults = document.getElementById("lista-imoveis")
    while (sectionResults.lastElementChild) {
        sectionResults.removeChild(sectionResults.lastElementChild)
    }
}

function mostrarTodosOsImoveis() {
    limparImoveisComFiltro()

    for (let i = 0; i < imoveisDB.length; i++) {
        const imovel = imoveisDB[i]
        criarimovelHTML(imovel)
    }
}

function filtrarPorCasa() {

    const casa = document.getElementById("casa").checked

    if (casa == true) {

        limparImoveisComFiltro()

        for (let i = 0; i < imoveis.length; i++) {
            const coisa = imoveis[i]
            if (coisa.tipo == "true") {
                criarimovelHTML(coisa)
            }
        }

    } else {
        limparImoveisComFiltro()
        mostrarTodosOsImoveis()
    }

    if (document.getElementById("casa").checked == true && document.getElementById("apartamento").checked == true) {
        limparImoveisComFiltro()
        mostrarTodosOsImoveis()
    }
}

function filtrarPorApartamento() {

    const apart = document.getElementById("apartamento").checked

    if (apart == true) {

        limparImoveisComFiltro()

        for (let i = 0; i < imoveis.length; i++) {
            const coisas = imoveis[i]
            if (coisas.tipo == "false") {
                criarimovelHTML(coisas)
            }
        }

    } else {
        limparImoveisComFiltro()
        mostrarTodosOsImoveis()
    }

    if (document.getElementById("casa").checked == true && document.getElementById("apartamento").checked == true) {
        limparImoveisComFiltro()
        mostrarTodosOsImoveis()
    }
}

mostrarTodosOsImoveis()