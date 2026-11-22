// Caça-palavras simples: palavras são posicionadas em grade 15x15
const GRID_SIZE = 15;

// Lista de palavras (sem espaços) e suas pistas em português
const WORDS = [
  {word: 'CPU', clue: 'Unidade central que coordena o processamento.'},
  {word: 'ULA', clue: 'Parte da CPU que realiza operações aritméticas e lógicas.'},
  {word: 'UC', clue: 'Componente que controla a execução de instruções na CPU.'},
  {word: 'REGISTRADORES', clue: 'Pequenas unidades de armazenamento dentro da CPU para dados temporários.'},
  {word: 'RAM', clue: 'Memória volátil usada para armazenar dados em uso.'},
  {word: 'ROM', clue: 'Memória de leitura, não volátil, com instruções fixas.'},
  {word: 'EEPROM', clue: 'Memória não volátil que pode ser reprogramada eletricamente.'},
  {word: 'FLASH', clue: 'Memória não volátil usada em armazenamento removível e firmware.'},
  {word: 'CACHE', clue: 'Memória rápida entre CPU e memória principal para acelerar acesso.'},
  {word: 'MEMORIADEMASSA', clue: 'Armazenamento permanente de grandes volumes de dados.'},
  {word: 'DMA', clue: 'Mecanismo que permite transferir dados sem usar intensamente a CPU.'},
  {word: 'ADDRESSBUS', clue: 'Barramento que transporta endereços de memória.'},
  {word: 'DATABUS', clue: 'Barramento que transporta dados entre componentes.'},
  {word: 'MICROCONTROLADOR', clue: 'Circuito integrado com CPU, memória e periféricos integrados.'},
  {word: 'DUALCORE', clue: 'Processador com duas unidades de execução independentes.'},
  {word: 'QUADCORE', clue: 'Processador com quatro unidades de execução independentes.'}
];

const boardEl = document.getElementById('board');
const hCluesEl = document.getElementById('hClues');
const vCluesEl = document.getElementById('vClues');
const checkBtn = document.getElementById('checkBtn');
const restartBtn = document.getElementById('restartBtn');
const counterEl = document.getElementById('counter');

let solutionGrid = [];
let placements = []; // {word, coords: [{r,c}], dir: 'H'|'V'|'D'}

function emptyGrid(){
  const g = new Array(GRID_SIZE).fill(null).map(()=>new Array(GRID_SIZE).fill(''));
  return g;
}

// Try to place each word randomly; allow overlaps only when letters match
function placeWords(words){
  const grid = emptyGrid();
  const placed = [];
  const directions = [
    {dr:0, dc:1, name:'H'}, // horizontal L->R
    {dr:1, dc:0, name:'V'}, // vertical T->B
    {dr:1, dc:1, name:'D'}  // diagonal down-right (optional)
  ];

  for(const wobj of words){
    const word = wobj.word.toUpperCase();
    let ok = false;
    for(let attempt=0; attempt<400 && !ok; attempt++){
      const dir = directions[Math.floor(Math.random()*directions.length)];
      const maxR = GRID_SIZE - (dir.dr * (word.length-1)) - 1;
      const maxC = GRID_SIZE - (dir.dc * (word.length-1)) - 1;
      const r0 = Math.floor(Math.random()*(maxR+1));
      const c0 = Math.floor(Math.random()*(maxC+1));

      let fits = true;
      const coords = [];
      for(let i=0;i<word.length;i++){
        const r = r0 + dir.dr * i;
        const c = c0 + dir.dc * i;
        const cur = grid[r][c];
        if(cur === '' || cur === word[i]){
          coords.push({r,c});
        } else { fits = false; break; }
      }
      if(!fits) continue;

      // commit
      for(let i=0;i<word.length;i++){
        const r = coords[i].r; const c = coords[i].c;
        grid[r][c] = word[i];
      }
      placed.push({word, coords, dir:dir.name});
      ok = true;
    }
    if(!ok){
      console.warn('Não foi possível posicionar:', wobj.word);
    }
  }

  // fill rest with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<GRID_SIZE;r++){
    for(let c=0;c<GRID_SIZE;c++){
      if(grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random()*letters.length)];
    }
  }
  return {grid, placed};
}

function renderBoard(){
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = `repeat(${GRID_SIZE},34px)`;
  for(let r=0;r<GRID_SIZE;r++){
    for(let c=0;c<GRID_SIZE;c++){
      const input = document.createElement('input');
      input.setAttribute('maxlength','1');
      input.dataset.r = r; input.dataset.c = c;
      input.autocomplete = 'off';
      input.inputMode = 'text';
      input.addEventListener('input', (e)=>{
        e.target.value = e.target.value.toUpperCase().replace(/[^A-ZÀ-Ÿ]/g,'').slice(0,1);
      });
      boardEl.appendChild(input);
    }
  }
}

function renderClues(placements){
  // separate H and V (and D go to horizontals list as well)
  hCluesEl.innerHTML = '';
  vCluesEl.innerHTML = '';
  let hCount=0,vCount=0;
  placements.forEach((p, idx)=>{
    const entry = WORDS.find(w=>w.word.toUpperCase()===p.word);
    const clueText = entry? entry.clue : '';
    // choose numbering by first coord scanning: if dr==0(horizontal) then horizontal
    if(p.dir === 'H' || p.dir === 'D'){
      hCount++;
      const li = document.createElement('li');
      li.dataset.index = idx;
      li.textContent = `${hCount}. ${clueText}`;
      hCluesEl.appendChild(li);
      p._number = `${hCount}`;
      p._orientation = 'H';
    } else {
      vCount++;
      const li = document.createElement('li');
      li.dataset.index = idx;
      li.textContent = `${vCount}. ${clueText}`;
      vCluesEl.appendChild(li);
      p._number = `${vCount}`;
      p._orientation = 'V';
    }
  });
}

function checkAnswers(){
  const inputs = boardEl.querySelectorAll('input');
  // clear classes
  inputs.forEach(i=>{ i.classList.remove('cell-ok','cell-err'); });

  let correctCount = 0;
  placements.forEach(p=>{
    const letters = p.coords.map(coord=>{
      const sel = boardEl.querySelector(`input[data-r='${coord.r}'][data-c='${coord.c}']`);
      return sel && sel.value ? sel.value.toUpperCase() : '';
    });
    const guess = letters.join('');
    if(guess === p.word){
      // mark cells ok
      p.coords.forEach(coord=>{
        const el = boardEl.querySelector(`input[data-r='${coord.r}'][data-c='${coord.c}']`);
        el.classList.add('cell-ok');
      });
      correctCount++;
    } else {
      p.coords.forEach(coord=>{
        const el = boardEl.querySelector(`input[data-r='${coord.r}'][data-c='${coord.c}']`);
        el.classList.add('cell-err');
      });
    }
  });
  counterEl.textContent = `${correctCount} de ${placements.length} palavras`;
}

function restart(){
  const inputs = boardEl.querySelectorAll('input');
  inputs.forEach(i=>{ i.value=''; i.classList.remove('cell-ok','cell-err'); });
  counterEl.textContent = `0 de ${placements.length} palavras`;
}

function init(){
  // build solution
  const {grid, placed} = placeWords(WORDS);
  solutionGrid = grid;
  placements = placed;
  renderBoard();
  renderClues(placements);
  counterEl.textContent = `0 de ${placements.length} palavras`;

  checkBtn.addEventListener('click', checkAnswers);
  restartBtn.addEventListener('click', restart);
}

window.addEventListener('load', init);
