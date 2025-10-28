const menu = document.getElementById('menu');
const gameScreen = document.getElementById('gameScreen');
const botoesLateral = document.getElementById('botoes-lateral');

// Botões da lateral
const abrirLateral = document.getElementById('botao-verde-lateral');
const fecharLateral = document.getElementById('botao-vermelho-lateral');

// Botões dentro do menu
const abrirMenu = document.getElementById('botao-verde-menu');
const fecharMenu = document.getElementById('botao-vermelho-menu');

function abrir() {
  menu.classList.add('open');
  gameScreen.classList.add('menu-open');
  botoesLateral.classList.add('hidden');
}

function fechar() {
  menu.classList.remove('open');
  gameScreen.classList.remove('menu-open');
  botoesLateral.classList.remove('hidden');
}

// Ações dos botões
abrirLateral.addEventListener('click', abrir);
fecharLateral.addEventListener('click', fechar);
abrirMenu.addEventListener('click', abrir);
fecharMenu.addEventListener('click', fechar);

// Prevenção do F11