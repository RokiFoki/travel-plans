import express from 'express';
import asyncHandler from 'express-async-handler';

import db from '../database'; 

const router = express.Router();
router.get('', asyncHandler(async (req, res) => {
    const rows = await db.select('id', 'name').from('roles');
    
    res.send(rows);
}));

export default router;