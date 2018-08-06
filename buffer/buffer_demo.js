let buf = new Buffer('Hello 慕课网');

console.log(buf.length);

console.log(buf.write('Hi 慕课网'));
console.log(buf.toString());
console.log(buf.length);

console.log(buf.write(' ImoocImoocImoocImooc', 2, 16));
console.log(buf.toString());

let buf2 = new Buffer('Hello Imooc');
console.log(buf2.length);

let buf3 = new Buffer(5);
buf2.copy(buf3);
console.log(buf3.toString());

buf2.copy(buf3, 0, 6,11);
console.log(buf3.toString());

let buf4 = new Buffer('imooc');
let str = buf4.toString('base64');
console.log('str: ' + str);

let buf5 = new Buffer('aW1vb2M=', 'base64');
console.log(buf5.toString());

console.log(buf5.toString('hex'));//696d6f6f63
let buf6 = new Buffer('696d6f6f63', 'hex');
console.log(buf6.toString());
