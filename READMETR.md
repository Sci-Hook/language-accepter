# Paket Hakkında Genel Bilgilendirme

Paket, API sistemlerine dil desteği oluşturmayı kolaylaştırmayı hedeflemektedir. Bu paketi kullanarak API sistemlerinize kolay ve hızlı bir şekilde i18n desteği sağlayabilirsiniz. Paket, Sci-Hook sistemlerine dil desteği sağlamak amacıyla kullanılmakta ve Sci-Hook Geliştirme Ekibi tarafından düzenli olarak güncellenmektedir.

# Paket Nasıl Kurulur?

Paketi npm aracılığı ile doğrudan proje klasörünüze kurmanız mümkündür. Bunun için projenizi çalıştırdığınız terminale gelip aşağıdaki npm yükleme komutunu çalıştırmalısınız:

`$ npm install language-accepter`

Komutu çalıştırdıktan sonra paketin son sürümü, otomatik olarak "node_modules" klasörüne inmeye başlayacaktır. Lütfen npm servisi işlemi tamamlayana kadar bekleyiniz.

# Paket Nasıl Kullanılır?

Paketi, projenize dahil etmek için aşağıdaki Typescript import kodunu yazmanız yeterlidir:

```ts
import {languageParser} from 'language-accepter';
```

Eklenen `languageParser` adındaki fonksiyon bir Express middleware'dır. Bu middleware, içerisinde bir obje olarak belirtilen konfigrasyon almaktadır. En temel kullanımı aşağıdaki gibidir:

```ts
app.use(languageParser({
    "accepted-languages": ["en","tr"],
    "default-language": "en"
}));
```

Burada gördüğünüz `accepted-languages` değeri, sisteminizde desteklemiş olduğunuz dilleri tanımlamış olduğunuz bölümdür. `default-language` değeri ise istemci tarafından desteklenen dillerden herhangi birisi gönderilmezse otomatik olarak yönlendirilecek dildir. Örneğin: `default-language` değeri `en` olarak atandıysa ve istemci sistemde olmayan `fr` değeri gönderilirse istemci otomatik olarak `en` diline yönlendirilecektir.

Aşağıda bütün değerler ve açıklamaları yer almaktadır:

| Değer | Açıklama                 |
| ------------- | ------------------------------ |
| `accepted-languages`      | Sistem tarafından kabul edilen dillerin obje olarak bir listesidir.      |
| `default-language`   | Sisteme atanmış olan varsayılan dildir.     |
| `autocreate-lanuage-cookie`   | İstemci tarafına bir dil çerezi oluşturur.     |
| `language-info-locations`   | İstemci tarafından gönderilen dillerin bulunduğu değerlerin isimlerinin listesidir.     |

Tüm özelliklerin kullanıldığı çalışır bir örnek:

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

- `language-info-locations` değerinde belirtilen değerlerden birisinde `accepted-languages` içerisinde belirtilen dillerden birisi varsa ve gönderilirse bu, `Accept-Language` header'ında belirtilen dilleri bastırır.

- `autocreate-language-cookie` özelliği, sistem tarafından algılanan dilin istemcide bir çerez ile kaydedilmesini sağlar. `name` değerine atanan değer ile bu çerez isimlendirilir. `expires` değeri ile de bu çerezin sona erme süresi belirlenir.

- `languageParser` tarafından algılanan dilin bilgisi `res.lang` değeri ile sonraki middleware'lara aktarılır.

## Config Dosyası Olarak Atama

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

`languageParser` içerisine yukarıdaki JSON dosyasının ismi verilerek bir JSON ile de konfigrasyonu gerçekleştirilebilir.

# Katkı Sağlayanlar

Bu yazılım paketi, Sci-Hook Organizasyonu tarafından geliştirilmekte ve sunulmaktadır. Aktif olarak [Emirhan Gerçeker](https://github.com/lim10tech) tarafından geliştirilmektedir.

# Lisans

Bu paket [MIT Lisansı](https://github.com/Sci-Hook/language-accepter/blob/main/LICENSE) altında açık kaynak olarak sunulmuştur. Geliştirmelere, değişiklik yapmaya ve özgür kullanıma açıktır. Kişisel veya organizasyon projelerinizde paketten faydalanabilirsiniz, herhangi bir yerden izin almanız gerekmez. Geliştirenlere ve Sci-Hook'a atıfta bulunmanız bizi çok mutlu edecektir ancak yasal olarak gerekli değildir.
