import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import HTTP from 'http-status-codes';

import config from '../config';

import { AuthenticationController } from './controllers/authentication';
const controller = new AuthenticationController();

const router = express.Router();

router.post('/logout', asyncHandler(async (req, res) => {
    res.cookie('token', '');
    res.send(true);
}));

router.post('/register', asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await controller.tryRegister(username, password);

    if (response.token) {
        res.cookie('token', jwt.sign(response.token, config.secret), { httpOnly: true });
    }

    if (!response.success) {
        res.status(HTTP.BAD_REQUEST);
    }

    res.send(response); 
}));

router.post('/login', asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await controller.tryLogin(username, password);
    if (response.token) {
        const options = { httpOnly: true, sameSite: true, secure: config.type !== 'local' ? true : undefined };

        res.cookie('token', jwt.sign(response.token, config.secret), options);
    }

    if (!response.success) {
        res.status(HTTP.BAD_REQUEST);
    }
    
    res.send(JSON.stringify(response)) 
 }));

export default router;