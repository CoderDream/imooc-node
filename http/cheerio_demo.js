var cheerio = require('cheerio');

$ = cheerio.load('<h2 class="title">Hello world</h2>');

console.log('1: ' + $('h2.title').text('Hello there!'));
console.log('1: ' + $('h2.title').text());
$('h2').addClass('welcome');

console.log('2: ' + $.html());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');

console.log('3: ' + $('.apple', '#fruits').text());
console.log('4: ' + $('ul').attr('id'));

console.log('5: ' + $('.apple').attr('id', 'favorite').html());

$ = cheerio.load('<input type="text" id="name" value="input_text" />');

console.log('6: ' + $('input[type="text"]').val());

console.log('7: ' + $('input[type="text"]').val('test').html());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');

console.log('8: ' + $('.pear').removeAttr('class').html());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');

console.log('9: ' + $('.pear').hasClass('pear'));

console.log('10: ' + $('apple').hasClass('fruit'));

console.log('11: ' + $('li').hasClass('pear'));

console.log('12: ' + $('.pear').addClass('fruit'));//.html());

console.log('13: ' + $('.apple').addClass('fruit red'));//.html());

console.log('14: ' + $('#fruits').find('li').length);

console.log('15: ' + $('.pear').parent().attr('id'));

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');
console.log('16: ' + $('.orange').parents().length);
console.log('17: ' + $('.orange').parents('#fruits').length);

console.log('18: ' + $('.orange').closest());
console.log('19: ' + $('.orange').closest('.apple'));
console.log('20: ' + $('.orange').closest('li'));
console.log('21: ' + $('.orange').closest('#fruits'));


console.log('22: ' + $('.apple').next().hasClass('orange'));
console.log('23: ' + $('.apple').nextAll());

console.log('24: ' + $('.orange').prev().hasClass('apple'));
console.log('25: ' + $('.pear').prevAll());

console.log('26: ' + $('li').slice(1).eq(0).text());
console.log('27: ' + $('li').slice(1, 2).length);

console.log('28: ' + $('.pear').siblings().length);
console.log('29: ' + $('.pear').siblings('.orange').length);

console.log('30: ' + $('#fruits').children().length);
console.log('31: ' + $('#fruits').children('.pear').text());

var fruits = [];

$('li').each(function(i, elem) {
    fruits[i] = $(this).text();
});

console.log('32: ' + fruits.join(', '));
//=> Apple, Orange, Pear

console.log($('li').map(function(i, el) {
    // this === el
    return $(this).attr('class');
}));//.join(', ');


//console.log('33: ' + $('li'));

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');

console.log('34: ' + $('li').filter('.orange').attr('class'));


console.log('35: ' + $('li').filter(function(i, el) {
    // this === el
    return $(this).attr('class') === 'orange';
}).attr('class'));


console.log('36: ' + $('#fruits').children().first().text());
console.log('37: ' + $('#fruits').children().last().text());
console.log('38: ' + $('li').eq(0).text());
console.log('39: ' + $('li').eq(-1).text());

$('ul').append('<li class="plum">Plum</li>')
console.log('40: ' + $.html());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');
$('ul').prepend('<li class="plum">Plum</li>')
console.log('41: ' + $.html());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');

console.log('42: ' + $('.orange').text());
console.log('43: ' + $('ul').text());

console.log('44: ' + $.html());
console.log('45: ' + $.html('.pear'));

$ = cheerio.load('<media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>');

console.log('46: ' + $.xml());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');
console.log('47: ' + $('li').toArray());

$ = cheerio.load('<ul id="fruits">\n' +
    '<li class="apple">Apple</li>\n' +
    '<li class="orange">Orange</li>\n' +
    '<li class="pear">Pear</li>\n' +
    '</ul>');
console.log('48: ' + $.root().append('<ul id="vegetables"></ul>').html());

