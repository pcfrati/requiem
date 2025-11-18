const menu = document.getElementById('menu');
const gameScreen = document.getElementById('gameScreen1');
const botoesLateral = document.getElementById('botoes-lateral');
const bottomContainer = document.getElementById('bottomContainer'); // Nova referência

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
  bottomContainer.classList.add('hidden'); // Esconde o container inferior
}

function fechar() {
  menu.classList.remove('open');
  gameScreen.classList.remove('menu-open');
  botoesLateral.classList.remove('hidden');
  bottomContainer.classList.remove('hidden'); // Mostra o container inferior
}

// Ações dos botões
abrirLateral.addEventListener('click', abrir);
fecharLateral.addEventListener('click', fechar);
abrirMenu.addEventListener('click', abrir);
fecharMenu.addEventListener('click', fechar);

botaoCruz.addEventListener('click', function() {
  this.classList.toggle('ativo');
  
  // Se quiser que o botão cruz também controle o container inferior
  // bottomContainer.classList.toggle('hidden');
  
  console.log('Botão cruz clicado!');
});