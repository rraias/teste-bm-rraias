const userRepository = require('../repositories/UsersRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
	async authenticate(request, response) {
		const { email, password } = request.body;


		const user = await userRepository.findByEmail({email});

		if(!user){
			return response.status(401).json({error: 'Usuário não encontrado.'});
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword){
			return response.status(401).json({error: 'Senha inválida.'});
		}

		const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

		const {id} = user;

		return response.json({id, token});
	}
}

module.exports = new AuthController();
