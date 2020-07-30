# Analise-sentimento


![](https://raw.githubusercontent.com/lucasspi/analise-sentimento/master/src/assets/logo-brand.png)

## 1.0 - Rodar o Projeto
O projeto foi construido em React Native em sua versão mais atual "0.63.2". A instalação seguiu a risca os passos da opção de "React Native CLI Quickstart", descritos em: `https://reactnative.dev/docs/0.60/getting-started`. Vamos lá:

  - Para iniciar faça o clone do repositório: `git clone https://github.com/lucasspi/analise-sentimento.git`

  - Entre na pasta do Projeto `cd analise-sentimento`

  - Antes de rodar o projeto é necessário instalar as dependências locais: `npm install`

  - Finalmente, para rodar o projeto no simulador de iOS: `npx react-native run-ios`, caso você esteja utilizando o Android estudio: `npx react-native run-android`. Obs: `npx --version: 6.14.5`. Para rodar com algum dispositivo iOS específico use a flag --simulator="". Exemplo: `npx react-native run-ios --simulator="iPhone SE"`



## 2.0 - Decisões tomadas
#### 2.1 - Libs Utilizadas
* [Moment.js](https://momentjs.com/docs/) - Formatação de timezone
* [React-redux](https://react-redux.js.org/api/hooks) - Armazenamento de estados de aplicações
* [Twitter](https://www.npmjs.com/package/twitter) - Biblioteca utilizada para receber API_KEY e listar Tweets
* [@Google-cloud/language](https://www.npmjs.com/package/@google-cloud/language) - utilizado para avaliar os sentimentos

#### 2.2 - Linha de programação
A solução adotada foi componentizar deixar o código mais limpo e para isso cada módulo foi dividido em um componente. A fim de melhorar a performace e a legibilidade do código.

A linha de código adotada foi a de functional components, mais conhecidos como Hooks. Isso nos permite que usar o state e outros recursos do React sem escrever uma classe, deixando o código menos verboso e mais perfomático.

#### 2.3 - Sobre as tema e estilos

Sobre o uso de estilos foi tomada a decisão de usar um template de cores, tamanho de fontes e peso de fonte, com intuito de padronizar o estilo em todo o app e facilitar a mudança de tema, caso necessário.
Com esta solução é necessário mudar apenas um componente (`src/constants/theme.js`) para mudar todas as cores do App, o que nos facilita muito o caminho para futuras otimizações.

#### 2.4 Sobre a fonte de dados
Dei uso a um simples redux que é a unica "fonte de verdade" do App. Para essa implementação usei o Hook `useSelector`, que substitui de forma bem drástica a verbosa implementação do redux no modelo de classes com o connect().
Nosso redux cobre:
- A captação do nome do usuário (`USER_NAME`),
- A lista de tweets (`TWITTER_LIST`)

#### 2.5 Constantes e Chaves de Api
Criei um arquivo no diretório `src/environments/config.js` para concentrar todas as constantes de server, api e chaves secretas. 
Desta forma, caso haja mudança em alguma das constantes é necessário alterar em apenas um arquivo.

Obs: Notem que neste arquivo config.js, na opção "api", está cadastrado um servidor em produção. Para que fosse possível realizar os testes sem muito esforço, coloquei o controller que o aplicativo consome em uma api pessoal que já está rodando no EC2 da aws. No próximo ponto falo sobre este controller.

#### 2.6 Consumo de dados
Quanto ao consumo de dados de API's decidi centralizar no mobile o consumo em apenas uma fonte. Para centralizar criei dois métodos em uma API em NodeJs:

 - AnalyzeSentiment (POST): recebe o texto do tweet e envia para a api do @google-cloud/language e faz a análise do sentimento.
 - Twitter (GET): recebe nos parametros o usuário do twitter que o usuário do app deseja ver e em seguida lista os últimos 20 tweets.

O controller usado na API está demonstrado no diretório: `src/api/index.js`. Como o diretório é público, tive que omitir os dados da api e credenciais do google, mas para que fosse possível tive que solicitar uma credencial no Google Console Developer e em seguida criar uma aplicação no Twitter Developers.


## 3.0 - Sobre a construção e testes
#### 3.1 - Reporte de trabalho
Para chegar no ponto que está foi demandado cerca de 7 horas de trabalho.
- Terça-feira (28/07) - 3 horas
- Quarta-feira (29/07) - 4 horas

#### 3.2 - Testes
Realizei testes manuais:
- Tela Intro: Nome com muitos caracteres, nome sem nenhum caracter. Testes de design (se com o teclado a experiencia do usuário é afetada);
- Tela de Listar Tweets: Usuário inserido inexistente, usuário inserido não tem tweets, usuário inserido com muitos tweets. 