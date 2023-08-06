import {readFileSync,readdirSync} from 'fs';
import {languages} from './types/languages';

export const config_parse = (config:string):languages|undefined =>    {
    var config_data:any = {};
    var config_location = config;
    
    try {
        var config_buff:any = readFileSync(`${config_location}`);
        if(config.endsWith(".json")){
            config_data = JSON.parse(`${config_buff}`);
        }
        return config_data;
    } catch (error) {
        return undefined
    }

}