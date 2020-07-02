import HTTP from 'http-status-codes';
import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface Token {
    userId: number;
    username: string;
    role: number;
}


export function credentials(req: express.Request, res: express.Response, next: express.NextFunction) {
    const decoded_credentials = jwt.verify(req.cookies["token"], config.secret) as Token | undefined;

    if (decoded_credentials) {
        req.credentials = decoded_credentials;
    }
    
    next();
};

export function hasRole(roles: number[]) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.credentials && roles.includes(req.credentials.role)) {
            next();
        } else {
            res.status(HTTP.UNAUTHORIZED).send();
        }
    }
}