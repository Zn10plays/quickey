import auth from '../auth/auth.js';
import bride  from '../bridge/bridge.js';
import { Router } from 'express';

const router = Router();

router.use('/o', auth);
router.use('/m', bride);

export default router;