'use strict';

/* =========================================================
   ArquiCruza – Cruzadinha de Arquitetura de Computadores
   Cada palavra: resposta (sem espaços), posição inicial
   (linha, coluna), direção (H = horizontal, V = vertical)
   e a pista. A numeração é calculada automaticamente.
   ========================================================= */

const PALAVRAS = [
  { resposta: 'MICROCONTROLADOR', linha: 4,  coluna: 0,  direcao: 'H',
    pista: 'Chip único que reúne processador, memória e periféricos, comum em sistemas embarcados.' },
  { resposta: 'MEMORIADEMASSA',   linha: 0,  coluna: 9,  direcao: 'V',
    pista: 'Guarda grandes volumes de arquivos de forma permanente, como HDs e SSDs.' },
  { resposta: 'REGISTRADORES',    linha: 7,  coluna: 1,  direcao: 'H',
    pista: 'Pequenas memórias internas ao processador, as mais rápidas, que guardam dados em uso imediato.' },
  { resposta: 'ADDRESSBUS',       linha: 2,  coluna: 13, direcao: 'V',
    pista: 'Via de sentido único que informa à memória qual posição será lida ou escrita.' },
  { resposta: 'QUADCORE',         linha: 0,  coluna: 2,  direcao: 'V',
    pista: 'Processador com quatro núcleos de execução no mesmo chip.' },
  { resposta: 'DUALCORE',         linha: 1,  coluna: 11, direcao: 'V',
    pista: 'Processador com dois núcleos de execução no mesmo chip.' },
  { resposta: 'DATABUS',          linha: 10, coluna: 8,  direcao: 'H',
    pista: 'Via de mão dupla que transporta o conteúdo trocado entre processador e memória.' },
  { resposta: 'EEPROM',           linha: 1,  coluna: 15, direcao: 'V',
    pista: 'Não volátil, regravável byte a byte sem retirar o chip da placa.' },
  { resposta: 'FLASH',            linha: 13, coluna: 7,  direcao: 'H',
    pista: 'Não volátil regravável por blocos, usada em pendrives e cartões SD.' },
  { resposta: 'CACHE',            linha: 1,  coluna: 5,  direcao: 'H',
    pista: 'Pequena e muito veloz, guarda dados usados com frequência perto do processador.' },
  { resposta: 'CPU',              linha: 1,  coluna: 0,  direcao: 'H',
    pista: 'Cérebro do computador que busca, decodifica e executa as instruções dos programas.' },
  { resposta: 'RAM',              linha: 7,  coluna: 7,  direcao: 'V',
    pista: 'Espaço de trabalho principal, volátil, onde rodam aplicativos e dados em uso.' },
  { resposta: 'ULA',              linha: 2,  coluna: 11, direcao: 'H',
    pista: 'Bloco do processador que realiza somas, subtrações e comparações lógicas.' },
  { resposta: 'ROM',              linha: 3,  coluna: 6,  direcao: 'V',
    pista: 'Guarda, desde a fabricação, o programa de inicialização e não perde dados sem energia.' },
  { resposta: 'DMA',              linha: 3,  coluna: 0,  direcao: 'V',
    pista: 'Recurso que permite aos periféricos transferirem dados sem ocupar o processador.' },
  { resposta: 'UC',               linha: 0,  coluna: 0,  direcao: 'V',
    pista: 'Emite os sinais que coordenam os demais blocos a cada ciclo de operação.' }
];

/* ---------- Modelo do tabuleiro ---------- */

function construirModelo(lista) {
  const palavras = lista.map(p => ({ ...p, chaves: [] }));
  const celulas = new Map(); // "linha,coluna" -> { l, c, letra, palavras: { H, V } }

  palavras.forEach((p, i) => {
    for (let k = 0; k < p.resposta.length; k++) {
      const l = p.linha + (p.direcao === 'V' ? k : 0);
      const c = p.coluna + (p.direcao === 'H' ? k : 0);
      const chave = l + ',' + c;
      let cel = celulas.get(chave);
      if (!cel) {
        cel = { l, c, chave, letra: p.resposta[k], palavras: {} };
        celulas.set(chave, cel);
      } else if (cel.letra !== p.resposta[k]) {
        throw new Error('Conflito de letras em ' + chave + ' (' + p.resposta + ')');
      }
      cel.palavras[p.direcao] = i;
      p.chaves.push(chave);
    }
  });

  // Numeração: ordem de leitura (linha, depois coluna) das casas iniciais.
  const inicios = [...new Set(palavras.map(p => p.linha + ',' + p.coluna))]
    .map(s => s.split(',').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const numeros = new Map(inicios.map((x, i) => [x.join(','), i + 1]));
  palavras.forEach(p => { p.numero = numeros.get(p.linha + ',' + p.coluna); });

  let linhas = 0, colunas = 0;
  celulas.forEach(cel => {
    linhas = Math.max(linhas, cel.l + 1);
    colunas = Math.max(colunas, cel.c + 1);
  });

  return { palavras, celulas, linhas, colunas };
}

/* ---------- Interface ---------- */

function iniciarJogo() {
  const modelo = construirModelo(PALAVRAS);
  const { palavras, celulas, linhas, colunas } = modelo;

  const elTabuleiro = document.getElementById('tabuleiro');
  const elContador = document.getElementById('contador');
  const elMensagem = document.getElementById('mensagem');
  const elPistasH = document.getElementById('pistas-h');
  const elPistasV = document.getElementById('pistas-v');

  let direcaoAtual = 'H';
  let celulaAtiva = null;
  const itensPista = [];   // índice da palavra -> <button>
  const flagsErro = new Set();

  /* --- Construção do tabuleiro --- */
  elTabuleiro.style.gridTemplateColumns = 'repeat(' + colunas + ', var(--cel))';

  const numeroNaCelula = new Map();
  palavras.forEach(p => numeroNaCelula.set(p.linha + ',' + p.coluna, p.numero));

  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      const chave = l + ',' + c;
      const cel = celulas.get(chave);
      if (!cel) {
        const vazia = document.createElement('div');
        vazia.className = 'vazia';
        elTabuleiro.appendChild(vazia);
        continue;
      }
      const div = document.createElement('div');
      div.className = 'celula';
      if (numeroNaCelula.has(chave)) {
        const n = document.createElement('span');
        n.className = 'num';
        n.textContent = numeroNaCelula.get(chave);
        div.appendChild(n);
      }
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 2;
      input.autocomplete = 'off';
      input.autocapitalize = 'characters';
      input.spellcheck = false;
      input.setAttribute('aria-label', 'Linha ' + (l + 1) + ', coluna ' + (c + 1));
      div.appendChild(input);
      elTabuleiro.appendChild(div);
      cel.div = div;
      cel.input = input;
      ligarEventos(cel);
    }
  }

  /* --- Construção das pistas --- */
  palavras
    .map((p, i) => ({ p, i }))
    .sort((a, b) => a.p.numero - b.p.numero)
    .forEach(({ p, i }) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pista';
      btn.innerHTML = '<span class="n"></span><span class="t"></span><span class="estado" aria-hidden="true"></span>';
      btn.querySelector('.n').textContent = p.numero + '.';
      btn.querySelector('.t').textContent = p.pista + ' (' + p.resposta.length + ')';
      btn.addEventListener('click', () => irParaPalavra(i));
      li.appendChild(btn);
      (p.direcao === 'H' ? elPistasH : elPistasV).appendChild(li);
      itensPista[i] = btn;
    });

  /* --- Seleção e destaque --- */
  function direcaoValida(cel, preferida) {
    if (preferida && cel.palavras[preferida] !== undefined) return preferida;
    if (cel.palavras[direcaoAtual] !== undefined) return direcaoAtual;
    return cel.palavras.H !== undefined ? 'H' : 'V';
  }

  function atualizarDestaque() {
    celulas.forEach(cel => cel.div.classList.remove('palavra-ativa', 'foco'));
    itensPista.forEach(b => b.classList.remove('ativa'));
    if (!celulaAtiva) return;
    const idx = celulaAtiva.palavras[direcaoAtual];
    if (idx === undefined) return;
    palavras[idx].chaves.forEach(k => celulas.get(k).div.classList.add('palavra-ativa'));
    celulaAtiva.div.classList.add('foco');
    itensPista[idx].classList.add('ativa');
  }

  function selecionar(cel, preferida) {
    celulaAtiva = cel;
    direcaoAtual = direcaoValida(cel, preferida);
    atualizarDestaque();
  }

  function focar(cel, preferida) {
    if (preferida) direcaoAtual = direcaoValida(cel, preferida);
    cel.input.focus();
    cel.input.select();
    selecionar(cel, preferida);
  }

  function irParaPalavra(i) {
    const p = palavras[i];
    direcaoAtual = p.direcao;
    focar(celulas.get(p.chaves[0]), p.direcao);
  }

  function alternarDirecao() {
    if (!celulaAtiva) return;
    const outra = direcaoAtual === 'H' ? 'V' : 'H';
    if (celulaAtiva.palavras[outra] !== undefined) {
      direcaoAtual = outra;
      atualizarDestaque();
    }
  }

  /* --- Navegação --- */
  function vizinha(cel, dl, dc) {
    let l = cel.l + dl, c = cel.c + dc;
    while (l >= 0 && c >= 0 && l < linhas && c < colunas) {
      const achada = celulas.get(l + ',' + c);
      if (achada) return achada;
      l += dl; c += dc;
    }
    return null;
  }

  function celulaDaPalavra(cel, deslocamento) {
    const idx = cel.palavras[direcaoAtual];
    if (idx === undefined) return null;
    const chaves = palavras[idx].chaves;
    const pos = chaves.indexOf(cel.chave) + deslocamento;
    return pos >= 0 && pos < chaves.length ? celulas.get(chaves[pos]) : null;
  }

  /* --- Feedback (Conferir) --- */
  function palavraCerta(i) {
    return itensPista[i].classList.contains('ok');
  }

  function reaplicarCelulas() {
    celulas.forEach(cel => {
      const certa = Object.values(cel.palavras).some(palavraCerta);
      cel.div.classList.toggle('ok', certa);
      cel.div.classList.toggle('erro', !certa && flagsErro.has(cel.chave));
    });
  }

  function atualizarContador() {
    const acertos = itensPista.filter(b => b.classList.contains('ok')).length;
    elContador.textContent = acertos + ' de ' + palavras.length + ' palavras';
  }

  function limparFeedbackDaCelula(cel) {
    flagsErro.delete(cel.chave);
    Object.values(cel.palavras).forEach(i => {
      itensPista[i].classList.remove('ok', 'bad');
      itensPista[i].querySelector('.estado').textContent = '';
    });
    reaplicarCelulas();
    atualizarContador();
    elMensagem.textContent = '';
    elMensagem.classList.remove('sucesso');
  }

  function conferir() {
    flagsErro.clear();
    let acertos = 0, erradas = 0, vazias = 0;

    palavras.forEach((p, i) => {
      const digitado = p.chaves.map(k => celulas.get(k).input.value).join('');
      const btn = itensPista[i];
      const estado = btn.querySelector('.estado');
      btn.classList.remove('ok', 'bad');
      estado.textContent = '';

      if (digitado === p.resposta) {
        btn.classList.add('ok');
        estado.textContent = '✓';
        acertos++;
      } else if (digitado.length > 0) {
        btn.classList.add('bad');
        estado.textContent = '✗';
        erradas++;
        p.chaves.forEach(k => {
          const cel = celulas.get(k);
          if (cel.input.value && cel.input.value !== cel.letra) flagsErro.add(k);
        });
      } else {
        vazias++;
      }
    });

    reaplicarCelulas();
    atualizarContador();

    elMensagem.classList.toggle('sucesso', acertos === palavras.length);
    if (acertos === palavras.length) {
      elMensagem.textContent = '🎉 Parabéns! Você completou a cruzadinha!';
    } else if (erradas > 0) {
      elMensagem.textContent = erradas + ' palavra(s) com ✗: há letras erradas ou faltando. Revise e confira de novo.';
    } else {
      elMensagem.textContent = 'Nenhuma palavra errada até agora. Ainda faltam ' + vazias + ' sem resposta.';
    }
  }

  function reiniciar() {
    celulas.forEach(cel => { cel.input.value = ''; });
    flagsErro.clear();
    itensPista.forEach(b => {
      b.classList.remove('ok', 'bad', 'ativa');
      b.querySelector('.estado').textContent = '';
    });
    reaplicarCelulas();
    atualizarContador();
    elMensagem.textContent = '';
    elMensagem.classList.remove('sucesso');
    direcaoAtual = 'H';
    celulaAtiva = null;
    atualizarDestaque();
    const primeira = celulas.get(palavras[0].chaves[0]);
    focar(primeira, 'H');
  }

  /* --- Eventos de cada casa --- */
  function ligarEventos(cel) {
    const input = cel.input;
    let jaEstavaAtiva = false;

    input.addEventListener('mousedown', () => { jaEstavaAtiva = (celulaAtiva === cel); });
    input.addEventListener('click', () => {
      if (jaEstavaAtiva) alternarDirecao();
      input.select();
    });
    input.addEventListener('focus', () => {
      if (celulaAtiva !== cel) selecionar(cel);
      input.select();
    });

    input.addEventListener('input', () => {
      const limpo = input.value.toUpperCase().replace(/[^A-Z]/g, '');
      input.value = limpo.slice(-1);
      limparFeedbackDaCelula(cel);
      if (input.value) {
        const proxima = celulaDaPalavra(cel, 1);
        if (proxima) focar(proxima);
      }
    });

    input.addEventListener('keydown', ev => {
      const setas = { ArrowLeft: [0, -1, 'H'], ArrowRight: [0, 1, 'H'], ArrowUp: [-1, 0, 'V'], ArrowDown: [1, 0, 'V'] };
      if (setas[ev.key]) {
        ev.preventDefault();
        const [dl, dc, dir] = setas[ev.key];
        const alvo = vizinha(cel, dl, dc);
        if (alvo) focar(alvo, dir);
        else { direcaoAtual = direcaoValida(cel, dir); atualizarDestaque(); }
      } else if (ev.key === 'Backspace') {
        ev.preventDefault();
        if (input.value) {
          input.value = '';
          limparFeedbackDaCelula(cel);
        } else {
          const anterior = celulaDaPalavra(cel, -1);
          if (anterior) {
            anterior.input.value = '';
            limparFeedbackDaCelula(anterior);
            focar(anterior);
          }
        }
      } else if (ev.key === 'Delete') {
        ev.preventDefault();
        input.value = '';
        limparFeedbackDaCelula(cel);
      } else if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault();
        alternarDirecao();
      }
    });
  }

  document.getElementById('btn-conferir').addEventListener('click', conferir);
  document.getElementById('btn-reiniciar').addEventListener('click', reiniciar);

  atualizarContador();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarJogo);
}
if (typeof module !== 'undefined') {
  module.exports = { PALAVRAS, construirModelo };
}
