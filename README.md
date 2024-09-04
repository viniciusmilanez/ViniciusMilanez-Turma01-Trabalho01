# JEST Unit Tests

## Getting Started

In order to execute this project you must follow the steps below:

1. Run `npm install` para instalar as dependencias do projeto
1. Run `npm run test` para executar o teste
1. Run `npm run coverage` para executar o teste de coverage

All execution artifacts can be found in `./coverage`, if you want to remove these files run `npm run clean`.

# Validações
    √ Deve contar corretamente o número de tarefas (2 ms)                                                                                         
    √ Deve adicionar uma tarefa                                                                                                                   
    √ Deve lançar erro ao adicionar uma tarefa com descrição inválida (8 ms)                                                                      
    √ Deve marcar uma tarefa como concluída (1 ms)                                                                                                
    √ Deve atualizar uma tarefa com novos dados                                                                                                   
    √ Deve adicionar múltiplas tags a uma tarefa                                                                                                  
    √ Não deve alterar as tarefas ao tentar remover uma tarefa com ID inválido (1 ms)                                                             
    √ Deve retornar undefined ao buscar uma tarefa com ID inválido                                                                                
    √ Deve retornar uma lista vazia ao listar tarefas por prioridade quando não há tarefas (1 ms)                                                 
    √ Deve listar tarefas por descrição (1 ms)                                                                                                    
    √ Deve atualizar a prioridade de uma tarefa                                                                                                   
    √ Deve reordenar tarefas por data                                                                                                             
    √ Deve reordenar tarefas por prioridade                                                                                                       
    √ Deve reabrir uma tarefa concluída                                                                                                           
    √ Deve lidar com datas inválidas ao adicionar tarefas                                                                                         
    √ Deve listar tarefas por tag                                                                                                                 
    √ Deve remover uma tag de uma tarefa corretamente                                                                                             
    √ Deve remover todas as tarefas concluídas                                                                                                    
    √ Deve lidar corretamente com a reabertura e marcação de tarefas como concluídas (1 ms)                                                       

## Project Structure
</br>
<ul>
    <li>src: source code</li>
    <li>test: unit test files</li>
</ul>
