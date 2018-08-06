let http = require('http');
let baseUrl = 'http://www.imooc.com/learn/';
let learnNumber_baseUrl = 'http://www.imooc.com/course/AjaxCourseMembers?ids=';
let cheerio = require('cheerio');
let videosId = [728,637,348,259,197,134,75];

function filerChapters(pageData){
    let html = pageData.html;
    let $ = cheerio.load(html);
    let chapters = $('.chapter');

    let courseData = {
        title:$('.hd h2').text(),
        number:pageData.number,
        id:$('.person-num').attr('href').split('/')[2],
        videos:[]
    };

    chapters.each(function(item){
        let chapter = $(this);
        let chapterTitle = chapter.find('h3').text();
        let videos = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        };

        videos.each(function(item){
            let video = $(this).find('.J-media-item');
            let videoTitle = video.text().trim();
            let id = video.attr('href').split('video/')[1];
            let videoData = {
                title:videoTitle,
                id:id
            };

            chapterData.videos.push(videoData);
        });

        courseData.videos.push(chapterData);
    });

    return courseData;
}

function printCourseData(coursesData){
    coursesData.forEach(function(courseData){
        console.log('\n');
        console.log('     #########   '+courseData.title + '  [学习人数：' + courseData.number + ']   #########\n');
        courseData.videos.forEach(function(item){
            let chapterTitle = item.chapterTitle;
            console.log(chapterTitle );
            item.videos.forEach(function(video){
                console.log(' [' + video.id+ ']' + video.title.trim().split('(')[0]);
            });
        });
    });
}

function getPageAsync(url){
    return new Promise(function(resolve, reject){
        http.get(url,function(res){
            let html = '';
            res.on('data',function(data){
                html += data;
            });
            res.on('end',function(){
                resolve(html);
            });
        }).on('error',function(){
            console.log('error');
        });
    });
}

function getLearnDataAsync(html){
    return new Promise(function(resolve,reject){
        let $ = cheerio.load(html);
        let id = $('.person-num').attr('href').split('/')[2];
        let pageData = {
            html:html,
            number:0
        };

        let db = '';
        http.get(learnNumber_baseUrl+id,function(res){
            res.on('data',function(data){
                db += data;
                db = JSON.parse(db);
                pageData.number = parseInt(db.data[0].numbers,10);
            });

            res.on('end',function(){
                resolve(pageData);
            });

        }).on('error',function(){
            console.log('error');
        });
    });
}

let promiseList = [];
// let coursesDataPromises = [];

videosId.forEach(function(id){
    promiseList.push(getPageAsync(baseUrl+id).then(function(html){
        return getLearnDataAsync(html);
    }));
});

Promise
    .all(promiseList)
    .then(function(pagesData){
        let coursesData = [];
        pagesData.forEach(function(pageData){
            coursesData.push(filerChapters(pageData));
        });

        printCourseData(coursesData);
    });