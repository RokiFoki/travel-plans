import express from 'express';
import HTTP from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import db from '../database'; 
import { hasRole } from '../middlewares/credentials';

const router = express.Router();

router.get('', asyncHandler(async (req, res) => {
    const rows = await db.select(
        {id: 'users.id'}, 
        {username: 'users.username'}, 
        {role: 'users.role_id'}, 
        {roleName: 'roles.name'}
        ).from('users')
        .join('roles', 'roles.id', 'users.role_id');
    
    res.send(rows);
}));

router.post('', hasRole(['User Manager', 'Administrator']), asyncHandler(async (req, res) => {
    const user = req.body;

    const createdUser = await db.insert({
        username: user.username,
        role_id: user.role
    }).into('users').returning('*');

    res.status(HTTP.CREATED).send(createdUser);
}));

router.put('/:id', hasRole(['User Manager', 'Administrator']), asyncHandler(async (req, res) => {
    const user = req.body;
    const id = req.params.id;

    await db('users').update({
        username: user.username,
        role: user.role
    }).where('id', id);

    res.send();
}));

router.delete('/:id', hasRole(['User Manager', 'Administrator']), asyncHandler(async (req, res) => {
    const id = req.params.id;

    await db.delete().from('users').where('id', id);
    
    res.send();
}));

export default router;