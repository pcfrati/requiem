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