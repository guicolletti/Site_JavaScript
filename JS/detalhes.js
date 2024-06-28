function buscarImovel() {
    const URLpagina = window.location.href
    const id = URLpagina.split("=")[1]
    const imv_detalhe = buscarImovelPorId(id)
    atualizarImovel(imv_detalhe)
    foto(imv_detalhe)
}

function atualizarImovel(imovel) {
    
    const imgImv = document.getElementById("img")
    imgImv.setAttribute("src", imovel.url_foto)

    const nomImv = document.getElementById("head")
    nomImv.setAttribute("src", imovel.nome)
    nomImv.textContent = imovel.nome

    const cidade_estadoImv = document.getElementById("local")
    cidade_estadoImv.setAttribute("src", `${imovel.cidade}, ${imovel.estado}`)
    cidade_estadoImv.textContent = `${imovel.cidade}, ${imovel.estado}`

    const adicionais = imovel.adicionais
    const UL = document.getElementById("lista-adicionais")

    if (adicionais.length == 0) {

        const li = document.createElement("li")
        li.textContent = "Sem adicionais para o imóvel"
        UL.appendChild(li)

    } else {
        
        for (let i = 0; i < adicionais.length; i++) {
        const adicional = adicionais[i]
        const chave = adicional.chave
        const valor = adicional.valor

        const li = document.createElement("li")
        li.textContent = `${chave}: ${valor}`
        UL.appendChild(li)

        }
    }

}