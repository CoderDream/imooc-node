var https = require('https')

var querystring = require('querystring')



var postData = querystring.stringify({

    'content': '老师辛苦了....',

    'mid': 8837

})



var options = {

    hostname:'www.imooc.com',

    port:443,//http默认端口80，https默认端口443

    path:'/course/docomment',

    method:'POST',

    headers:{//request headers

        'Accept':'application/json, text/javascript, */*; q=0.01',

        'Accept-Encoding':'gzip, deflate, br',

        'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',

        'Cache-Control':'no-cache',

        'Connection':'keep-alive',

        'Content-Length': postData.length,

        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

        'Cookie': 'imooc_uuid=3ffa6814-0efa-45cb-86ef-6e23072697f6; imooc_isnew_ct=1532482610; loginstate=1; apsid=Y4NWE5MjNkZGMyZGRhZDBhMTM4NzJlMTg3ZjQzZDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjk4NTE3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjb2RlcmRyZWFtQGdtYWlsLmNvbQAAAAAAAAAAAAAAADQzNzA2N2RlMDcwOGFlYzFlZTYyMWVkMzU3N2I1NmVhd9lXW3fZV1s%3DYj; imooc_isnew=2; UM_distinctid=164ef2cdc850-08c53ce5c45f1b-54103515-1fa400-164ef2cdc86e4; IMCDNS=0; PHPSESSID=k52shtvckag2sctf07ubpcmha0; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1533026308,1533026312,1533192057,1533194848; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1533026309,1533026312,1533192057,1533194848; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1533197958; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1533197968; cvde=5b62b25ec16e5-24',

        'Host':'www.imooc.com',

        'Pragma':'no-cache',

        'Referer':'https://www.imooc.com/video/8837',

        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',

        'X-Requested-With':'XMLHttpRequest'

    }

}



var req = https.request(options,function(res){

    console.log('status:'+res.statusCode);

    console.log('headers:'+JSON.stringify(res.headers));

    res.on('data', function(chunk){

        console.log(Buffer.isBuffer(chunk));

        console.log(typeof chunk);

    })

    res.on('end',function(){

        console.log('评论完毕');

    })

})



req.on('error',function(e){

    console.log('Error:'+e.message);

})

req.write(postData);

req.end();