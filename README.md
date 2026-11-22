# ArquiCruza – Cruzadinha de Arquitetura de Computadores

Jogo de cruzadinha feito para quem está no **primeiro semestre** e quer fixar os termos básicos de **arquitetura computacional**. O jogador lê a pista, descobre o termo e digita a resposta direto no tabuleiro.

Feito apenas com **HTML, CSS e JavaScript puros** (sem bibliotecas, sem instalação).

## Como executar

Abra o arquivo `index.html` (na raiz do projeto) em qualquer navegador moderno. Não precisa de servidor.

## Estrutura do projeto

```
ArquiCruza/
├── index.html
├── README.md
└── public/
    ├── css/style.css
    └── js/script.js
```

## Como jogar

1. Leia as pistas nas listas **Horizontais** e **Verticais**. Cada número da lista aparece na casa onde a palavra começa no tabuleiro.
2. Clique na pista (ou direto numa casa do tabuleiro) e **digite a resposta, sem espaços e sem acentos**. Por exemplo, "address bus" é escrito `ADDRESSBUS`.
3. O número entre parênteses no fim da pista indica quantas letras a resposta tem.
4. Clique em **Conferir** para ver o resultado:
   - ✓ (verde) = palavra certa;
   - ✗ (vermelho) = palavra com letras erradas ou faltando;
   - pista sem marca = ainda sem resposta.
5. O contador mostra quantas palavras já estão certas (por exemplo, `8 de 16 palavras`).
6. **Reiniciar** limpa o tabuleiro e zera o contador.

### Atalhos de teclado

| Tecla | Ação |
| --- | --- |
| Letras (A–Z) | Preenchem a casa e avançam para a próxima da palavra |
| Setas | Movem entre as casas |
| `Espaço` ou `Enter` | Trocam entre horizontal e vertical |
| `Backspace` / `Delete` | Apagam a letra |

Clicar duas vezes na mesma casa também troca a direção.

## Regras do jogo

- O tabuleiro tem **16 palavras**, todas cruzadas com pelo menos uma outra.
- As pistas são numeradas e separadas em Horizontais e Verticais.
- Cada pista tem no máximo 15 palavras e não contém a resposta, nem parte dela, nem a sigla por extenso.

## Palavras e pistas

### Horizontais

| Nº | Resposta | Pista |
| --- | --- | --- |
| 4 | CPU | Cérebro do computador que busca, decodifica e executa as instruções dos programas. |
| 5 | CACHE | Pequena e muito veloz, guarda dados usados com frequência perto do processador. |
| 8 | ULA | Bloco do processador que realiza somas, subtrações e comparações lógicas. |
| 12 | MICROCONTROLADOR | Chip único que reúne processador, memória e periféricos, comum em sistemas embarcados. |
| 13 | REGISTRADORES | Pequenas memórias internas ao processador, as mais rápidas, que guardam dados em uso imediato. |
| 15 | DATABUS | Via de mão dupla que transporta o conteúdo trocado entre processador e memória. |
| 16 | FLASH | Não volátil regravável por blocos, usada em pendrives e cartões SD. |

### Verticais

| Nº | Resposta | Pista |
| --- | --- | --- |
| 1 | UC | Emite os sinais que coordenam os demais blocos a cada ciclo de operação. |
| 2 | QUADCORE | Processador com quatro núcleos de execução no mesmo chip. |
| 3 | MEMORIADEMASSA | Guarda grandes volumes de arquivos de forma permanente, como HDs e SSDs. |
| 6 | DUALCORE | Processador com dois núcleos de execução no mesmo chip. |
| 7 | EEPROM | Não volátil, regravável byte a byte sem retirar o chip da placa. |
| 9 | ADDRESSBUS | Via de sentido único que informa à memória qual posição será lida ou escrita. |
| 10 | DMA | Recurso que permite aos periféricos transferirem dados sem ocupar o processador. |
| 11 | ROM | Guarda, desde a fabricação, o programa de inicialização e não perde dados sem energia. |
| 14 | RAM | Espaço de trabalho principal, volátil, onde rodam aplicativos e dados em uso. |

### Termos de referência

| Termo | No tabuleiro |
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

## Como editar as palavras

Todas as palavras ficam na lista `PALAVRAS` no início de `public/js/script.js`. Cada item tem a resposta, a linha e a coluna da primeira letra, a direção (`H` ou `V`) e a pista. A numeração das pistas é calculada automaticamente. Se duas palavras se cruzarem numa letra diferente, o jogo avisa no console do navegador.
