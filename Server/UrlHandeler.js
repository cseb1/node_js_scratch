/**
The Built-in URL Module
The URL module splits up a web address into readable parts.

To include the URL module, use the require() method:
 */

const url = require("url");
// console.log(url);

const urlString = 'https://localhost:8080/default.htm?year=2017&month=December';

// const address = 'https://www.youtube.com/watch?v=Nt-AsZh5woE&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=8'
// parse this object

const q = url.parse(urlString, true);
// const q1 = url.parse(address, true);
// console.log(q);

console.log(q.query);

const qDate = q.query;
console.log(qDate.month);
