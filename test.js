'use strict';

/* deps:mocha */
var assert = require('assert');

//init
var aquery = require('./');

//vars
var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
];

//data size + 10
var datat1 = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 12 },
];

//data size + 10 and blue
var datat2 = [
    { color: 'blue', size: 44 },
    { color: 'blue', size: 12 },
];

var data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data2t1 = [6, 7, 8, 9, 10, 6, 7, 8, 9, 10];
var data2t2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data2t3 = [4, 5, 6, 7, 8, 9, 10, 1, 2, 3];

var data3 = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];
var data3t1 = [
    { color: 'blue', size: 44 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];
var data3t2 = [
    { color: 'red', size: 18 }
];

var data4 = [
    { color: 'blue' },
    { color: 'green'},
    { color: 'red'},
    { color: 'blue'},
    { color: 'orange'},
    { color: 'purple'},
    { color: 'rouge'},
];
var data4t1 = [
    { color: 'blue' },
    { color: 'blue'},
    { color: 'green'},
    { color: 'orange'},
    { color: 'purple'},
    { color: 'red'},
    { color: 'rouge'},
];

var data5 = [
    { color: 'blue' , size: 9 },
    { color: 'green', size: 9 },
    { color: 'red', size: 9 },
    { color: 'blue', size: 9 },
    { color: 'orange', size: 9 },
    { color: 'purple', size: 9 },
    { color: 'rouge', size: 9 },

    { color: 'blue' , size: 15 },
    { color: 'green', size: 16 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 4 },
    { color: 'orange', size: 11 },
    { color: 'purple', size: 23 },
    { color: 'rouge', size: 44 },    
];
var data5t1 = [
    { color: 'blue' , size: 15 },
    { color: 'green', size: 16 },
    { color: 'orange', size: 11},
    { color: 'purple', size: 23},
    { color: 'red', size: 18},
    { color: 'rouge', size: 44},
];
var data5t2 = [
    { color: 'rouge', size: 44},
    { color: 'red', size: 18},
    { color: 'purple', size: 23},
    { color: 'orange', size: 11},
    { color: 'green', size: 16 },
    { color: 'blue' , size: 15 },
];
var data5t3 = [
    { color: 'purple', size: 23},
    { color: 'orange', size: 11},
    { color: 'green', size: 16 },
];
var data5t4 = [
    { color: 'orange', size: 11},
    { color: 'blue' , size: 15 },
    { color: 'green', size: 16 },
    { color: 'red', size: 18},
    { color: 'purple', size: 23},
    { color: 'rouge', size: 44},
];
var data5t5 = [
    { color: 'rouge', size: 44},
    { color: 'purple', size: 23},
    { color: 'red', size: 18},
    { color: 'green', size: 16 },
    { color: 'blue' , size: 15 },
    { color: 'orange', size: 11},
];


describe('#aquery(data).filter(\'size\', \'gt\', 10).run()', function () {
    it('should return an array of items having the prop \'size\' greater than 10:', function () {
        var result = aquery(data).filter('size', 'gt', 10).run();
        assert.deepEqual(result, datat1);
    });
});

describe('#aquery(data).filter(\'size\', \'gt\', 10).filter(\'color\', \'eq\', \'blue\').run()', function () {
    it('should return an array of items having the prop \'size\' greater than 10 and color blue:', function () {
        var result = aquery(data).filter('size', 'gt', 10).filter('color', 'eq', 'blue').run();
        assert.deepEqual(result, datat2);
    });
});

describe('#aquery(data).run()', function () {
    it('should return original array:', function () {
        var result = aquery(data).run();
        assert.deepEqual(result, data);
    });
});

describe('#aquery(data2).filter(null, \'gt\', 5).run()', function () {
    it('should return an array of items having value greater than 5:', function () {
        var result = aquery(data2).filter(null, 'gt', 5).run();
        assert.deepEqual(result, data2t1);
    });
});

describe('#aquery(data2).limit(10).run()', function () {
    it('should return first 10 items of array:', function () {
        var result = aquery(data2).limit(10).run();
        assert.deepEqual(result, data2t2);
    });
});

describe('#aquery(data2).offset(3).limit(10).run()', function () {
    it('should return items 4 to 14 of array:', function () {
        var result = aquery(data2).offset(3).limit(10).run();
        assert.deepEqual(result, data2t3);
    });
});

describe('#aquery(data3).filter(\'color\', \'contains\', \'bl\').run()', function () {
    it('should return items with color prop containing \'bl\':', function () {
        var result = aquery(data3).filter('color', 'contains', 'bl').run();
        assert.deepEqual(result, data3t1);
    });
});

describe('#aquery(data3).filter(\'color\', \'gt\', 5).run()', function () {
    it('should return empty array as can\'t do gt than on string:', function () {
        var result = aquery(data3).filter('color', 'gt', 5).run();
        assert.deepEqual(result, []);
    });
});

describe('#aquery(data4).orderBy(\'color\').run()', function () {
    it('should return items ordered by color:', function () {
        var result = aquery(data4).orderBy('color', 'desc', 'string').run();
        assert.deepEqual(result, data4t1);
    });
});

describe('#aquery(data5).filter(\'size\', \'gt\', 10).orderBy(\'color\', \'desc\', \'string\').run()', function () {
    it('should return items ordered by color with size greater than 10:', function () {
        var result = aquery(data5).filter('size', 'gt', 10).orderBy('color', 'desc', 'string').run();
        assert.deepEqual(result, data5t1);
    });
});

describe('#aquery(data5).filter(\'size\', \'gt\', 10).orderBy(\'color\', \'asc\', \'string\').run()', function () {
    it('should return items ordered by color ASC with size greater than 10:', function () {
        var result = aquery(data5).filter('size', 'gt', 10).orderBy('color', 'asc', 'string').run();
        assert.deepEqual(result, data5t2);
    });
});

describe('#aquery(data5).filter(\'size\', \'gt\', 10).orderBy(\'color\', \'asc\', \'string\').offset(2).limit(3).run()', function () {
    it('should return items (offset 2 limit 3) ordered by color ASC with size greater than 10:', function () {
        var result = aquery(data5).filter('size', 'gt', 10).orderBy('color', 'asc', 'string').offset(2).limit(3).run();
        assert.deepEqual(result, data5t3);
    });
});

describe('#aquery(data5).filter(\'size\', \'gt\', 10).orderBy(\'size\', \'desc\', \'string\').run()', function () {
    it('should return items ordered by size DESC with size greater than 10:', function () {
        var result = aquery(data5).filter('size', 'gt', 10).orderBy('size', 'desc', 'string').run();
        assert.deepEqual(result, data5t4);
    });
});

describe('#aquery(data5).filter(\'size\', \'gt\', 10).orderBy(\'size\', \'asc\', \'string\').run()', function () {
    it('should return items ordered by size ASC with size greater than 10:', function () {
        var result = aquery(data5).filter('size', 'gt', 10).orderBy('size', 'asc', 'string').run();
        assert.deepEqual(result, data5t5);
    });
});

describe('#aquery(data3).registerFilter({function})', function () {
    it('should add a filter function to aquery:', function () {
        var result = aquery().registerFilter('lengthof', function (a, b) {
            if (a.length === b) {
                return true;
            }
            return false;
        });
        assert.deepEqual(result, null);
    });
});

describe('#aquery(data3).filter(\'color\', \'lengthof\', 3).run()', function () {
    it('should return items with color props 3 chars long:', function () {
        var result = aquery(data3).filter('color', 'lengthof', 3).run();
        assert.deepEqual(result, data3t2);
    });
});

describe('#filter_gt(a,b)', function () {
    it('should not be accessable in global scope:', function () {
        try {
            var result = filter_gt(5, 7);
        }
        catch (err) {
            assert.equal(true, true);
        }
    });
});