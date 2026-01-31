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

let webhook = "http://localhost:5678/webhook/animacao-css";

async function cliqueiNoBotao() {
  const textoInput = document.querySelector(".input-animacao").value;
  const areaCodigo = document.querySelector(".area-codigo");
  const sandbox = document.querySelector(".preview-sandbox");

  if (!textoInput) {
    alert("Descreva uma animação primeiro ✨");
    return;
  }

  areaCodigo.textContent = "🔮 Criando mágica...";
  sandbox.innerHTML = "";

  try {
    const resposta = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pergunta: textoInput,
      }),
    });

    const resultado = await resposta.json();
    console.log("Resposta do n8n:", resultado);

    // ============================
    // 1️⃣ CSS ORIGINAL (para exibir)
    // ============================
    const cssOriginal = resultado.estilo || resultado.style || "";
    areaCodigo.textContent = cssOriginal;

    // ============================
    // 2️⃣ CSS SEGURO (para injetar)
    // ============================
    const cssParaInjetar = cssOriginal.replace(
      /(^|\n)\s*(body|html|\*)\s*\{[\s\S]*?\}/gi,
      ""
    );

    // Remove CSS antigo
    const oldStyle = document.getElementById("css-gerado");
    if (oldStyle) oldStyle.remove();

    // Injeta CSS limpo
    const style = document.createElement("style");
    style.id = "css-gerado";
    style.textContent = cssParaInjetar;
    document.head.appendChild(style);

    // ============================
    // 3️⃣ Renderizar preview
    // ============================
    sandbox.innerHTML =
      resultado.preview || "<div>⚠️ Sem pré-visualização</div>";
  } catch (erro) {
    console.error(erro);
    areaCodigo.textContent = "❌ Erro ao gerar animação.";
    sandbox.innerHTML = "Verifique se o n8n está rodando.";
  }
}
