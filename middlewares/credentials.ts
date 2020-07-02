import HTTP from 'http-status-codes';
import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import db from '../database';

export interface Token {
    userId: number;
    username: string;
    role: number;
}

const $roles = db.select('id', 'name').from('roles').then(d => {
    const roles = new Map<string, number>();

    d.forEach(r => {
        roles.set(r.name,  +r.id);
    });

    return roles;
});

export function credentials(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.cookies["token"])
        req.credentials = jwt.verify(req.cookies["token"], config.secret) as Token | undefined;
    
    next();
};

export function hasRole(roles: number[] | ('Regular' | 'User Manager' | 'Administrator' )[]) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('checking authorisation', roles);
        let rolesToCheck: number[];

        if (typeof roles[0] === 'string') {
            const rolesDict = await $roles;
            rolesToCheck = (roles as string[]).map((role: string) => (rolesDict).get(role) as number);
        } else {
            rolesToCheck = roles as number[];
        }

        console.log(req.credentials ? req.credentials.role: undefined, rolesToCheck);
        if (req.credentials && rolesToCheck.includes(req.credentials.role)) {
            next();
        } else {
            res.status(HTTP.UNAUTHORIZED).send();
        }
    }
}