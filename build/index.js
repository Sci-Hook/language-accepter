"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var src_1 = require("./src");
var app = express();
app.use((0, src_1.languageParser)('languages'));
app.use('/', function (req, res) {
    res.send(res.lang);
});
app.listen(80);
