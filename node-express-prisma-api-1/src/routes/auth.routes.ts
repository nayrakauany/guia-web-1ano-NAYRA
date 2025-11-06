import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../middleware/validation.middleware';
import { authValidationSchema } from '../utils/validators';

const router = Router();
const authController = new AuthController();

router.post('/register', validationMiddleware(authValidationSchema.register), authController.register);
router.post('/login', validationMiddleware(authValidationSchema.login), authController.login);

export default router;