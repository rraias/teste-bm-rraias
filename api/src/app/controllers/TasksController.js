const TasksRepository = require('../repositories/TasksRepository');
const TaskRepository = require('../repositories/TasksRepository');


class TaskController {


	async index(request, response){
		const allTasks = await TaskRepository.findAll();
		response.json(allTasks);
	}

	async store (request, response) {
		let {
			id, title, description, priority, expiresIn, stage
		} = request.body;

		if(!title){
			return response.status(400).json({ error: 'Defina um título para a tarefa!' });
		}

		if(!description){
			return response.status(400).json({ error: 'Insira uma descrição a tarefa!' });
		}

		if(!priority){
			return response.status(400).json({ error: 'Defina uma prioridade para a tarefa!' });
		}

		if(!priority){
			return response.status(400).json({ error: 'Insira o prazo!' });
		}

		if(!stage){
			return response.status(400).json({ error: 'Insira a etapa da tarefa!' });
		}

		await TasksRepository.create(id, {
			title, description, priority, expiresIn, stage
		});

		response.sendStatus(201);
	}

	async update (request, response) {
		const {id} = request.params;
		const {stage} = request.body;

		const task = await TaskRepository.update(id, stage);

		response.status(200).json(task);
	}

	async delete (request, response) {
		const {id} = request.params;

		const taskExists = await TaskRepository.findById(id);

		if(!taskExists){
			return response.status(404).json({ error: 'Tarefa não encontrada' });
		}

		await TaskRepository.delete(id);

		response.sendStatus(204);
	}

}

module.exports = new TaskController();
