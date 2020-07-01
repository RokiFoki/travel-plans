import express from 'express';
import rolesRouter from './roles';
import usersRouter from './users';

const router = express.Router();

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);

export default router;