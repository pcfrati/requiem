const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const btn = document.getElementById("continueBtn");
const gameScreen = document.getElementById("gameScreen");
const recompensaScreen = document.getElementById("recompensaScreen");
const confirmBtn = document.getElementById("confirmBtn");

const imagem = new Image();
imagem.src = "requiemminijogos/borrao/img/zoios.png";

// multiplica por 61 pra gerar um número entre 0 e 60
// isso pq os sliders vao de 0 a 100, e para dificultar coloquei entre 20 e 80
const centro1 = Math.floor(Math.random() * 61) + 20;
const centro2 = Math.floor(Math.random() * 61) + 20;

// espera a imagem carregar, aí coloca os sliders em valores iniciais (10 e 90) e chama a função desenhar() pra mostrar a imagem.
imagem.onload = () => {
  slider1.value = 10;
  slider2.value = 90;
  desenhar();
};

// desenha a imagem e decide se ela vai aparecer embaçada ou nítida, com base na posição dos sliders
let imagemRevelada = false;

function desenhar() {
  const pos1 = parseInt(slider1.value);
  const pos2 = parseInt(slider2.value);

  if (Math.abs(pos1 - centro1) < 5 && Math.abs(pos2 - centro2) < 5) {
    btn.style.display = "inline-block";
    
    if (!imagemRevelada) {
      imagemRevelada = true;
      console.log("Acertou! Mostrando GIF...");
      
      // Remove os event listeners
      slider1.removeEventListener("input", desenhar);
      slider2.removeEventListener("input", desenhar);
      
      // Esconde o canvas e cria uma tag img com o GIF
      canvas.style.display = "none";
      
      const gifElement = document.createElement("img");
      gifElement.src = "requiemminijogos/borrao/img/zoios.gif";
      gifElement.width = 600;
      gifElement.height = 500;
      gifElement.style.border = "2px solid #3233ff";
      gifElement.style.boxShadow = "0 0 20px #3233ff";
      gifElement.style.imageRendering = "pixelated";
      
      // Insere o GIF no lugar do canvas
      canvas.parentNode.insertBefore(gifElement, canvas);
      
      return;
    }
    
  } else if (Math.abs(pos1 - centro1) < 20 && Math.abs(pos2 - centro2) < 20) {
    btn.style.display = "none";
    ctx.filter = "blur(3px)";
  } else {
    btn.style.display = "none";
    ctx.filter = "blur(8px)";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
}

slider1.addEventListener("input", desenhar); // toda vez que você mexe nos sliders, ele redesenha a imagem com outro nível de borrão
slider2.addEventListener("input", desenhar);

btn.addEventListener("click", () => {
  // Esconde a tela do jogo e mostra a tela de recompensa
  gameScreen.style.display = "none";
  recompensaScreen.style.display = "flex";
});

confirmBtn.addEventListener("click", () => {
  // Aqui você pode adicionar qualquer ação adicional quando o botão "ok" for clicado
  console.log("Recompensa confirmada!");
});