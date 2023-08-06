"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config_parse = void 0;
var fs_1 = require("fs");
var config_parse = function (config) {
    var config_data = {};
    var config_location = config;
    try {
        var config_buff = (0, fs_1.readFileSync)("".concat(config_location));
        if (config.endsWith(".json")) {
            config_data = JSON.parse("".concat(config_buff));
        }
        return config_data;
    }
    catch (error) {
        return undefined;
    }
};
exports.config_parse = config_parse;
