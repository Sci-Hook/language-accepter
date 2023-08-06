import {parse_accept_language} from './parse-accept-language';

function find_alternative(lang_without_local:string,accepted_langugages:string[]) {
    return new Promise<string|undefined>((resolve, reject) => {
        accepted_langugages.syncForEach(function (lang,next_lang) { 
            if(lang_without_local == lang.split('-')[0]){
                resolve(lang)
            }             
            next_lang();
        },() => {
            resolve(undefined);
        }); 
    })
    
}

export function get_accept_language(accept_language:string,accepted_langugages:string[],alternative_languages,default_language) {
    return new Promise<string|undefined>(async (resolve, reject) => {

        if (typeof accept_language != 'string') {
            return resolve(default_language);
        }
        
        const langs:string[] = await parse_accept_language(accept_language);
        
        langs.syncForEach(async function (lang:string,next_lang) {
            if (accepted_langugages.indexOf(lang) != -1) {
                return resolve(lang);
            }else{
                
                var lang_without_local = lang.split('-')[0];
                if (accepted_langugages.indexOf(lang_without_local) != -1) {
                    return resolve(lang_without_local);
                }

                var alternative = await find_alternative(lang_without_local,accepted_langugages);                

                if (alternative) {
                    return resolve(alternative);
                }

            }
            next_lang();
        },() => {
            resolve(default_language);
        });
        
    });
}