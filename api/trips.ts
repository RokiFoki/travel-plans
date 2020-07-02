import express from 'express';
import asyncHandler from 'express-async-handler';
import HTTP from 'http-status-codes';

import db from '../database'; 

const router = express.Router();
router.get('', asyncHandler(async (req, res) => {
    if (!req.credentials) {
        res.status(HTTP.BAD_REQUEST).send({message: 'You need to be logged in'});
        return;
    }

    const rows = await db.select('id', 'start_date', 'end_date', 'comment', 'destination').from('trips').where('user_id', req.credentials.userId);

    console.log(rows);

    res.send(rows);
}));

router.post('', asyncHandler(async (req, res) => {
    if (!req.credentials) {
        res.status(HTTP.BAD_REQUEST).send({message: 'You need to be logged in'});
        return;
    }

    const trip = req.body;

    const createdTrip = await db.insert({
        start_date: new Date(trip.startDate),
        end_date: new Date(trip.endDate), 
        comment: trip.comment,
        destination: trip.destination,
        user_id: req.credentials.userId
    }).into('trips')
    .returning('*');

    res.status(HTTP.CREATED).send(createdTrip)
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    if (!req.credentials) {
        res.status(HTTP.BAD_REQUEST).send({message: 'You need to be logged in'});
        return;
    }
    const id = req.params.id;

    await db.delete().from('trips').where('id', id).andWhere('user_id', req.credentials.userId);

    res.send();
}));

router.put('/:id', asyncHandler(async (req, res) => {
    if (!req.credentials) {
        res.status(HTTP.BAD_REQUEST).send({message: 'You need to be logged in'});
        return;
    }
    const id = req.params.id;
    const trip = req.body;

    await db('trips').update({
        start_date: new Date(trip.startDate),
        end_date: new Date(trip.endDate), 
        comment: trip.comment,
        destination: trip.destination
    }).where('id', id).andWhere('user_id', req.credentials.userId);


    res.send();
}));

export default router;