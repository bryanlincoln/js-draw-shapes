class Controller {
    constructor () {
        this.reseta_desenho()
    }

    novo_desenho() {
        view.cria_desenho()
        view.mostra_desenho(this.desenho_forma, this.desenho_cor, this.desenho_posicao, this.desenho_tamanho)
    }
    cancela_novo() {
        view.apaga_desenho()
        this.reseta_desenho()
    }

    salva_desenho() {
        model.salva_desenho(this.desenho_forma, this.desenho_cor, this.desenho_tamanho, this.desenho_posicao)
        this.cancela_novo()
        view.lista_desenhos(model.lista_desenhos())
        return false
    }
    reseta_desenho() {
        this.desenho_forma = "Quadrado"
        this.desenho_cor = "#f00"
        this.desenho_posicao = [0, 0]
        this.desenho_tamanho = [50, 50]
    }
    lista_desenhos() {
        view.lista_desenhos(model.lista_desenhos())
        return false
    }

    muda_forma(forma) {
        this.desenho_forma = forma
        view.mostra_desenho(this.desenho_forma, this.desenho_cor, this.desenho_posicao, this.desenho_tamanho)
    }
    muda_cor(cor) {
        this.desenho_cor = cor
        view.mostra_desenho(this.desenho_forma, this.desenho_cor, this.desenho_posicao, this.desenho_tamanho)
    }
    atualiza_dados(pos, tam) {
        this.desenho_posicao = pos
        this.desenho_tamanho = tam
    }
}