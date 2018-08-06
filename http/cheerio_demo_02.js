// 加载http模块
let http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
let cheerio = require('cheerio');

// 定义爬虫的目标地址
let url = 'http://www.imooc.com/learn/348';

let memberUrl = 'http://www.imooc.com/course/AjaxCourseMembers?ids=348'

http.get(url, function(res) {
    let html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 沿用jQuery风格
        let $ = cheerio.load(html);
        //var x = $('main > div.course-infos > div.w.pr > div.statics.clearfix > div:nth-child(4) > span.meta-value.js-learn-num');
        //console.log(typeof x);
        //console.log(x.length);
        //console.log(x);

        // statics clearfix

       // console.log($('.hd h2').text());
       // console.log($('span.meta-value.js-learn-num').text());

        // console.log($('.meta-value .js-learn-num').find('span'));
        // console.log($('.meta-value .js-learn-num').find('span').text());
        // console.log($('.meta span').length);//.text());
        // console.log($('.meta-value span').text());

        $('.static-item').each((index, ele) => {
            let title = $(ele).find('.meta');
            let number = $(ele).find('.meta-value');
            //console.log(title.is('span'));
            //console.log(title.name);
            let titleText = title.text();
            let numberText = number.text();
            if('综合评分' === titleText) {
                console.log('#####' + title.length);
            }
            console.log('1: ' + titleText);
            console.log('2: ' + numberText)
        });

        $('.score-static-item').each((index, ele) => {
            let title = $(ele).find('.meta');
            let number = $(ele).find('.meta-value');
            let titleText = title.text();
            let numberText = number.text();
            console.log('3: ' + titleText);
            console.log('4: ' + numberText)
        });

    });
}).on('error', function() {
    console.log('获取数据出错！');
});

http.get(memberUrl, function(res) {
    res.on('data', function (data) {
        let number2 = JSON.parse(data.toString()).data[0].numbers;
        console.log('number: ' + number2);
    });

    res.on('end', function () {})
}).on('error', function () {console.log('获取学习人数出错')})