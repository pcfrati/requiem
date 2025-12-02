const palavras = [
    { original: "Fragmentos", anagrama: "soganFretm" },
    { original: "do", anagrama: "od" },
    { original: "mundo", anagrama: "odmnu" },
    { original: "ainda", anagrama: "aidan" },
    { original: "ecoam", anagrama: "moeca" },
];

let indice = 0;
let fraseFinal = [];

const anagramaEl = document.getElementById("anagrama");
const respostaEl = document.getElementById("resposta");
const fraseEl = document.getElementById("frase");
const continueBtn = document.getElementById("continueBtn");
const recompensaScreen = document.getElementById("recompensaScreen");
const confirmBtn = document.getElementById("confirmBtn");

respostaEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarResposta();
    }
});

function mostrarAnagrama() {
    anagramaEl.textContent = palavras[indice].anagrama.toUpperCase();
    respostaEl.value = "";
    respostaEl.placeholder = "Resposta (" + palavras[indice].original.length + " letras)";
    respostaEl.focus();
}

function verificarResposta() {
    const resposta = respostaEl.value.trim().toLowerCase();
    const correta = palavras[indice].original.toLowerCase();

    if (resposta === correta) {
        respostaEl.style.backgroundColor = "transparent";
        fraseFinal.push(palavras[indice].original);
        indice++;
        if (indice < palavras.length) {
            mostrarAnagrama();
        } else {
            document.querySelector(".caixa").style.display = "none";
            mostrarFraseComTyping(" " + fraseFinal.join(" "), fraseEl);
            continueBtn.style.display = "block";
        }
    } else {
        respostaEl.style.backgroundColor = "#FF0000";
    }
}

function mostrarFraseComTyping(texto, elemento, velocidade = 50) {
    elemento.innerHTML = "";
    let i = 0;
    function digitar() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        }
    }
    digitar();
}

// Event listener para o botão "Pegar recompensa"
continueBtn.addEventListener("click", () => {
    // Esconde a tela do jogo e mostra a tela de recompensa
    document.querySelector('.telajogo').style.display = 'none';
    recompensaScreen.style.display = 'flex';
});

// Event listener para o botão "ok" da tela de recompensa
confirmBtn.addEventListener("click", () => {
    // Aqui você pode adicionar a lógica para continuar o jogo
    // Por exemplo: voltar para o mapa principal ou próxima fase
    console.log("Recompensa confirmada!");
    // window.location.href = "proxima_fase.html"; // Descomente se quiser redirecionar
});

mostrarAnagrama();