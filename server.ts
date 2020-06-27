import express from 'express'
import path from 'path';

import config from './config';
import bodyParser from 'body-parser';

import apiRouter from './api/api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRouter);

app.use(express.static(__dirname + '/../angular/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../angular/dist/index.html'));
});

app.listen(config.PORT, function() {
    console.log(`Listening on port ${config.PORT}`);
})