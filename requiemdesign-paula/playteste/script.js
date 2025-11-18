const menu = document.getElementById('menu');
const gameScreen = document.getElementById('gameScreen1');
const botoesLateral = document.getElementById('botoes-lateral');
const bottomContainer = document.getElementById('bottomContainer');
const imagemMovel = document.querySelector('.imagem-movel');

// Botões da lateral
const abrirLateral = document.getElementById('botao-verde-lateral');
const fecharLateral = document.getElementById('botao-vermelho-lateral');

// Botões dentro do menu
const abrirMenu = document.getElementById('botao-verde-menu');
const fecharMenu = document.getElementById('botao-vermelho-menu');

// Botão cruz
const botaoCruz = document.getElementById('botaoCruz');

function abrir() {
  menu.classList.add('open');
  gameScreen.classList.add('menu-open');
  botoesLateral.classList.add('hidden');
  bottomContainer.classList.add('hidden');
}

function fechar() {
  menu.classList.remove('open');
  gameScreen.classList.remove('menu-open');
  botoesLateral.classList.remove('hidden');
  bottomContainer.classList.remove('hidden');
}

// Função para ativar/desativar o modo cruz
function toggleModoCruz() {
  const estaAtivo = botaoCruz.classList.toggle('ativo');
  
  if (estaAtivo) {
    // Ativa o modo cruz
    gameScreen.classList.add('modo-cruz');
    botoesLateral.classList.add('hidden');
    bottomContainer.classList.add('modo-cruz');
    imagemMovel.classList.add('modo-cruz');
  } else {
    // Desativa o modo cruz
    gameScreen.classList.remove('modo-cruz');
    botoesLateral.classList.remove('hidden');
    bottomContainer.classList.remove('modo-cruz');
    imagemMovel.classList.remove('modo-cruz');
  }
}

// Ações dos botões
abrirLateral.addEventListener('click', abrir);
fecharLateral.addEventListener('click', fechar);
abrirMenu.addEventListener('click', abrir);
fecharMenu.addEventListener('click', fechar);
botaoCruz.addEventListener('click', toggleModoCruz);