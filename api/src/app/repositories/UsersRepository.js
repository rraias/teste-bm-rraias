const fs = require('fs');
const db = require('../../database/users.json');

const path = './src/database/users.json';
const encode = 'utf-8';



class UserRepository {

	async findAll() {
		const users = JSON.parse(fs.readFileSync(path, encode));
		return users;
	}

	async findByEmail({email}) {
		const userByEmail = db.find((user) => user.email === email);
		return userByEmail;
	}

	async findById(id) {
		const userById = db.find((user) => user.id === parseInt(id));
		return userById;
	}

	async findUserIndex(id) {
		const userIndex = db.findIndex((user) => user.id === parseInt(id));
		return userIndex;
	}

	async create( {name, birthday, gender, email, password} ) {
		const data = [
			...db,
			{
				id: db.length + 1,
				name,
				birthday,
				gender,
				email,
				password
			}
		];

		fs.writeFileSync(path, JSON.stringify(data), encode);
	}

	async update(id, {name, birthday, gender}) {
		const users = db.map((user) => (
			user.id === parseInt(id) ? {
				...user,
				name,
				birthday,
				gender
			} : user
		));
		fs.writeFileSync(path, JSON.stringify(users), encode);
	}

	async delete(id){
		const users = db.filter((user) => user.id !== parseInt(id));
		fs.writeFileSync(path, JSON.stringify(users), encode);
	}

}

module.exports = new UserRepository();
