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

    test('deve adicionar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Estudar', data: '2024-09-01', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toHaveLength(1);
    });

    test('deve marcar uma tarefa como concluída', () => {
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
});