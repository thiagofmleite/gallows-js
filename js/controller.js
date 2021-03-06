var criaController = function (jogo) {
    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 
    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas)
        });
    };

    // muda o texto do placeHolder do campo de entrada    
    var mudaPlaceHolder = function (texto) {

        $entrada.attr('placeholder', texto);
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    var guardaPalavraSecreta = function () {

        try {
            var palavraSecreta = $entrada.val().trim();
            jogo.setPalavraSecreta(palavraSecreta);
            $entrada.val('');
            mudaPlaceHolder('chuta');
            exibeLacunas();
        } catch (error) {
            alert(error.message);
        }
    };

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    var inicia = function () {
        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta()
                        break;
                    case 2:
                        leChute()
                        break;
                }
            }
        });
    }

    var reinicia = function () {
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('palavra secreta');
    };

    var leChute = function () {
        try {
            var chute = $entrada.val().trim().substr(0, 1);
            jogo.processaChute(chute)
            $entrada.val('');
            exibeLacunas();

            setTimeout(function () {
                if (jogo.ganhouOuPerdeu()) {
                    if (jogo.ganhou()) {
                        alert('Parabéns, você ganhou!');
                    } else if (jogo.perdeu()) {
                        alert('Que pena, tente novamente!')
                    }
                    reinicia();
                }
            }, 200);
        } catch (error) {
            alert(error.message);
        }
    }

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return {
        inicia: inicia
    };
}