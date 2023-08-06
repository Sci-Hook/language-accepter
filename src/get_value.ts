var req_keys:string[] = [
    'body',
    'query',
    'params',
    'headers',
    'cookies'
];

export async function get_value(data_name,req,res){
    return new Promise<any>((resolve, reject) => {  
        if (typeof data_name != 'string') {
            return resolve(data_name);
        }
        var data_name_splitted = data_name.split('.');
        if (data_name_splitted.length == 1) {   // Değer tek parça ise buradaki işlemler uygulanacak.

            if (req.method === 'GET') {
                return resolve(req.query[data_name])
            }else{
                if (req.body[data_name] !== undefined) {
                    return resolve(req.body[data_name]);
                }else{
                    return resolve(req.query[data_name]);
                }
            }

        }else if (data_name_splitted.length == 2 && req_keys.indexOf(data_name_splitted[0]) != -1) {
            return resolve(req[data_name_splitted[0]][data_name_splitted[1]]);
        }else{
            var data;
            data_name_splitted.syncForEach(function(key,next_key,i){
                if (i == 1) {
                    if (key == 'req') {
                        data = req;
                    }
                    if (key == 'res') {
                        data = res;
                    }
                }else{
                    if (data[key]) {
                        data = data[key];
                    }else{
                        resolve(undefined);   
                    }
                }
                next_key();
            },() => {
                resolve(data);
            });
        }
    });
}