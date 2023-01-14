const jwt = require('jsonwebtoken');

function authMiddleware(request, response, next) {
	const { authorization } = request.headers;

	if (!authorization){
		return response.sendStatus(401);
	}

	const token = authorization.replace('Bearer', '').trim();

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		const { id } = data;
		request.userId = id;
		return next();
	} catch {
		return response.sendStatus(401);
	}
}

module.exports = authMiddleware;
