// Caça-palavras simples: palavras são posicionadas em grade 18x18
// (MICROCONTROLADOR tem 16 letras e não cabia na grade 15x15 original)
const GRID_SIZE = 18;

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
let placements = []; // {word, coords: [{r,c}], dir: 'H'|'V'}

function emptyGrid(){
  const g = new Array(GRID_SIZE).fill(null).map(()=>new Array(GRID_SIZE).fill(''));
  return g;
}

const DIRECTIONS = [
  {dr:0, dc:1, name:'H'}, // horizontal L->R
  {dr:1, dc:0, name:'V'}  // vertical T->B
];  // CORREÇÃO 2: sem diagonal; só Horizontais e Verticais (regra 2)

// CORREÇÃO 1: uma tentativa completa de montar o tabuleiro.
// - palavras maiores entram primeiro (sobra espaço livre para elas);
// - a primeira palavra é livre; cada uma das seguintes PRECISA cruzar com
//   pelo menos uma já colocada, numa direção diferente (cruzamento real);
// - se alguma palavra não couber, devolve null e o tabuleiro é refeito.
function tryBuild(words){
  const grid = emptyGrid();
  const owners = emptyGrid().map(row => row.map(() => [])); // direções que passam por cada casa
  const placed = [];

  const ordered = words.slice().sort((a, b) => b.word.length - a.word.length);

  for(let w = 0; w < ordered.length; w++){
    const word = ordered[w].word.toUpperCase();
    let ok = false;

    for(let attempt = 0; attempt < 600 && !ok; attempt++){
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const maxR = GRID_SIZE - (dir.dr * (word.length - 1)) - 1;
      const maxC = GRID_SIZE - (dir.dc * (word.length - 1)) - 1;
      if(maxR < 0 || maxC < 0) continue;
      const r0 = Math.floor(Math.random() * (maxR + 1));
      const c0 = Math.floor(Math.random() * (maxC + 1));

      let fits = true;
      let crossings = 0;
      const coords = [];
      for(let i = 0; i < word.length; i++){
        const r = r0 + dir.dr * i;
        const c = c0 + dir.dc * i;
        const cur = grid[r][c];
        if(cur === ''){
          coords.push({r, c});
        } else if(cur === word[i] && !owners[r][c].includes(dir.name)){
          crossings++;            // cruza uma palavra de direção diferente
          coords.push({r, c});
        } else { fits = false; break; }
      }
      if(!fits) continue;
      if(w > 0 && crossings === 0) continue; // exige cruzamento (exceto a 1ª palavra)

      for(let i = 0; i < word.length; i++){
        const {r, c} = coords[i];
        grid[r][c] = word[i];
        owners[r][c].push(dir.name);
      }
      placed.push({word, coords, dir: dir.name});
      ok = true;
    }
    if(!ok) return null;
  }
  return {grid, placed};
}

// Tenta montar o tabuleiro até conseguir colocar TODAS as palavras cruzadas.
function placeWords(words){
  let result = null;
  for(let t = 0; t < 500 && !result; t++){
    result = tryBuild(words);
  }
  if(!result){
    console.warn('Não foi possível montar o tabuleiro completo.');
    return {grid: emptyGrid(), placed: []};
  }

  const {grid, placed} = result;
  // fill rest with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<GRID_SIZE;r++){
    for(let c=0;c<GRID_SIZE;c++){
      if(grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random()*letters.length)];
    }
  }
  return {grid, placed};
}

// MELHORIA 3: numera as casas iniciais em ordem de leitura (linha, depois coluna).
// Palavras que começam na mesma casa dividem o mesmo número.
function assignNumbers(placements){
  const starts = [];
  placements.forEach(p=>{
    const {r,c} = p.coords[0];
    if(!starts.some(s=>s.r===r && s.c===c)) starts.push({r,c});
  });
  starts.sort((a,b)=> a.r-b.r || a.c-b.c);
  placements.forEach(p=>{
    const {r,c} = p.coords[0];
    p.number = starts.findIndex(s=>s.r===r && s.c===c) + 1;
  });
}

function renderBoard(){
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = `repeat(${GRID_SIZE},34px)`;
  for(let r=0;r<GRID_SIZE;r++){
    for(let c=0;c<GRID_SIZE;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      const starting = placements.filter(p=>p.coords[0].r===r && p.coords[0].c===c);
      if(starting.length){
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = starting[0].number;
        cell.appendChild(num);
      }
      const input = document.createElement('input');
      input.setAttribute('maxlength','1');
      input.dataset.r = r; input.dataset.c = c;
      input.autocomplete = 'off';
      input.inputMode = 'text';
      input.addEventListener('input', (e)=>{
        e.target.value = e.target.value.toUpperCase().replace(/[^A-ZÀ-Ÿ]/g,'').slice(0,1);
      });
      cell.appendChild(input);
      boardEl.appendChild(cell);
    }
  }
}

function renderClues(placements){
  hCluesEl.innerHTML = '';
  vCluesEl.innerHTML = '';
  placements
    .map((p, idx)=>({p, idx}))
    .sort((a,b)=> a.p.number - b.p.number)
    .forEach(({p, idx})=>{
      const entry = WORDS.find(w=>w.word.toUpperCase()===p.word);
      const clueText = entry? entry.clue : '';
      const li = document.createElement('li');
      li.dataset.index = idx;
      li.textContent = `${p.number}. ${clueText}`;
      (p.dir === 'H' ? hCluesEl : vCluesEl).appendChild(li);
      p._orientation = p.dir;
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
  assignNumbers(placements);
  renderBoard();
  renderClues(placements);
  counterEl.textContent = `0 de ${placements.length} palavras`;

  checkBtn.addEventListener('click', checkAnswers);
  restartBtn.addEventListener('click', restart);
}

window.addEventListener('load', init);
