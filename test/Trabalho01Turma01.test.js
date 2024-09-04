const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('Testando métodos da classe GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Deve contar corretamente o número de tarefas', () => {
        const tarefa1 = { id: 32, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 33, descricao: 'Tarefa 2' };

        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.contarTarefas()).toBe(2);
        gerenciador.removerTarefa(32);
        expect(gerenciador.contarTarefas()).toBe(1);
    });

    test('Deve adicionar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Estudar', data: '2024-09-01', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toHaveLength(1);
    });

    test('Deve lançar erro ao adicionar uma tarefa com descrição inválida', () => {
        const tarefa = { id: 2, descricao: 'ab' }; // Descrição muito curta
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('Deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 6, descricao: 'Estudar matemática', data: '2024-09-06', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(6);
        expect(gerenciador.buscarTarefaPorId(6).concluida).toBe(true);
    });

    test('Deve atualizar uma tarefa com novos dados', () => {
        const tarefa = { id: 34, descricao: 'Tarefa antiga', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(34, { descricao: 'Tarefa nova', prioridade: 1 });

        const tarefaAtualizada = gerenciador.buscarTarefaPorId(34);

        expect(tarefaAtualizada.descricao).toBe('Tarefa nova');
        expect(tarefaAtualizada.prioridade).toBe(1);
    });

    test('Deve adicionar múltiplas tags a uma tarefa', () => {
        const tarefa = { id: 35, descricao: 'Tarefa com múltiplas tags' };

        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(35, 'Urgente');
        gerenciador.adicionarTagATarefa(35, 'Importante');

        const tarefaComTags = gerenciador.buscarTarefaPorId(35);
        expect(tarefaComTags.tags).toContain('Urgente');
        expect(tarefaComTags.tags).toContain('Importante');
    });

    test('Não deve alterar as tarefas ao tentar remover uma tarefa com ID inválido', () => {
        const tarefa1 = { id: 36, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 37, descricao: 'Tarefa 2' };

        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        
        gerenciador.removerTarefa(999); // ID inválido
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('Deve retornar undefined ao buscar uma tarefa com ID inválido', () => {
        const tarefa = { id: 38, descricao: 'Tarefa válida' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(999)).toBeUndefined(); // ID inválido
    });

    test('Deve retornar uma lista vazia ao listar tarefas por prioridade quando não há tarefas', () => {
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([]);
    });

    test('Deve listar tarefas por descrição', () => {
        const tarefa1 = { id: 39, descricao: 'Tarefa importante' };
        const tarefa2 = { id: 40, descricao: 'Outra tarefa importante' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        
        expect(gerenciador.buscarTarefaPorDescricao('importante')).toEqual([tarefa1, tarefa2]);
    });

    test('Deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 41, descricao: 'Prioridade baixa', prioridade: 3 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(41, 1);
        
        expect(gerenciador.buscarTarefaPorId(41).prioridade).toBe(1);
    });

    test('Deve reordenar tarefas por data', () => {
        const tarefa1 = { id: 42, descricao: 'Tarefa 1', data: '2024-09-02' };
        const tarefa2 = { id: 43, descricao: 'Tarefa 2', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });

    test('Deve reordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 44, descricao: 'Tarefa 1', prioridade: 2 };
        const tarefa2 = { id: 45, descricao: 'Tarefa 2', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });

    test('Deve reabrir uma tarefa concluída', () => {
        const tarefa = { id: 46, descricao: 'Tarefa concluída', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(46);
        
        expect(gerenciador.buscarTarefaPorId(46).concluida).toBe(false);
    });

    test('Deve lidar com datas inválidas ao adicionar tarefas', () => {
        const tarefa = { id: 47, descricao: 'Tarefa com data inválida', data: 'invalid-date' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(47).data).toBe('invalid-date');
    });

    test('Deve listar tarefas por tag', () => {
        const tarefa1 = { id: 48, descricao: 'Tarefa com tag', tags: ['importante'] };
        const tarefa2 = { id: 49, descricao: 'Outra tarefa com tag', tags: ['urgente'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        
        expect(gerenciador.listarTarefasPorTag('importante')).toEqual([tarefa1]);
        expect(gerenciador.listarTarefasPorTag('urgente')).toEqual([tarefa2]);
    });

    test('Deve remover uma tag de uma tarefa corretamente', () => {
        const tarefa = { id: 50, descricao: 'Tarefa para testar tags', tags: ['tag1', 'tag2'] };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(50, 'tag1');
        
        const tarefaAtualizada = gerenciador.buscarTarefaPorId(50);
        expect(tarefaAtualizada.tags).not.toContain('tag1');
        expect(tarefaAtualizada.tags).toContain('tag2');
    });

    test('Deve remover todas as tarefas concluídas', () => {
        const tarefa1 = { id: 51, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 52, descricao: 'Tarefa 2', concluida: false };
        const tarefa3 = { id: 53, descricao: 'Tarefa 3', concluida: true };
        
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);

        gerenciador.removerTarefasConcluidas();

        expect(gerenciador.contarTarefas()).toBe(1);
        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('Deve lidar corretamente com a reabertura e marcação de tarefas como concluídas', () => {
        const tarefa = { id: 54, descricao: 'Tarefa a ser testada', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        
        gerenciador.marcarTarefaComoConcluida(54);
        expect(gerenciador.buscarTarefaPorId(54).concluida).toBe(true);
        
        gerenciador.reabrirTarefa(54);
        expect(gerenciador.buscarTarefaPorId(54).concluida).toBe(false);
    });
});
