import express from 'express';
import rolesRouter from './roles';
import usersRouter from './users';
import tripsRouter from './trips';

const router = express.Router();

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/trips', tripsRouter);

router.all('/*', (req, res) => {
    res.status(404).send();
})

export default router;