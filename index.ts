import * as express from 'express';
import {languageParser} from './src';

var app = express();

app.use(languageParser('languages'))

app.use('/' , (req,res) => {
    res.send(res.lang);
})

app.listen(80);