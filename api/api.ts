import express from 'express';
import rolesRouter from './roles';

const router = express.Router();

router.use('/roles', rolesRouter);

export default router;