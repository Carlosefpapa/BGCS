# Especificações do Projeto

## Personas

1. **João Pedro**

João tem 16 anos, é estudante de curso técnico e faz estágio de 4 horas em uma empresa de tecnologia. Um dos objetivos de João Pedro é ingressar no mercado de trabalho como funcionário fixo, antes de finalizar o seu curso técnico na área de engenharia.

Um dos direcionamentos que João Pedro dá para seus gastos é o entretenimento. João gosta muito de assistir filmes, seriados e animes japoneses. Além disso, ele tem gostos específicos: gosta de filmes de suspense e terror, seriados de comédia/família, e animes de ação e robôs. Já que existem muitos serviços de streaming e o orçamento de João é apertado, ele gostaria de poder usar alguma ferramenta para poder filtrar e encontrar as coisas que mais gosta.

2. **Carlos Augusto**

Carlos tem 26 anos, é solteiro, recém formado na faculdade de engenharia e trabalha em uma empresa de projetos de engenharia civil com uma carga horária de trabalho diário de 12 a 14 horas durante seu dia.

Carlos Augusto é um Workaholic viciado em horas extras no qual utiliza grande parte do seu orçamento em alguns pacotes de Streaming, aplicações em Criptomoedas, jogos na Steam e academia durante a madrugada. Carlos gostaria de utilizar seu pouco tempo livre para direcionar sua atenção nas séries e conteúdos online de seu interesse no qual se adeque no seu ritmo diário.

Como ele é uma pessoa de gostos simples, sua prioridade é assistir séries de curta duração sem muito apelo psicológico ou filmes de ação com bastante pancadaria e muitas explosões. Ele tem interesse em utilizar uma ferramenta capaz de pesquisar em todos os seus serviços de streaming favoritos onde possa demonstrar a duração de tempo de um filme, quantidade de episódios da série, notas de popularidade e que seja capaz filtrar seu estilo de conteúdo favorito e atores desejados.

3. **Bruna Ferreira**

Bruna tem 43 anos, é divorciada e tem um filho de 5 anos. Bruna é uma psicóloga bem conceituada, trabalha em um hospital em três vezes por semana na segunda, terça e sexta-feira de 8:00 às 12:00 e na quinta-feira de 16:00 às 21:30 em seu consultório particular. Bruna passa muito tempo sem vê seu filho pois fica em uma escola no tempo integral.

Bruna tem algumas metas que são: passar um maior tempo possível com o seu filho para ajudar na sua criação e gastar o tempo livre de suas noites com entretenimento. Bruna é apaixonada por filmes românticos e dramáticos porém ela não gosta de seriados, devido a longa duração dos seriados e pela falta de tempo. Como Bruna tem um filho de 5 anos, gosta de assistir conteúdo infantil juntamente dele nos mesmos serviços de streaming.

Ela precisa de um serviço capaz de indicar os melhores conteúdo infantis e também filtrar os seus gostos pessoais.

4. **José Maia**

José tem 36 anos e é doutorando em física pela Universidade Federal. No seu tempo livre, José gosta de assistir séries e, ocasionalmente filmes de ficção científica. Ele não é muito bom com serviços de streaming e nem em pesquisar conteúdo, e a principal dor dele é obter recomendações e indicações para as coisas que já gosta, as séries e filmes que já assiste e já assistiu ou já ouviu falar. José não gosta de conteúdo meloso ou romântico, então também é importante para ele poder filtrar o gênero das coisas que buscaria assistir. Além de tudo isso, José busca conteúdo multimídia dos que gostaria de assistir, como imagens, trailers, posteres etc. 

Em suma, José precisa poder filtrar o gênero do conteúdo que assiste, buscando principalmente por ficção científica; ele quer receber recomendações, indicações baseadas no que visita, além de conseguir visualizar conteúdo multimidia das exibições que visita.

5. **Leonardo Gomes**

Leonardo tem 23 anos, estudante de direito e é apaixonado por filmes, em seu tempo livre costuma maratonar series e sagas que lhe chamam atenção. Contudo não possui assinatura de múltiplos serviços de streaming por motivos financeiros. Possuindo apenas a assinatura de dois serviços, Leonardo costuma utilizar ambos para assistir o conteúdo original da plataforma, alternando entre series e filmes de acordo com o tempo disponível para assistir.
Leonardo precisa de uma aplicação em que, alem de pesquisar filmes e series de sua escolha ele possa filtrar o conteúdo existente em um serviço de tremais de sua escolha, podendo assim visualizar e pesquisar o melhor que a plataforma escolhida pode oferecer.


## Histórias de Usuários

### Diagrama de casos de uso

![Diagrama de Casos de Uso](img/Caso%20de%20Uso%20-%20BGCS.png)

### Casos de Uso

1. Pesquisa de Filmes 
2. Pesquisa de Series
3. Visualização de filmes
4. Visualização de series
5. Visualizar serviços de streamings 
6. Filtragem de conteúdo
7. Filtragem de gênero
8. Visualizar conteúdo multimídia
9. Navegar por recomendações e indicações
10. Filtragem por plataforma de streaming
11. Manter Usuários

**Baseando-se nos perfis de personas detalhados acima, segue as histórias de usuários:**
<html>
<body>
<!--StartFragment-->

EU COMO JOAO PEDRO| QUERO/PRECISO | PARA | # CASO DE USO
-- | -- | -- | --
Usuário do sistema | Filtrar o conteúdo | Exibir somente o que eu quero pesquisar | 6 
Usuário do sistema | Visualizar em qual plataforma o conteúdo está disponível | Verificar se já é assinante ou não | 5

<!--EndFragment-->
</body>
</html>

<html>
<body>
<!--StartFragment-->

EU COMO CARLOS AUGUSTO| QUERO/PRECISO | PARA | # CASO DE USO
-- | -- | -- | --
Usuário do sistema | Exibir o tempo de duração do conteúdo  | Não perder seu pouco tempo livre | #
Usuário do sistema | Exibir a quantidade de episódios de uma série | Acompanhar as séries mais curtas | #

<!--EndFragment-->
</body>
</html>

<html>
<body>
<!--StartFragment-->

EU COMO BRUNA FERREIRA| QUERO/PRECISO | PARA | # CASO DE USO
-- | -- | -- | --
Usuário do sistema | Exibir o gênero do conteúdo  | Direcionar sua atenção para seu conteúdo favorito | 7
Usuário do sistema | Filtrar catálogo infantil  | Passar o maior tempo possível com seu filho | #
<!--EndFragment-->
  
<!--StartFragment-->

EU COMO JOSÉ MAIA| QUERO/PRECISO | PARA | # CASO DE USO
-- | -- | -- | --
Usuário do sistema | Visualizar conteúdo multimídia  | Identificar facilmente os elementos da pesquisa | 8
Usuário do sistema | Navegar por recomendações e indicações  | Assistir somente o que for parecido com o que já conheço | 9
<!--EndFragment-->
  
  <!--StartFragment-->

EU COMO LEONARDO GOMES| QUERO/PRECISO | PARA | # CASO DE USO
-- | -- | -- | --
Usuário do sistema | Pesquisar filmes/series  | Assistir conteudo presente na plataforma em seu tempo livre para diversão e distração | 1
Usuário do sistema | Filtrar conteúdo por serviço de streaming  | Visualizar somente filmes/series dos serviços que assino | 10
<!--EndFragment-->
  
  
</body>
</html>

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deverá ter uma funcionalidade de busca | ALTA | 
|RF-002| A aplicação deverá fazer gestão por conteúdo (filmes e séries) | ALTA |
|RF-003| A aplicação deverá fazer gestão por plataformas | MÉDIA |
|RF-004| A aplicação deverá fazer gestão de conta de usuário  |MÉDIA| 
|RF-005| A aplicação deverá retornar recomendações a partir de sua busca |MÉDIA| 
|RF-006| A aplicação deverá informar lançamento importantes (baseado nos mais populares em pesquisa no momento)  |MÉDIA| 
|RF-007| A aplicação deverá informar as series com as melhoras notas |MÉDIA| 
|RF-008| A aplicação deverá conter um perfil infantil e perfil completo |BAIXA| 
|RF-009| A aplicação deverá informar a idade da classificação indicativa  |BAIXA| 
|RF-010| A aplicação deverá informar os conteúdos já assistidos e desejados |BAIXA| 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva e funcionar no máximo de telas possíveis | MÉDIA | 
|RNF-002| As consultas devem ser realizadas com 5s ou menos | MÉDIA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre nas disciplinas TecWeb e PSI/Lab PSI |
|02| A aplicação não pode ser um sistema desktop|
|03| A fonte de dados será baseada em consultas em APIs|
