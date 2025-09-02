const URL_WEBAPP = "https://script.google.com/macros/s/AKfycbxj2mGHisAFzpGGPNRQN6r0gCh1FbzgkB_cxWXpaFdNKjpTC1tsE8Yj4Gu8iL1w3CbeXQ/exec";

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}

async function melhorarTexto() {
  const textoOriginal = document.getElementById("texto").value;

  try {
    const resposta = await fetch(URL_WEBAPP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: textoOriginal })
    });

    const dados = await resposta.json();
    document.getElementById("textoMelhorado").innerText = dados.textoMelhorado || "Erro ao processar resposta.";
    document.getElementById("resultado").style.display = "block";

  } catch (erro) {
    document.getElementById("textoMelhorado").innerText = "Erro ao melhorar texto: " + erro.message;
    document.getElementById("resultado").style.display = "block";
  }
}
