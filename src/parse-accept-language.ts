export function parse_accept_language(accepted_langugages:string) {
    var langs = accepted_langugages.split(';');
    var lang_array:string[] = [];
    return new Promise<string[]>((resolve, reject) => {
        langs.syncForEach(function (lang:string,next_lang,index) {
           if (index == 1) {
                var lang_data_1 = lang.split(',')[0];
                if (typeof lang_data_1 == 'string') lang_array.push(lang_data_1.toLowerCase());
                var lang_data_2 = lang.split(',')[1];
                if (typeof lang_data_2 == 'string') lang_array.push(lang_data_2.toLowerCase());
           }else{
                var lang_data = lang.split(',')[1];
                if (typeof lang_data == 'string') lang_array.push(lang.split(',')[1].toLowerCase());
           }
           next_lang();
        },() => {
            resolve(lang_array);
        });
    });
}
