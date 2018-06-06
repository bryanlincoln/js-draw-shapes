class Desenho {
    constructor(nome, cor, tamanho, posicao) {
        this.cor = cor
        this.tamanho = tamanho
        this.posicao = posicao
        this.nome = nome
    }

    to_string() {
        return this.nome + " [" + this.tamanho + "] " + this.cor + " em " + this.posicao
    }
}

class Model {
    constructor() {
        this.desenhos = []
    }

    salva_desenho(desenho_forma, desenho_cor, desenho_tamanho, desenho_posicao) {
        var novoDesenho = new Desenho(desenho_forma, desenho_cor, desenho_tamanho, desenho_posicao)
        this.desenhos.push(novoDesenho)
    }

    lista_desenhos() {
        return this.desenhos;
    }
}