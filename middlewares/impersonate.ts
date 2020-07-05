import HTTP from 'http-status-codes';
import { checkRole } from './credentials';
import express from 'express';

export function impersonate(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.query.forUser) {
        next();
    } else if (req.credentials && checkRole(req.credentials, ['Administrator'])) {
        req.credentials.userId = +req.query.forUser;
        next();
    } else {
        res.status(HTTP.UNAUTHORIZED).send();
    }
}