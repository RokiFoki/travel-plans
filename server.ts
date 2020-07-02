import express from 'express'
import path from 'path';
import HTTP from 'http-status-codes';

import config from './config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import apiRouter from './api/api';
import authenticationRouter from './api/authentication';
import { credentials } from './middlewares/credentials';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(credentials);
app.use('/authentication', authenticationRouter);
app.use('/api', apiRouter);

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    const response = {status: "Error occrued.", error: config.type !== 'prod' ? err: undefined};
    
    res.status(HTTP.INTERNAL_SERVER_ERROR).send(response);
});

app.use(express.static(__dirname + '/../angular/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../angular/dist/index.html'));
});

app.listen(config.PORT, function() {
    console.log(`Listening on port ${config.PORT}`);
})