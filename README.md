# my Chords

Projeto frontend em **React + Vite** e backend em **Node.js + Express**.

## Descrição

O **my Chords** é um aplicativo que exibe letras e cifras de músicas. Através de uma API que armazena arquivos `.txt` com o conteúdo das músicas, ele permite:

- **Página Home**:  
  - Barra de pesquisa de músicas  
  - Campo com sugestões de músicas  
  - Histórico das últimas músicas acessadas  

- **Página Minha Playlist**:  
  - Exibe links das músicas adicionadas à playlist  

- **Comportamento ao clicar em qualquer link** (seja em sugestões, histórico ou minha playlist):  
  - Exibe a letra e cifra da música selecionada  
  - Mostra botão para adicionar a música na playlist
  - Ao clicar no botão, a música é adicionada à playlist e um link para ela é criado na página Minha Playlist para acesso rápido  

## Tecnologias

- Frontend: React + Vite  
- Backend: Node.js + Express  
- API para servir os arquivos `.txt` com letras e cifras

  ## Melhorias

  - verificar o objeto songs no frontend.
  - testar que o crud no backend
  - permitir usuario fazer login
  - salvar suas musicas na playlist independente em qual maquina o usuário acessar
  - tornar o aplicativo instalável

