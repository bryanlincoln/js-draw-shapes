class View {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.novo_botao = document.getElementById("novo_botao")
        this.novo_form = document.getElementById("novo_form")
        this.cancela_novo_botao = document.getElementById("cancela_novo")
        this.form_posicao = document.getElementById("form_pos")
        this.form_tamanho = document.getElementById("form_tam")
        this.desenho = null

        window.dragMoveListener = function(event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
            // translate the element
            target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
        
            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            view.atualiza_dados([x, y], [target.style.width, target.style.height])
        }
    }

    atualiza_dados(pos, tam) {
        this.form_posicao.value = "[" + pos[0] + ", " + pos[1] + "]"
        this.form_tamanho.value = "[" + tam[0] + ", " + tam[1] + "]"

        controller.atualiza_dados(pos, tam)
    }

    mostra_novo_botao() {
        this.novo_botao.style.display = "inline"
    }
    esconde_novo_botao() {
        this.novo_botao.style.display = "none"
    }

    mostra_novo_form() {
        this.novo_form.style.display = "block"
    }
    esconde_novo_form() {
        this.novo_form.style.display = "none"
    }

    mostra_cancela_novo() {
        this.cancela_novo_botao.style.display = "inline"
    }
    esconde_cancela_novo() {
        this.cancela_novo_botao.style.display = "none"
    }

    cria_desenho() {
        this.esconde_novo_botao()
        this.mostra_novo_form()
        this.mostra_cancela_novo()

        this.desenho = document.createElement("div")
        canvas.appendChild(this.desenho)
        interact(this.desenho).draggable({
            onmove: window.dragMoveListener,
            restrict: {
              restriction: 'parent',
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
          }).resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
        
            // keep the edges inside the parent
            restrictEdges: {
              outer: 'parent',
              endOnly: true,
            },
        
            // minimum size
            restrictSize: {
              min: { width: 10, height: 10 },
            }, 
        
            inertia: false,
          }).on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);
        
            if(target.className == "Quadrado") {
                event.rect.width = event.rect.height
            }

            // update the element's style
            target.style.width  = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'
        
            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
        
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            view.atualiza_dados([x, y], [target.style.width, target.style.height])
          });

        this.desenho.setAttribute('data-x', 0);
        this.desenho.setAttribute('data-y', 0);
    }
    apaga_desenho() {
        view.mostra_novo_botao()
        view.esconde_novo_form()
        view.esconde_cancela_novo()

        this.desenho.remove()
        this.desenho = null
    }

    mostra_desenho(forma, cor, pos, tamanho) {
        this.desenho.className = forma
        this.desenho.style.background = cor
        this.desenho.style.width = tamanho[0]
        this.desenho.style.height = tamanho[1]
        this.desenho.style.boxShadow = "-2px 2px 5px " + cor + "6"

        if(forma == "Quadrado") {
            this.desenho.style.width = this.desenho.style.height
        }

        view.atualiza_dados([this.desenho.getAttribute("data-x"), this.desenho.getAttribute("data-y")] , [this.desenho.style.width, this.desenho.style.height])
    }

    lista_desenhos(desenhos) {
        var linhas = "";

        for(var i = 0; i < desenhos.length; i++) {
            linhas += "<p>" + desenhos[i].nome + " <span style='color:" + desenhos[i].cor + 
                "'>" + (desenhos[i].cor == "#f00" ? "vermelho" : "azul") + "</span> ["
                + desenhos[i].tamanho + "] em (" + desenhos[i].posicao + ")</p>"
        }

        if(linhas != "") {
            document.getElementById("listcontainer").innerHTML = linhas
        }
    }
}