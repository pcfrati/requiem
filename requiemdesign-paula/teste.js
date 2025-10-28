const botaoImagem = document.querySelector('.botao-imagem img');
botaoImagem.addEventListener('mouseenter', () => {
  botaoImagem.src = 'home/imagens/placa-hover.png';
});
botaoImagem.addEventListener('mouseleave', () => {
  botaoImagem.src = 'home/imagens/placa.png';
});

const botao2Imagem = document.querySelector('.botao2 img');
botao2Imagem.addEventListener('mouseenter', () => {
  botao2Imagem.src = 'home/imagens/btn2-hover.png';
});
botao2Imagem.addEventListener('mouseleave', () => {
  botao2Imagem.src = 'home/imagens/btn.png';
});

const botao3Imagem = document.querySelector('.botao img');
botao3Imagem.addEventListener('mouseenter', () => {
  botao3Imagem.src = 'home/imagens/btn-hover.png';
});
botao3Imagem.addEventListener('mouseleave', () => {
  botao3Imagem.src = 'home/imagens/btn2.png';
});