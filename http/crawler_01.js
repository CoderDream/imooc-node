var http = require('http')

var url = 'http://www.runoob.com/nodejs/nodejs-tutorial.html';

http.get(url,function(res){

  var html=''

  res.on('data',function(data){
    html += data
  })

  res.on('end',function(){
    console.log(html)
  })

}).on('error',function(){
  console.log('获取资源出错！')
})