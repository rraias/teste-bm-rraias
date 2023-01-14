const { Router } = require('express');

const UsersController = require('./app/controllers/UsersController');
const AuthController = require('./app/controllers/AuthController');

const authMiddleware = require('./app/middlewares/authMiddleware');
const TasksController = require('./app/controllers/TasksController');



const router = Router();

router.post('/new', UsersController.store);
router.post('/auth', AuthController.authenticate);
router.delete('/delete/:id', authMiddleware, UsersController.delete);

router.get('/users', authMiddleware, UsersController.index);
router.get('/welcome/:id', authMiddleware, UsersController.show);
router.put('/edit/:id', authMiddleware, UsersController.update);
router.delete('/delete/:id', authMiddleware, UsersController.delete);


router.post('/:id/newtask', authMiddleware, TasksController.store);
router.get('/:id/tasks', authMiddleware, TasksController.index);
router.post('/:id/updatetask', authMiddleware, TasksController.update);
router.delete('/:id/deletetask', authMiddleware, TasksController.delete);



module.exports = router;
