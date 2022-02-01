### Storage Manager

Desafio do curso de FullStack Developer da TRYBE https://www.betrybe.com/

# Avisos.
- Os testes usando mocha só estão disponíveis na branch de testes 'testing-branch' visto que tive dificuldades incortornáveis em implementar o typescript no mocha

## Tech em uso

[NodeJs] API </br>
Criação de uma API RestFul utilizando express e MySQL como database </br>
Uso de typescript para tipar as funções.
Uso da biblioteca mocha para cobrir toda a aplicação em testes.


# Habilidades desenvolvidas.

-Componentizar a API em pastas com diferentes propósitos, como a pásta services, models e controllers, seguindo o padrão Rest </br>

-Fazer uso do banco de dados MySql para armazenar e lidar com os requests </br>

-Fazer uso do Express para lidar com as requisições </br>

-Tipar todo o código para torna-lo mais confiável </br>

-Cobrir a aplicação inteira com testes usando mocha </br>

-Aprender a lidar com regras de negócio que utilizam diferentes endpoints </br>


# O que foi desenvolvido.

Uma API que possui dois endpoints principais, o sales e o products. No product pode-se adicionar, atualizar, remover ou buscar uma lista de produtos, podendo especificar o nome e a quantidade do mesmo. No endpoint sales é possível criar, editar, excluir e buscar vendas, sendo que só é possível criar e editar as vendas caso a quantidade de produtos vendidos seja compatível com a quantidade em estoque.

  - Criar, editar, excluir e listar os produtos no banco de dados.
  - Criar, editar, excluir e listar as vendas no banco de dados.
  - Só é possível realizar ou editar uma venda caso a quantidade em estoque cubra a quantidade da venda.
  - É impossível comprar mais produtos do que o disponível em estoque.

# Como rodar a aplicação

Para rodar a aplicação é necessário rodar no terminal `yarn`ou `npm install` e criar um banco de dados. A tabela que precisa ser criada está dispoível no arquivo StorageManager.sql no root da aplicação.
Além disso é necessário criar um arquivo `.env` com o seguinte formato no root da aplicação:
```
MYSQL_HOST=<endreço, ex:localhost>
MYSQL_USER=<usuario do mysql>
MYSQL_PASSWORD=<senha do mysql>
PORT=<porta em que a a aplicação irá rodar, ex:3000>
```
