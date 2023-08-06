"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse_accept_language = void 0;
function parse_accept_language(accepted_langugages) {
    var langs = accepted_langugages.split(';');
    var lang_array = [];
    return new Promise(function (resolve, reject) {
        langs.syncForEach(function (lang, next_lang, index) {
            if (index == 1) {
                var lang_data_1 = lang.split(',')[0];
                if (typeof lang_data_1 == 'string')
                    lang_array.push(lang_data_1.toLowerCase());
                var lang_data_2 = lang.split(',')[1];
                if (typeof lang_data_2 == 'string')
                    lang_array.push(lang_data_2.toLowerCase());
            }
            else {
                var lang_data = lang.split(',')[1];
                if (typeof lang_data == 'string')
                    lang_array.push(lang.split(',')[1].toLowerCase());
            }
            next_lang();
        }, function () {
            resolve(lang_array);
        });
    });
}
exports.parse_accept_language = parse_accept_language;
