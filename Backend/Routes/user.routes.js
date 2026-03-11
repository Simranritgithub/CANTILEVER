import { Router } from 'express';
import {
    register,login,authme
    
} from '../Controllers/auth/auth.controller.js';
import { allowRoles, verifyToken } from '../Middlewares/auth.middleware.js';


const router = Router();

router.post('/register', register);
router.post('/login', login);
 
 router.get('/me', verifyToken, authme);


export default router;
