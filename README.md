# alib-aquery

alib-aquery is a high performance, chainable array querying library that is extensible to support any type of filtering. It supports filter (in place of where), limit, offset and order by. It is inspired by the SQL SELECT statement but for arrays of objects.

## Install

Install with [npm](https://www.npmjs.com/):

```sh

$ npm i alib-aquery --save

```

## Usage

```js

const aquery = require('alib-aquery');

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = aquery(data).filter('size', 'gt', 10).run();
// return an array of items having the prop \'size\' greater than 10
// [
//     { color: 'blue', size: 44 },
//     { color: 'green', size: 12 },
//     { color: 'red', size: 18 },
//     { color: 'blue', size: 12 },
//     { color: 'black', size: 12 },
// ]

var result = aquery(data).filter('size', 'gt', 10).filter('color', 'eq', 'blue').run();
// return an array of items having the prop \'size\' greater than 10 and color blue:
// [
//     { color: 'blue', size: 44 },
//     { color: 'blue', size: 12 },
// ]

```

Built in filter functions are: 
* eq - equals
* gt - greater than
* lt - less than
* contains - string contains 