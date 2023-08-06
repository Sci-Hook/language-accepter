# General Information About the Package

The package aims to make it easy to build language support for API systems. By using this package, you can provide i18n support to your API systems easily and quickly. The package is used to provide language support to Sci-Hook systems and is regularly updated by the Sci-Hook Development Team.

# How to Install Package?

It is possible to install the package directly to your project folder via npm. For this, you must come to the terminal where you run your project and run the npm install command below:

`$ npm install language-accepter`

After running the command, the latest version of the package will automatically start downloading to the "node_modules" folder. Please wait until npm service completes the process.

# How to Use the Package?

To include the package in your project, simply write the following Typescript import code:

```ts
import {languageParser} from 'language-accepter';
```

The added function named `languageParser` is an Express middleware. This middleware receives the configuration specified as an object in it. Its most basic usage is as follows:

```ts
app.use(languageParser({
    "accepted-languages": ["en","tr"],
    "default-language": "en"
}));
```

The `accepted-languages` value you see here is the section where you have defined the languages you have supported in your system. The `default-language` value is the language that will be automatically redirected if any of the languages supported by the client are not sent. For example: If the `default-language` value is set to `en` and the `fr` value is sent that is not in the client system, the client will be automatically redirected to the `en` language.

Below are all the values and their descriptions:

| Value | Description                 |
| ------------- | ------------------------------ |
| `accepted-languages`      | An object list of languages accepted by the system.      |
| `default-language`   | The default language assigned to the system.    |
| `autocreate-lanuage-cookie`   | Creates a language cookie on the client side.     |
| `language-info-locations`   | A list of names of the values containing the languages sent by the client.     |

A working example where all features are used:

```ts
import * as express from 'express';
import {languageParser} from 'language-accepter';

var app = express();

app.use(languageParser({
    "accepted-languages":["en","tr"],
    "default-language":"en",
    "autocreate-lanuage-cookie":{
        name:"location",
        expires:20000
    },
    "language-info-locations":[
        "headers.location",
        "cookies.location"
    ]
}));

app.use((req,res) => {
    res.send("Your language:" + res.lang);
})

app.listen(80);
```

- If one of the values specified in `language-info-locations` contains one of the languages specified in `accepted-languages` and is sent, this will suppress the languages specified in the `Accept-Language` header.

- The `autocreate-language-cookie` property ensures that the language detected by the system is stored in a cookie on the client. The value assigned to `name` names this cookie. The value `expires` determines the expiration time of this cookie.

- The language information detected by `languageParser` is passed to the next middleware with the value `res.lang`.

## Assigning as Config File

### index.ts

```ts
import * as express from 'express';
import {languageParser} from 'language-accepter';

var app = express();

app.use(languageParser('language'));

app.use((req,res) => {
    res.send("Your language:" + res.lang);
})

app.listen(80);
```

### language.json

```json
{
    "accepted-languages":["en","tr"],
    "default-language":"en",
    "autocreate-lanuage-cookie":{
        "name":"location",
        "expires":20000
    },
    "language-info-locations":[
        "headers.location",
        "cookies.location"
    ]
}
```

It can also be configured with a JSON by giving the name of the above JSON file in `languageParser`.

# Contributors

This software package is developed and provided by the Sci-Hook Organization. It is actively developed by [Emirhan Gerçeker](https://github.com/lim10tech).

# License

This package is made available as open-source under the [MIT License](https://github.com/Sci-Hook/language-accepter/blob/main/LICENSE). It is open for development, modification and free use. You can use the package in your personal or organizational projects, you don't need permission from anywhere. Attribution to the developers and Sci-Hook is appreciated but not legally required.
