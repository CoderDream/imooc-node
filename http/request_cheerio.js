let req = require('request');

// req('http://www.baidu.com', (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//         console.log(body)
//     }
// });

// req.get({
//         url: 'http://www.baidu.com'
//     },(err, res, body) => {
//         if (!err && res.statusCode == 200) {
//         console.log(body)
//     }
// });

//var req = require('request');
let cheerio = require('cheerio');

req.get({
    url: 'https://www.cnblogs.com/'
}, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        let cnblogHtmlStr = body;
        let $ = cheerio.load(cnblogHtmlStr);
        $('.post_item').each((index, ele) => {
            let title = $(ele).find('a.titlelnk');
            let titleText = title.text();
            let titleUrl = title.attr('href');
            console.log(titleText, titleUrl);
        });
    }
});