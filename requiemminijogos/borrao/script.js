const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const btn = document.getElementById("continueBtn");
const imageContainer = document.querySelector('.image-container');
const recompensaScreen = document.getElementById("recompensaScreen");
const confirmBtn = document.getElementById("confirmBtn");
const telajogo = document.querySelector('.telajogo');

const imagem = new Image();
imagem.src = "https://i.ibb.co/9mbm6DTR/zoios.png";

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
      
      // Esconde o canvas e mostra o GIF
      canvas.style.display = "none";
      document.getElementById("gifRecompensa").style.display = "block";
      
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

// Event listener para o botão "Pegar recompensa"
btn.addEventListener("click", () => {
  // Esconde a tela do jogo e mostra a tela de recompensa
  telajogo.style.display = 'none';
  recompensaScreen.style.display = 'flex';
});

// Event listener para o botão "ok" da tela de recompensa
confirmBtn.addEventListener("click", () => {
  // Aqui você pode adicionar a lógica para continuar o jogo
  // Por exemplo: voltar para o mapa principal ou próxima fase
  console.log("Recompensa confirmada!");
  // window.location.href = "proxima_fase.html"; // Descomente se quiser redirecionar
});

slider1.addEventListener("input", desenhar); // toda vez que você mexe nos sliders, ele redesenha a imagem com outro nível de borrão
slider2.addEventListener("input", desenhar);