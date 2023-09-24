# Schedulefy - Planejador de grades de horários

## Descrição

Este projeto tem como objetivo auxiliar os alunos da Universidade Federal do Agreste de Pernambuco (UFAPE) a planejarem suas grades de horários.

## Como usar

Para usar o planejador, basta acessar [este link](https://docs.google.com/spreadsheets/d/1Ocui0qN1ohlgriu0s6ysKpuLViiYEiVEKY_OiwK0md0/edit?usp=sharing) e fazer uma cópia do arquivo. Após isso, você pode editar o arquivo e planejar sua grade de horários.

Para preencher corretamente a planilha, siga as instruções abaixo:

### Preenchendo a planilha

A planilha possui 6 colunas, sendo elas:

- **Curso**: Nome da disciplina
- **Professor**: Nome do professor da disciplina
- **Dia da semana**: Dia da semana em que a disciplina ocorre
- **Horário**: Horário da disciplina
- **Optativa**: Indica se a disciplina é optativa ou não
- **Deve estar presente na grade final**: Indica se a disciplina deve estar presente na grade final [Não implementado ainda]

O campo de horário tem somente duas opções de preenchimento a princípio:

- **Primeira Aula**: Indica que a disciplina ocorre na primeira aula do dia
- **Segunda Aula**: Indica que a disciplina ocorre na segunda aula do dia
  Atualizações futuras podem adicionar mais opções de preenchimento.

Nota: Se a disciplina for ministrada em mais de um horário, basta adicionar uma linha para cada horário.

### Gerando a grade de horários

Primeiramente clone o repositório:

```bash
git clone https://github.com/<seu_usuario>/Schedulefy.git
```

Após preencher a planilha, você precisa:

- Limpar as linhas não utilizadas !Importante
- Fazer o download da planilha em formato .csv
- alterar o nome do arquivo para "input_file.csv"
- Adicionar o arquivo no diretório "input" deste projeto
- Instalar as dependências do projeto `npm install`
- Executar o script `npm run generate schedules`

### Resultado

O resultado será um arquivo chamado "schedule\_<Date>.txt" no diretório "output" deste projeto. Este arquivo contém todas as possíveis grades de horários que podem ser geradas a partir das disciplinas informadas na planilha.

## Contribuindo

Para contribuir com o projeto, basta fazer um fork do repositório, fazer as alterações desejadas e enviar um pull request.
