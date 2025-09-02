// URL do endpoint correto no backend Flask hospedado no Render
const URL_WEBAPP = "https://relatorioai.onrender.com/melhorar-texto";

// Função principal para melhorar o texto com IA
async function melhorarTexto() {
  const textoOriginal = document.getElementById("texto").value;

  try {
    const resposta = await fetch(URL_WEBAPP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto: textoOriginal })
    });

    // Verifica se a resposta é válida
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    // Tenta interpretar a resposta como JSON
    const dados = await resposta.json();

    // Exibe o resultado ou mensagem de erro
    document.getElementById("textoMelhorado").innerText =
      dados.textoMelhorado || "Erro ao processar resposta.";
    document.getElementById("resultado").style.display = "block";

  } catch (erro) {
    // Exibe erro no frontend
    document.getElementById("textoMelhorado").innerText =
      "Erro ao melhorar texto: " + erro.message;
    document.getElementById("resultado").style.display = "block";
  }
}