import express from 'express'

import config from './config';

const app = express();

app.get('', (req, res) => {
    res.send('Hello world!');
})

app.listen(config.PORT, function() {
    console.log(`Listening on port ${config.PORT}`);
})