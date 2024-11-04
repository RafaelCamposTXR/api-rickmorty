# Rick and Morty API Front-End

## Disclaimer
Eu construí a aplicação de maneira que ficasse didático a estrutura dos componentes dentro do aplicativo, e atendesse o escopo da proposta, um aplicativo de escala menor que demonstrasse o que eu já sei do framework. Por conta disso, eu não otimizei o tamanho dos bundles, não por não estar ciente da sua importância para a velocidade do site em um ambiente de deploy real, mas sim para facilitar o entendimento do app. Para separar os componentes em submódulos, eu dividiria a geração do menu de personagens, atualmente sendo feita nos componentes home e favorites, para um componente próprio, que aliviaria o peso destinado aos dois que eu mencionei.

## Descrição
Este é um aplicativo desenvolvido para explorar a API pública de Rick and Morty. O app permite que os usuários visualizem personagens, busquem por eles e adicionem seus favoritos. Ele foi construído utilizando Angular e a biblioteca NGXS para gerenciar o estado da aplicação. Foi visado o uso de diretivas estruturais, e a otimização da interface de maneira responsiva, incluindo comportamento adequado em dispositivos mobile

## Funcionalidades

- **Listagem de Personagens:** Os usuários podem navegar por uma lista de personagens do universo de Rick and Morty.
- **Busca de Personagens:** É possível buscar personagens por nome, facilitando a localização de favoritos.
- **Favoritos:** Os usuários podem adicionar ou remover personagens de sua lista de favoritos.
- **Paginação:** A navegação entre páginas de personagens é suportada, permitindo um acesso mais fácil ao conteúdo, aproveitando do sistema integrado na api pública.
- **Interface Responsiva:** Os estilos foram pensados para incluir comportamento em ambiente desktop e mobile, adaptando às necessidades de cada

## Tecnologias Utilizadas

- **Frontend:** Angular
- **Gerenciamento de Estado:** NGXS
- **Estilos:** SCSS
- **API:** Rick and Morty API
