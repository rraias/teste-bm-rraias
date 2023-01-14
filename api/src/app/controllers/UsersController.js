const UserRepository = require('../repositories/UsersRepository');
const bcrypt = require('bcrypt');


class UserController {


	async index(request, response){
		const allUsers = await UserRepository.findAll();
		response.json(allUsers);
	}

	async show(request, response){
		const {id} = request.params;
		const {userId} = request;

		const userExists = await UserRepository.findById(id);

		if(!userExists){
			return response.status(404).json({ error: 'Usuário não encontrado.' });
		}

		if (parseInt(id) !== userId){
			return response.status(400).json({ error: 'Problemas na validação do usuário.' });
		}

		const user = await UserRepository.findById(id);
		response.json(user);
	}

	async store (request, response) {
		let {
			name, birthday, gender, email, password
		} = request.body;

		if(!name){
			return response.status(400).json({ error: 'Nome é obrigatório!' });
		}

		if(!birthday){
			return response.status(400).json({ error: 'Data de nascimento é obrigatório!' });
		}

		if(!email){
			return response.status(400).json({ error: 'E-mail é obrigatório!' });
		}

		if(email){
			const userExists = await UserRepository.findByEmail({email});

			if(userExists) {
				return response.status(400).json({ error: 'Esse e-mail já está em uso.' });
			}
		}

		if(!password){
			return response.status(400).json({ error: 'Data de nascimento é obrigatória!' });
		}

		if(password && password.length < 8) {
			return response.status(400).json({ error: 'A senha precisa ter 8 dígitos' });
		}

		password = await bcrypt.hash(password, 10);

		await UserRepository.create({
			name, birthday, gender, email, password
		});

		response.sendStatus(201);

	}

	async delete (request, response) {
		const {id} = request.params;

		const userExists = await UserRepository.findById(id);

		if(!userExists){
			return response.status(404).json({ error: 'Usuário não encontrado.' });
		}

		await UserRepository.delete(id);

		response.sendStatus(204);
	}

	async update (request, response) {
		const {id} = request.params;
		const {userId} = request;
		const {
			name, birthday, gender
		} = request.body;


		if (parseInt(id) !== userId){
			return response.status(400).json({ error: 'Problemas na validação do usuário.' });
		}

		if(!name){
			return response.status(400).json({ error: 'Nome é obrigatório!' });
		}


		if(!birthday){
			return response.status(400).json({ error: 'Data de nascimento é obrigatória!' });
		}

		const userExists = await UserRepository.findById(id);

		if(!userExists){
			return response.status(404).json({ error: 'Usuário não encontrado.' });
		}

		await UserRepository.update(id, {name, birthday, gender});

		response.sendStatus(200);
	}
}

module.exports = new UserController();
