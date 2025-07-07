/*
Variaveis - Um pedacinho de memória do computador que eu posso guardar o que eu quizer.

Funções - É um pedacinho de código que, so executa quando e chamado. 

document = HTML
querySelector - Buscar alguem no HTML

fetch - ferramenta para se comunicar com algo fora do código

/* 
1 - Decobrir quando o botão foi clicado [X]
2 - pegar o que foi escrito no ipunt [X]
3 - Enviar para o N8N [X]
4 - Receber o que o N8N respondeu [X]
5 - Colocar na tela o que ele respondeu [X]
*/

let webhook = "https://davidmartins22.app.n8n.cloud/webhook/animacao-css"

// função assincrona
async function cliqueiNoBotao() {
    let textoInput = document.querySelector(".input-animacao").value;
    let codigo = document.querySelector(".area-codigo");
    let areaResultado = document.querySelector(".area-resultado");

    let botao = document.querySelector(".botao-magica");
    botao.disabled = true;
    botao.textContent = "Criando...";
    botao.style.background = "#888";

    // fecth -1) O endereço 2) Configurações 3) Os dados
    // JSON - o formato de dados que usamos na internet

    let resposta = await fetch(webhook, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({pergunta: textoInput})
    });

    let resultado = await resposta.json();

    let info = JSON.parse(resultado.resposta);

    console.log(info);
    
    codigo.innerHTML = info.code;
    areaResultado.innerHTML = info.preview;

    document.head.insertAdjacentHTML('beforeend', "<style>"+info.style+"</style>");

    botao.disabled = false;
    botao.textContent = "Criar Mágica ✨"
    botao.style.background = "#37E359";
}