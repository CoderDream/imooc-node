// 加载http模块
var http = require('http');

var Promise = require('bluebird');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

var baseUrl = 'http://www.imooc.com/learn/';
// 定义爬虫的目标地址
//var url = 'http://www.imooc.com/learn/348';
var videoIds = [348, 259, 197, 134, 75];

/* 过滤章节信息 */
function filterChapters(html) {

    // 沿用jQuery风格
    var $ = cheerio.load(html);
    // 通过类名获取章节信息
    var chapters = $('.chapter');

    // course-infos
    //var title = $

    var title = $('.course-infos .pr .hd h2').text();
    //var number = parseInt($('.course-infos .pr .statics .static-item .js-learn-num').text().trim(), 10);
    var number = parseInt($($('.course-infos .pr .statics .static-item')[1]).find('.js-learn-num').text().trim(), 10);
    // console.log('学过的人数：' + $($($('.course-infos .pr .statics .static-item')[0]).find('span')[1]).text().trim())
    console.log('学过的人数：' + $('span.meta-value span.js-learn-num').text());
    console.log('学过的人数：' + $('span.meta-value js-learn-num').text());

    console.log('学过的人数2：' + $($($('.meta-value .js-learn-num')[0]).find('span')[1]).text().trim());
    console.log('学过的人数3：' + $('span .meta-value .js-learn-num').attr('class'));



    // courseData = {
    //     title: title,
    //     number: number,
    //     videos: [{
    //         chapterTitle: '',
    //         videos:[
    //             title: '',
    //             id: ''
    //         ]
    //     }]
    // };

    // 课程数据，该数据是一个数组
    //var courseData = [];
    var courseData = {
      title: title,
      number: number,
      videos: []
    };

    /* 章节信息遍历 */
    chapters.each(function(item) {
        // 获取单独的每一章
        var chapter = $(this);
        // 获取strong标签里面的文本，trim()去除空格，split()分隔成数组，最终只获取章节标题
        var chapterTitle = chapter.find('strong').text().trim().split('\n')[0];
        // 获取video标签下的子标签li的内容
        var videos = chapter.find('.video').children('li');
        // 定义章节数据
        var chapterData = {
            chapterTitle : chapterTitle,
            videos : []
        };

        /* 视频信息遍历 */
        videos.each(function(item) {
            // 通过标签的类名来获取单独的视频信息
            var video = $(this).find('.J-media-item');
            // 视频标题
            var videoTitle = video.text().trim().split('\n')[0].trim();
            // 视频时长
            var videoTime = video.text().trim().split('\n')[1].trim();
            // 视频编号
            var id = String(video.attr('href')).split('video/')[1];
            // 填充章节信息中视频数组
            chapterData.videos.push({
                title : videoTitle,
                time : videoTime,
                id : id
            });
        });
        // 填充课程信息中的章节信息
        courseData.videos.push(chapterData);
    });
    // 返回课程信息
    return courseData;
}

/* 打印课程信息 */
function printCourseInfo(coursesData) {

    coursesData.forEach(function (courseData) {
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
    });

    // 遍历课程信息
    coursesData.forEach(function(courseData) {
        console.log('### ' + courseData.title + '\n');

        courseData.videos.forEach(function (item) {
            // 获取章节标题
            var chapterTitle = item.chapterTitle;
            // 打印章节标题并换行
            console.log(chapterTitle + '\n');
            // 遍历每个章节中的视频信息并打印
            item.videos.forEach(function(video) {
                console.log('   [' + video.id + '] ' + video.title + ' ' + video.time + '\n');
            });
        });
    });
}

function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log('正在爬取 ' + url);

        http.get(url, function(res) {
            var html = '';
            // 获取页面数据
            res.on('data', function(data) {
                html += data;
            });
            // 数据获取结束
            res.on('end', function() {
                resolve(html);
                // 通过过滤章节信息获取实际需求的课程信息
                // var courseData = filterChapters(html);
                // 打印课程信息
                // printCourseInfo(courseData);
            });
        }).on('error', function(e) {
            reject(e);
            console.log('获取课程数据出错！');
        });
    })
}

var fetchCourseArray = [];
videoIds.forEach(function (id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})

Promise
    .all(fetchCourseArray)
    .then(function (pages) {
        var coursesData  = [];
        pages.forEach(function (html) {
            var courses = filterChapters(html);
            coursesData.push(courses);
        });

        coursesData.sort(function(a, b) {
            return a.number < b.number;
        });

        // 打印课程信息
        printCourseInfo(coursesData);
    });
