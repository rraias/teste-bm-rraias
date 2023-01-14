const fs = require('fs');
const db = require('../../database/tasks.json');

const path = './src/database/tasks.json';
const encode = 'utf-8';

class TaskRepository {

	async findAll() {
		const tasks = JSON.parse(fs.readFileSync(path, encode));
		return tasks;
	}

	async findById(id) {
		const taskById = db.find((task) => task.id === parseInt(id));
		return taskById;
	}

	async create( id, {title, description, priority, expiresIn, stage} ) {
		const data = [
			...db,
			{
				id: db.length + 1,
				authorId: id,
				title,
				description,
				priority,
				expiresIn,
				stage
			}
		];

		fs.writeFileSync(path, JSON.stringify(data), encode);
	}

	async update(id, stage) {


		const updateTasks = db.map((task) => (
			(task.id === parseInt(id)) ?
				{
					...task,
					stage
				} : task
		));
		fs.writeFileSync(path, JSON.stringify(updateTasks), encode);
		return updateTasks;
	}

	async delete(id){
		const tasks = db.filter((task) => task.id !== parseInt(id));
		fs.writeFileSync(path, JSON.stringify(tasks), encode);
	}
}

module.exports = new TaskRepository();
