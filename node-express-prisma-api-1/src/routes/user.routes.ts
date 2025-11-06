import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validationMiddleware } from '../middleware/validation.middleware';
import { userValidationSchema } from '../utils/validators';

const router = Router();
const userController = new UserController();

// Create a new user
router.post('/', validationMiddleware(userValidationSchema), userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', validationMiddleware(userValidationSchema), userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

export default router;