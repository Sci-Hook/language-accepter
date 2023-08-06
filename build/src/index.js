"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageParser = void 0;
var accept_language_1 = require("./accept-language");
var config_parse_1 = require("./config-parse");
var get_value_1 = require("./get_value");
require("syncforeachloop");
function get_languages(locations, accepted_languages, req, res) {
    return new Promise(function (resolve, reject) {
        locations.syncForEach(function (location, next_location) {
            return __awaiter(this, void 0, void 0, function () {
                var lang;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, get_value_1.get_value)(location, req, res)];
                        case 1:
                            lang = _a.sent();
                            if (accepted_languages.indexOf(lang) != -1) {
                                return [2 /*return*/, resolve(lang)];
                            }
                            next_location();
                            return [2 /*return*/];
                    }
                });
            });
        }, function () {
            resolve(undefined);
        });
    });
}
function languageParser(config) {
    var _this = this;
    var options;
    if (typeof config == 'string') {
        var data = (0, config_parse_1.config_parse)(config + '.json');
        if (!data) {
            return console.error('Config file could not be opened.');
        }
        options = data;
    }
    else {
        options = config;
    }
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var accepted_languages, alternative_languages, language_info_locations, default_language, auto_create_language_cookie, lang;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accepted_languages = options["accepted-languages"];
                    alternative_languages = options["alternative-languages"];
                    language_info_locations = options["language-info-locations"];
                    default_language = options["default-language"];
                    auto_create_language_cookie = options["autocreate-lanuage-cookie"];
                    if (!language_info_locations) return [3 /*break*/, 2];
                    return [4 /*yield*/, get_languages(language_info_locations, accepted_languages, req, res)];
                case 1:
                    lang = _a.sent();
                    if (lang) {
                        res.lang = lang;
                        return [2 /*return*/, next()];
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, (0, accept_language_1.get_accept_language)(req.headers['accept-language'], accepted_languages, alternative_languages, default_language)];
                case 3:
                    lang = _a.sent();
                    if (lang) {
                        res.lang = lang;
                        if (auto_create_language_cookie) {
                            res.cookie(auto_create_language_cookie === null || auto_create_language_cookie === void 0 ? void 0 : auto_create_language_cookie.name, lang, {
                                expires: new Date(Date.now() + (auto_create_language_cookie === null || auto_create_language_cookie === void 0 ? void 0 : auto_create_language_cookie.expires)),
                            });
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.languageParser = languageParser;
