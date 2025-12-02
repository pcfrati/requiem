document.addEventListener('DOMContentLoaded', () => {
  const GRID_SIZE = 8;
  const CANVAS_SIZE = 590;
  const CELL = Math.floor(CANVAS_SIZE / GRID_SIZE);
  const playerImages = {
    up1: new Image(),
    up2: new Image(),
    up3: new Image(),
    down1: new Image(),
    down2: new Image(),
    down3: new Image(),
    left1: new Image(),
    left2: new Image(),
    right1: new Image(),
    right2: new Image(),
  };

  playerImages.up1.src = 'https://i.ibb.co/fdd3XJQB/cima.png';
  playerImages.up2.src = 'https://i.ibb.co/ccxgC1vN/cima2.png';
  playerImages.up3.src = 'https://i.ibb.co/hRkM1d6t/cima3.png';
  playerImages.down1.src = 'https://i.ibb.co/0Vz34NkD/baixo.png';
  playerImages.down2.src = 'https://i.ibb.co/ZRVRVxvd/baixo2.png';
  playerImages.down3.src = 'https://i.ibb.co/mjqzNXk/baixo3.png';
  playerImages.left1.src = 'https://i.ibb.co/Dfc1bt80/esquerda.png';
  playerImages.left2.src = 'https://i.ibb.co/KpkvVQgq/esquerda2.png';
  playerImages.right1.src = 'https://i.ibb.co/5X8wq0pp/direita.png';
  playerImages.right2.src = 'https://i.ibb.co/gZgXYJD4/direita2.png';

  const MAZE_LAYOUT = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 2, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let playerDirection = 'down1';
  let player = { x: 1, y: 1 };
  let gameWon = false;
  let showHint = false;
  let stepState = 0;
  let showVictoryFlash = false; // Para o efeito de brilho

  const canvas = document.getElementById('mazeCanvas');
  if (!canvas) {
    console.error('Canvas não encontrado: verifique se existe <canvas id="mazeCanvas">');
    return;
  }
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const overlay = document.getElementById('overlay');
  const continueBtn = document.getElementById('continueBtn');
  const upBtn = document.getElementById('upBtn');
  const downBtn = document.getElementById('downBtn');
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');
  const resetBtn = document.getElementById('resetBtn');
  const messageEl = document.getElementById('message');

  function showMessage(text, color = 'lime', duration = 1400) {
    if (!messageEl) { console.log(text); return; }
    messageEl.textContent = text;
    messageEl.style.color = color;
    messageEl.style.opacity = '1';
    clearTimeout(showMessage._t);
    showMessage._t = setTimeout(() => {
      messageEl.style.opacity = '0';
      setTimeout(() => { messageEl.textContent = ''; messageEl.style.opacity = '1'; }, 300);
    }, duration);
  }

  function loadImages(images, callback) {
    let loaded = 0;
    let failed = 0;
    const total = Object.keys(images).length;
    
    for (let key in images) {
      images[key].onload = () => {
        loaded++;
        console.log(`✅ Imagem carregada: ${key} (${loaded}/${total})`);
        if (loaded + failed === total) {
          console.log(`🎉 Todas as imagens processadas! (${loaded} carregadas, ${failed} falharam)`);
          callback();
        }
      };
      images[key].onerror = () => {
        failed++;
        console.error(`❌ Erro ao carregar imagem: ${images[key].src}`);
        if (loaded + failed === total) {
          console.log(`⚠️ Processamento completo com erros (${loaded} carregadas, ${failed} falharam)`);
          callback();
        }
      };
    }
  }

  function canMoveTo(x, y) {
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return false;
    return MAZE_LAYOUT[y][x] !== 1;
  }

  function move(dx, dy) {
    if (gameWon) return;

    const nx = player.x + dx;
    const ny = player.y + dy;

    // Atualizar a direção do personagem
    if (dy === -1) {
      stepState = (stepState + 1) % 3;
      playerDirection = ['up1', 'up2', 'up3'][stepState];
    } else if (dx === 1) {
      stepState = (stepState + 1) % 2;
      playerDirection = ['right1', 'right2'][stepState];
    } else if (dx === -1) {
      stepState = (stepState + 1) % 2;
      playerDirection = ['left1', 'left2'][stepState];
    } else if (dy === 1) {
      stepState = (stepState + 1) % 3;
      playerDirection = ['down1', 'down2', 'down3'][stepState];
    }

    if (!canMoveTo(nx, ny)) {
      showMessage('Caminho errado! Volte ao início.', 'red', 1000);
      player = { x: 1, y: 1 };
      playerDirection = 'down1';
      stepState = 0;
      draw();
      return;
    }

    player.x = nx;
    player.y = ny;
    draw();

    if (MAZE_LAYOUT[ny][nx] === 2) {
      // Ativar efeito de brilho
      showVictoryFlash = true;

      // Animar o brilho
      let flashCount = 0;
      const flashInterval = setInterval(() => {
        showVictoryFlash = !showVictoryFlash;
        draw();
        flashCount++;

        if (flashCount >= 6) {
          clearInterval(flashInterval);
          showVictoryFlash = true;
          draw();

          // Mostrar botão de continuar após o efeito
          if (continueBtn) continueBtn.style.display = 'block';
        }
      }, 200);
    }
  }

  function fixCanvasDPR() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = CANVAS_SIZE + 'px';
    canvas.style.height = CANVAS_SIZE + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o labirinto
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const type = MAZE_LAYOUT[r][c];
        const x = c * CELL, y = r * CELL;

        // Caminho (área transitável)
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--path') || '#24e04dff';
        ctx.fillRect(x, y, CELL, CELL);

        // Paredes (sobrescrevem o caminho)
        if (type === 1) {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--wall') || '#24e04dff';
          ctx.fillRect(x, y, CELL, CELL);
        }
        // Saída (sobrescreve o caminho)
        else if (type === 2) {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--exit') || '#fff7beff';
          ctx.fillRect(x, y, CELL, CELL);

          // Desenhar o quadrado amarelo da saída
          ctx.fillStyle = '#f59e0b';
          const size = Math.max(6, Math.floor(CELL * 0.35));
          ctx.fillRect(x + (CELL - size) / 2, y + (CELL - size) / 2, size, size);
        }

        // Grade
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.strokeRect(x, y, CELL, CELL);
      }
    }

    // Dica (se ativada)
    if (showHint) {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (MAZE_LAYOUT[r][c] === 2) {
            ctx.fillStyle = 'rgba(250, 207, 37, 0.18)';
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
          }
        }
      }
    }

    // Desenhar o jogador
    const playerSize = Math.floor(CELL * 0.8);
    const currentImage = playerImages[playerDirection];

    // Desenhar o personagem (com ou sem imagem carregada)
    if (currentImage && currentImage.complete && currentImage.naturalHeight !== 0) {
      ctx.drawImage(
        currentImage,
        player.x * CELL + (CELL - playerSize) / -8,
        player.y * CELL + (CELL - playerSize) / -1.2,
        playerSize * 1.3,
        playerSize * 1.7
      );
    } else {
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(
        player.x * CELL + CELL * 0.1,
        player.y * CELL + CELL * 0.1,
        playerSize,
        playerSize
      );
    }

    // Efeito de brilho quando chegar na saída (DENTRO DA FUNÇÃO DRAW!)
    if (showVictoryFlash) {
      // Brilho dourado em toda a tela
      const gradient = ctx.createRadialGradient(
        CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0,
        CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE * 0.7
      );
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 223, 0, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      // Brilho extra ao redor do jogador
      const playerCenterX = player.x * CELL + CELL / 2;
      const playerCenterY = player.y * CELL + CELL / 2;
      
      const playerGlow = ctx.createRadialGradient(
        playerCenterX, playerCenterY, 0,
        playerCenterX, playerCenterY, CELL * 2
      );
      playerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      playerGlow.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
      playerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = playerGlow;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }

  // Event listeners
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); move(0, -1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); move(0, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1, 0); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1, 0); }
  });

  if (upBtn) upBtn.addEventListener('click', () => move(0, -1));
  if (downBtn) downBtn.addEventListener('click', () => move(0, 1));
  if (leftBtn) leftBtn.addEventListener('click', () => move(-1, 0));
  if (rightBtn) rightBtn.addEventListener('click', () => move(1, 0));

  if (resetBtn) resetBtn.addEventListener('click', () => {
    player = { x: 1, y: 1 };
    playerDirection = 'down1';
    gameWon = false;
    showHint = false;
    stepState = 0;
    showVictoryFlash = false; // Resetar o brilho
    if (overlay) overlay.style.display = 'none';
    if (continueBtn) continueBtn.style.display = 'none';
    draw();
  });

  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      window.location.href = "recompensa.html";
    });
  }

  fixCanvasDPR();
  draw();

  loadImages(playerImages, () => {
    draw();
  });
});