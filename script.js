const URL_WEBAPP = "https://script.google.com/macros/s/AKfycbxixZvitJULxtn6sMejGM-A1QU3wJ4obqq04RqmzkZPrf0P7zUzSJvHHy8Oohp--GB15g/exec";

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