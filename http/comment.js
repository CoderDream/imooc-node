var https = require('https');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '一起期待下一期的课程',
    'cid':348,
    'mid': 8837
});

var options = {
    hostname: 'www.imooc.com',
    port:443,
    path:'/course/docomment/',
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=3ffa6814-0efa-45cb-86ef-6e23072697f6; imooc_isnew_ct=1532482610; loginstate=1; apsid=Y4NWE5MjNkZGMyZGRhZDBhMTM4NzJlMTg3ZjQzZDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjk4NTE3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjb2RlcmRyZWFtQGdtYWlsLmNvbQAAAAAAAAAAAAAAADQzNzA2N2RlMDcwOGFlYzFlZTYyMWVkMzU3N2I1NmVhd9lXW3fZV1s%3DYj; imooc_isnew=2; UM_distinctid=164ef2cdc850-08c53ce5c45f1b-54103515-1fa400-164ef2cdc86e4; IMCDNS=0; PHPSESSID=k52shtvckag2sctf07ubpcmha0; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1533026308,1533026312,1533192057,1533194848; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1533026309,1533026312,1533192057,1533194848; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1533197958; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1533197968; cvde=5b62b25ec16e5-24',
        'Host': 'www.imooc.com',
        'Origin': 'https://www.imooc.com',
        'Referer': 'https://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

var req = https.request(options, function (res) {
    console.log('Status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function (chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on('end', function () {
        console.log('评论完毕');
    });
});

req.on('error', function (e) {
    console.log('Error: ' + e.message);
});

req.write(postData);

req.end();