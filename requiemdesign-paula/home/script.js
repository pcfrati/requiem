const botaoImagem = document.querySelector('.botao-imagem img');
botaoImagem.addEventListener('mouseenter', () => {
  botaoImagem.src = 'https://i.ibb.co/v4KYWQhH/placa-hover.png';
});
botaoImagem.addEventListener('mouseleave', () => {
  botaoImagem.src = 'https://i.ibb.co/KjWVrFkZ/placa.png';
});

const botao2Imagem = document.querySelector('.botao2 img');
botao2Imagem.addEventListener('mouseenter', () => {
  botao2Imagem.src = 'https://i.ibb.co/nSKmqrz/btn2-hover.png';
});
botao2Imagem.addEventListener('mouseleave', () => {
  botao2Imagem.src = 'https://i.ibb.co/jPfNsDJx/btn.png';
});

const botao3Imagem = document.querySelector('.botao img');
botao3Imagem.addEventListener('mouseenter', () => {
  botao3Imagem.src = 'https://i.ibb.co/RpPpzqtK/btn-hover.png';
});
botao3Imagem.addEventListener('mouseleave', () => {
  botao3Imagem.src = 'https://i.ibb.co/p6RNrrZL/btn2.png';
});




// Configurar áudio WAV
const audio = document.getElementById('backgroundMusic');
let audioStarted = false;

// Função para iniciar áudio
function startAudio() {
  if (!audioStarted) {
    audio.play().then(() => {
      console.log('Áudio WAV iniciado com sucesso');
      audioStarted = true;
    }).catch(e => {
      console.log('Erro ao reproduzir WAV:', e);
    });
  }
}

// Iniciar áudio na primeira interação do usuário
document.addEventListener('click', startAudio, { once: true });
document.addEventListener('keydown', startAudio, { once: true });

// Também pode iniciar quando interagir com os botões existentes
document.querySelectorAll('.botao-imagem, .botao, .botao2').forEach(botao => {
  botao.addEventListener('click', startAudio);
});