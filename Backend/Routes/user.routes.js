import { Router } from 'express';
import {
    register,login,authme
    
} from '../../controllers/admin/auth.controller.js';
import { allowRoles, verifyToken } from '../../middlewares/auth.middleware.js';
import { createashaprofile } from '../../controllers/Ashaworker/Profile.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
 router.post('/asha/profile', verifyToken,allowRoles("Asha worker"), createashaprofile);
 router.get('/me', verifyToken, authme);


export default router;
