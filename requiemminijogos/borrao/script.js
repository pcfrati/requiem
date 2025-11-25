    // Configuração do jogo
    const correctSequence = [3, 9, 1, 7];
    
    const eyePositions = [
      { id: 1, top: '20%', left: '15%' },
      { id: 2, top: '20%', left: '38%' },
      { id: 3, top: '20%', left: '62%' },
      { id: 4, top: '20%', left: '85%' },
      { id: 5, top: '50%', left: '15%' },
      { id: 6, top: '50%', left: '38%' },
      { id: 7, top: '50%', left: '62%' },
      { id: 8, top: '50%', left: '85%' },
      { id: 9, top: '80%', left: '15%' },
      { id: 10, top: '80%', left: '38%' },
      { id: 11, top: '80%', left: '62%' },
      { id: 12, top: '80%', left: '85%' },
    ];

    // Estado do jogo
    let clickedSequence = [];
    let gameWon = false;

    // Elementos DOM
    const gameCanvas = document.getElementById('gameCanvas');
    const gifContainer = document.getElementById('gifContainer');
    const gameTitle = document.getElementById('gameTitle');
    const progressBar = document.getElementById('progressBar');
    const hintBtn = document.getElementById('hintBtn');
    const resetBtn = document.getElementById('resetBtn');
    const rewardBtn = document.getElementById('rewardBtn');
    const hintBox = document.getElementById('hintBox');
    const sequenceLength = document.getElementById('sequenceLength');

    // Inicializar jogo
    function initGame() {
      createEyes();
      createProgressBar();
      sequenceLength.textContent = correctSequence.length;
    }

    // Criar olhos
    function createEyes() {
      eyePositions.forEach(pos => {
        const eye = document.createElement('div');
        eye.className = 'eye';
        eye.dataset.id = pos.id;
        eye.style.top = pos.top;
        eye.style.left = pos.left;
        
        eye.innerHTML = `
          <div class="eye-outer">
            <div class="eye-pupil">
              <div class="eye-shine"></div>
            </div>
          </div>
        `;
        
        eye.addEventListener('click', () => handleEyeClick(pos.id, eye));
        gameCanvas.appendChild(eye);
      });
    }

    // Criar barra de progresso
    function createProgressBar() {
      correctSequence.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.dataset.index = index;
        progressBar.appendChild(dot);
      });
    }

    // Handle click no olho
    function handleEyeClick(eyeId, eyeElement) {
      if (gameWon) return;
      
      clickedSequence.push(eyeId);
      
      // Adicionar classe clicked
      eyeElement.classList.add('clicked');
      
      // Adicionar número da sequência
      const numberBadge = document.createElement('div');
      numberBadge.className = 'sequence-number';
      numberBadge.textContent = clickedSequence.length;
      eyeElement.appendChild(numberBadge);
      
      // Atualizar barra de progresso
      updateProgressBar();
      
      // Verificar se está correto
      const isCorrectSoFar = clickedSequence.every((id, index) => id === correctSequence[index]);
      
      if (!isCorrectSoFar) {
        // Sequência errada - resetar
        setTimeout(() => {
          resetSequence();
        }, 500);
        return;
      }
      
      // Verificar vitória
      if (clickedSequence.length === correctSequence.length) {
        winGame();
      }
    }

    // Atualizar barra de progresso
    function updateProgressBar() {
      const dots = progressBar.querySelectorAll('.progress-dot');
      dots.forEach((dot, index) => {
        if (index < clickedSequence.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    // Resetar sequência
    function resetSequence() {
      clickedSequence = [];
      
      // Remover classes e badges
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach(eye => {
        eye.classList.remove('clicked');
        const badge = eye.querySelector('.sequence-number');
        if (badge) badge.remove();
      });
      
      updateProgressBar();
    }

    // Ganhar jogo
    function winGame() {
      gameWon = true;
      gameTitle.textContent = 'SEQUÊNCIA CORRETA!';
      
      // Esconder canvas, mostrar GIF
      gameCanvas.classList.add('hidden');
      gifContainer.classList.remove('hidden');
      
      // Trocar botões
      hintBtn.classList.add('hidden');
      resetBtn.classList.remove('hidden');
      rewardBtn.classList.remove('hidden');
      hintBox.classList.add('hidden');
    }

    // Resetar jogo completo
    function resetGame() {
      gameWon = false;
      clickedSequence = [];
      
      gameTitle.textContent = 'Clique nos olhos na ordem certa';
      
      // Mostrar canvas, esconder GIF
      gameCanvas.classList.remove('hidden');
      gifContainer.classList.add('hidden');
      
      // Trocar botões
      hintBtn.classList.remove('hidden');
      resetBtn.classList.add('hidden');
      rewardBtn.classList.add('hidden');
      
      // Limpar olhos
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach(eye => eye.remove());
      
      // Recriar jogo
      createEyes();
      updateProgressBar();
    }

    // Event listeners
    hintBtn.addEventListener('click', () => {
      hintBox.classList.toggle('hidden');
      hintBtn.textContent = hintBox.classList.contains('hidden') ? 'Mostrar dica' : 'Esconder dica';
    });

    resetBtn.addEventListener('click', resetGame);

    rewardBtn.addEventListener('click', () => {
      window.location.href = 'recompensa.html';
    });

    // Iniciar jogo quando carregar
    initGame();