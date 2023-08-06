import { get_accept_language } from "./accept-language";
import { config_parse } from "./config-parse";
import { get_value } from "./get_value";
import { languages } from "./types/languages";
import 'syncforeachloop';

function get_languages(locations,accepted_languages,req,res) {
    return new Promise<string|undefined>((resolve, reject) => {
        locations.syncForEach(async function (location,next_location) {
            var lang = await get_value(location,req,res);
            if (accepted_languages.indexOf(lang) != -1) {
                return resolve(lang);
            }
            next_location();
        }, () => {
            resolve(undefined);
        });
    });
}

export function languageParser(config:languages|string) {

    var options:languages;

    if (typeof config == 'string') {
        var data = config_parse(config + '.json');
        if (!data) {
            return console.error('Config file could not be opened.')
        }
        options = data;
    }else{
        options = config;
    }
    
    return async(req,res,next) => {

        const accepted_languages = options["accepted-languages"];
        const alternative_languages = options["alternative-languages"];
        const language_info_locations = options["language-info-locations"];
        const default_language = options["default-language"];
        const auto_create_language_cookie = options["autocreate-lanuage-cookie"];

        var lang;

        if (language_info_locations) {
            lang = await get_languages(language_info_locations,accepted_languages,req,res);
            if (lang) {
                res.lang = lang;
                return next();
            }
        }

        lang = await get_accept_language(
            req.headers['accept-language'],
            accepted_languages,
            alternative_languages,
            default_language
        );

        if (lang) {
            res.lang = lang;
            if (auto_create_language_cookie) {
                res.cookie(auto_create_language_cookie?.name,lang,{
                    expires: new Date(Date.now() + auto_create_language_cookie?.expires),
                })  
            }
        }

        next();        
    }
}