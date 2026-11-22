# Caça-Palavras: Termos de Arquitetura de Computadores

Este projeto implementa um caça-palavras educativo com termos de arquitetura de computadores, como pedido no arquivo implementacao_Caça_Palavra.md.

O jogo foi feito com HTML, CSS e JavaScript puros e está localizado na pasta raiz deste projeto.

Como abrir

1. Abra o arquivo index.html no seu navegador (AtividadeCaçaPalavra/index.html).

Como jogar

- Leia as pistas à direita (separadas entre Horizontais e Verticais).
- Digite as letras nas casas do tabuleiro para formar as palavras pesquisadas.
- Clique em "Conferir" para ver quais palavras estão corretas (células em verde) e quais estão erradas (células em vermelho).
- O contador mostra quantas palavras estão corretas: por exemplo "8 de 16 palavras".
- Clique em "Reiniciar" para limpar o tabuleiro e tentar novamente.

Palavras usadas e pistas

1. CPU — Unidade central que coordena o processamento.
2. ULA — Parte da CPU que realiza operações aritméticas e lógicas.
3. UC — Componente que controla a execução de instruções na CPU.
4. REGISTRADORES — Pequenas unidades de armazenamento dentro da CPU para dados temporários.
5. RAM — Memória volátil usada para armazenar dados em uso.
6. ROM — Memória de leitura, não volátil, com instruções fixas.
7. EEPROM — Memória não volátil que pode ser reprogramada eletricamente.
8. FLASH — Memória não volátil usada em armazenamento removível e firmware.
9. CACHE — Memória rápida entre CPU e memória principal para acelerar acesso.
10. MEMORIADEMASSA — Armazenamento permanente de grandes volumes de dados.
11. DMA — Mecanismo que permite transferir dados sem usar intensamente a CPU.
12. ADDRESSBUS — Barramento que transporta endereços de memória.
13. DATABUS — Barramento que transporta dados entre componentes.
14. MICROCONTROLADOR — Circuito integrado com CPU, memória e periféricos integrados.
15. DUALCORE — Processador com duas unidades de execução independentes.
16. QUADCORE — Processador com quatro unidades de execução independentes.

Observações de implementação

- O tabuleiro é gerado dinamicamente em uma grade 15x15.
- As palavras são posicionadas aleatoriamente nas direções horizontal, vertical e diagonal (para permitir cruzamentos legítimos).
- O jogador deve preencher o tabuleiro manualmente; o jogo não revela letras.
- As pistas foram escritas para não conterem a resposta explícita.

Próximos passos (opcionais)

1. Persistir a posição do usuário (localStorage) para continuar jogo.
2. Permitir seleção de palavras com mouse em vez de digitar as letras.
3. Renderizar automaticamente numeração das pistas baseada nas posições iniciais.

Boa sorte e bons estudos!
