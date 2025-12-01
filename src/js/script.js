/*
Variáveis - Um pedacinho de memória do compuatador que eu posso guardar o que eu quiser.

funções - É um pedacinho de código que, só executa quando e chamado.

fetch - ferramenta para se comunica com algum fora do meu código

document = HTML
window = JavaScript
*/

/*
1 - descobrir quando o botão foi clicado [X]
2 - pegar o que foi escrito no input [X]
3 - enviar para o n8n 
4 - receber o que o n8n respondeu
5 - colocar na tela o que o n8n respondeu
*/

let webhook = "http://localhost:5678/webhook/animacao-css"

async function cliqueiNoBotao() {
    let textoInput = document.querySelector(".input-animacao").value

    let resposta = await fetch(webhook, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            pergunta: textoInput
        })
    }) 

    let resultado = await resposta.json() 

    let info = JSON.parse(resultado.resposta)

    console.log(info);
    

    
}