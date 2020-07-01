import express from 'express';

import db from '../database'; 

const router = express.Router();
router.get('', async (req, res) => {
    const rows = await db.select('id', 'name').from('roles');
    
    res.send(rows);
});

export default router;