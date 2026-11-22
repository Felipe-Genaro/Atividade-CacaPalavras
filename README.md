# ArquiCruza – Cruzadinha de Arquitetura de Computadores

Jogo de cruzadinha para quem está no **primeiro semestre** e quer fixar os termos básicos de **arquitetura computacional**. O jogador lê a pista, descobre o termo e digita a resposta direto no tabuleiro.

Feito apenas com **HTML, CSS e JavaScript puros**: sem bibliotecas, sem instalação e sem servidor.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Como executar](#2-como-executar)
3. [Como jogar](#3-como-jogar)
4. [Palavras e pistas](#4-palavras-e-pistas)
5. [Como o jogo funciona por dentro](#5-como-o-jogo-funciona-por-dentro)
6. [Como editar as palavras](#6-como-editar-as-palavras)
7. [Estrutura do projeto](#7-estrutura-do-projeto)

---

## 1. Visão geral

| Item | Descrição |
| --- | --- |
| Nome do jogo | ArquiCruza |
| Tipo | Cruzadinha (palavras cruzadas) |
| Público | Estudantes do primeiro semestre |
| Tema | Termos de arquitetura de computadores |
| Palavras | 16, e cada uma cruza com pelo menos uma outra |
| Tabuleiro | Grade de 14 linhas por 16 colunas, com 89 casas preenchíveis |
| Tecnologias | HTML, CSS e JavaScript puros |

**Objetivo do jogador:** completar todas as palavras do tabuleiro a partir das pistas e chegar em `16 de 16 palavras`.

**O que o jogo oferece:**
- pistas numeradas e separadas em **Horizontais** e **Verticais**;
- digitação direta nas casas, com navegação pelo teclado;
- botão **Conferir**, que mostra quais palavras estão certas e quais estão erradas;
- **contador de acertos** (por exemplo, `8 de 16 palavras`);
- botão **Reiniciar**, que limpa o tabuleiro;
- mensagem de parabéns ao completar a cruzadinha.

---

## 2. Como executar

Abra o arquivo `index.html` (na raiz do projeto) em qualquer navegador moderno, como Chrome, Edge ou Firefox. Não é preciso instalar nada nem rodar servidor.

---

## 3. Como jogar

### Passo a passo

1. **Leia as pistas** nas listas **Horizontais** e **Verticais**. O número de cada pista aparece no tabuleiro, na casa onde a palavra começa.
2. **Clique na pista** (ou direto numa casa do tabuleiro). A palavra correspondente fica destacada em azul.
3. **Digite a resposta**, sem espaços e sem acentos. Por exemplo, "address bus" é escrito `ADDRESSBUS`. O cursor avança sozinho para a próxima casa.
4. O número entre parênteses no fim de cada pista mostra **quantas letras** a resposta tem.
5. Clique em **Conferir** para ver o resultado.
6. Use **Reiniciar** para limpar o tabuleiro e começar de novo.

### O que cada marca significa depois de Conferir

| Marca | Significado |
| --- | --- |
| ✓ na pista, casas verdes | Palavra completa e correta |
| ✗ na pista | Palavra com alguma letra digitada, mas ainda errada ou incompleta |
| Casa vermelha | Letra errada dentro de uma palavra marcada com ✗ |
| Sem marca | Palavra sem nenhuma letra digitada |

Uma letra que cruza com uma palavra certa continua verde, mesmo que a outra palavra esteja errada.

Atenção: as letras que vêm de um cruzamento contam como letras digitadas. Por isso, uma palavra que ainda tem casas vazias, mas já recebeu algumas letras de palavras vizinhas, aparece com ✗ até ser completada.

Abaixo do contador aparece também uma mensagem de resumo:
- quantas palavras estão com ✗, quando há erros;
- quantas ainda faltam, quando não há nenhum erro;
- `🎉 Parabéns! Você completou a cruzadinha!`, quando as 16 estão certas.

### Atalhos de teclado

| Tecla | Ação |
| --- | --- |
| Letras (A–Z) | Preenchem a casa e avançam para a próxima da palavra |
| Setas | Movem entre as casas (para cima e para baixo escolhem a direção vertical, para os lados a horizontal) |
| `Espaço` ou `Enter` | Trocam entre horizontal e vertical numa casa onde as duas palavras se cruzam |
| `Backspace` | Apaga a letra; numa casa vazia, volta e apaga a anterior |
| `Delete` | Apaga a letra da casa atual |

Clicar duas vezes na mesma casa também troca a direção.

### Observações

- Só letras de A a Z são aceitas. Números, símbolos e acentos são descartados.
- Ao alterar uma letra depois de conferir, as marcas ✓ e ✗ daquela palavra somem e o contador é atualizado.
- Não há limite de tentativas nem de tempo.

---

## 4. Palavras e pistas

As pistas foram escritas com palavras próprias, têm no máximo 15 palavras e não trazem a resposta, nem parte dela, nem a sigla por extenso.

### Horizontais

| Nº | Resposta | Letras | Pista |
| --- | --- | --- | --- |
| 4 | `CPU` | 3 | Cérebro do computador que busca, decodifica e executa as instruções dos programas. |
| 5 | `CACHE` | 5 | Pequena e muito veloz, guarda dados usados com frequência perto do processador. |
| 8 | `ULA` | 3 | Bloco do processador que realiza somas, subtrações e comparações lógicas. |
| 12 | `MICROCONTROLADOR` | 16 | Chip único que reúne processador, memória e periféricos, comum em sistemas embarcados. |
| 13 | `REGISTRADORES` | 13 | Pequenas memórias internas ao processador, as mais rápidas, que guardam dados em uso imediato. |
| 15 | `DATABUS` | 7 | Via de mão dupla que transporta o conteúdo trocado entre processador e memória. |
| 16 | `FLASH` | 5 | Não volátil regravável por blocos, usada em pendrives e cartões SD. |

### Verticais

| Nº | Resposta | Letras | Pista |
| --- | --- | --- | --- |
| 1 | `UC` | 2 | Emite os sinais que coordenam os demais blocos a cada ciclo de operação. |
| 2 | `QUADCORE` | 8 | Processador com quatro núcleos de execução no mesmo chip. |
| 3 | `MEMORIADEMASSA` | 14 | Guarda grandes volumes de arquivos de forma permanente, como HDs e SSDs. |
| 6 | `DUALCORE` | 8 | Processador com dois núcleos de execução no mesmo chip. |
| 7 | `EEPROM` | 6 | Não volátil, regravável byte a byte sem retirar o chip da placa. |
| 9 | `ADDRESSBUS` | 10 | Via de sentido único que informa à memória qual posição será lida ou escrita. |
| 10 | `DMA` | 3 | Recurso que permite aos periféricos transferirem dados sem ocupar o processador. |
| 11 | `ROM` | 3 | Guarda, desde a fabricação, o programa de inicialização e não perde dados sem energia. |
| 14 | `RAM` | 3 | Espaço de trabalho principal, volátil, onde rodam aplicativos e dados em uso. |

### Glossário: termo e como digitar

| Termo | Digite no tabuleiro |
| --- | --- |
| CPU | `CPU` |
| ULA | `ULA` |
| UC (Unidade de Controle) | `UC` |
| Registradores | `REGISTRADORES` |
| RAM | `RAM` |
| ROM | `ROM` |
| EEPROM | `EEPROM` |
| Flash | `FLASH` |
| Cache | `CACHE` |
| Memória de massa (armazenamento) | `MEMORIADEMASSA` |
| DMA | `DMA` |
| Address bus (barramento de endereço) | `ADDRESSBUS` |
| Data bus (barramento de dados) | `DATABUS` |
| Microcontrolador | `MICROCONTROLADOR` |
| Dual core | `DUALCORE` |
| Quad core | `QUADCORE` |

---

## 5. Como o jogo funciona por dentro

### Fluxo do programa

```
PALAVRAS (lista de dados)
   │
   ▼
construirModelo()  → calcula as casas, os cruzamentos e a numeração
   │
   ▼
iniciarJogo()      → desenha o tabuleiro e as listas de pistas
   │
   ▼
eventos            → digitação, setas, cliques, Conferir e Reiniciar
```

### Etapas

1. **Dados.** A lista `PALAVRAS` em `script.js` guarda, para cada palavra, a resposta, a posição da primeira letra, a direção e a pista. O tabuleiro é **fixo**: é sempre o mesmo, o que mantém a numeração e as pistas estáveis.
2. **Modelo.** `construirModelo()` percorre cada palavra e registra suas casas num mapa. Quando duas palavras passam pela mesma casa, ela guarda as duas e confere se a letra é a mesma. Se não for, o jogo gera um erro no console.
3. **Numeração.** As casas iniciais recebem números em ordem de leitura (de cima para baixo e da esquerda para a direita). Palavras que começam na mesma casa dividem o mesmo número.
4. **Tabuleiro.** Só as casas que pertencem a alguma palavra viram campos de texto. As demais ficam vazias e invisíveis, formando o desenho da cruzadinha.
5. **Pistas.** Cada pista é um botão. Clicar nele leva o cursor à primeira casa da palavra e destaca a palavra inteira.
6. **Digitação.** Cada casa aceita só uma letra de A a Z. Ao digitar, o cursor vai para a próxima casa da palavra ativa. Uma casa onde duas palavras se cruzam pertence às duas, e a direção atual decide qual delas está ativa.
7. **Conferir.** Para cada palavra, o jogo junta as letras digitadas e compara com a resposta: igual vira ✓, com pelo menos uma letra digitada vira ✗, vazia fica sem marca. Depois pinta as casas e atualiza o contador e a mensagem.
8. **Reiniciar.** Apaga todas as letras, remove marcas e cores, zera o contador e volta o cursor para a primeira casa.

---

## 6. Como editar as palavras

Todas as palavras ficam na lista `PALAVRAS`, no início de `public/js/script.js`. Cada item tem este formato:

```js
{ resposta: 'CACHE', linha: 1, coluna: 5, direcao: 'H',
  pista: 'Pequena e muito veloz, guarda dados usados com frequência perto do processador.' }
```

| Campo | O que é |
| --- | --- |
| `resposta` | A palavra em maiúsculas, sem espaços e sem acentos |
| `linha` | Linha da primeira letra, **contando a partir de 0** |
| `coluna` | Coluna da primeira letra, **contando a partir de 0** |
| `direcao` | `'H'` para horizontal ou `'V'` para vertical |
| `pista` | O texto da pista |

A numeração das pistas e o tamanho do tabuleiro são calculados automaticamente.

**Cuidados ao mudar ou incluir palavras:**
- Cada palavra precisa cruzar com pelo menos uma outra, numa letra igual. Se as letras forem diferentes na mesma casa, o jogo mostra um erro no console do navegador.
- Evite encostar uma palavra de lado em outra sem cruzar. Isso cria sequências de letras que não pertencem a nenhuma pista.
- Mantenha as pistas com no máximo 15 palavras e sem a resposta, nem parte dela, nem a sigla por extenso.

---

## 7. Estrutura do projeto

```
ArquiCruza/
├── index.html           Página do jogo (na raiz do projeto)
├── README.md            Este arquivo
└── public/
    ├── css/style.css    Visual: cores, tabuleiro, pistas e layout responsivo
    └── js/script.js     Lógica: palavras, tabuleiro, teclado e conferência
```

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura da página: cabeçalho com "Como jogar", botões, contador, tabuleiro e listas de pistas |
| `public/css/style.css` | Aparência. O tamanho das casas se ajusta à largura da tela para funcionar no celular |
| `public/js/script.js` | Dados das palavras, montagem do tabuleiro, numeração, teclado, Conferir e Reiniciar |
