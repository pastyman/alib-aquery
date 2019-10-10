"use strict";

var hashtable = require('alib-hashtable');
const filterFuncs = hashtable('name');

//filter funcs packaged functions,
//////////////////////////////////////////////////////////////////////////////////////////
function filter_eq(a, b) {
  if (a === b) {
    return true;
  }
  return false;
}
function filter_gt(a, b) {
  if (a > b) {
    return true;
  }
  return false;
}
function filter_lt(a, b) {
  if (a < b) {
    return true;
  }
  return false;
}
function filter_contains(a, b, options) {
  if (options && options.ignoreCase) {
    if (a.toLowerCase().includes(b.toLowerCase())) {
      return true;
    }
  }
  else {
    if (a.includes(b)) {
      return true;
    }
  }
  return false;
}

//push filter funcs packaged functions, these are extensible through registerFilter
//////////////////////////////////////////////////////////////////////////////////////////
filterFuncs.set({
  name: 'eq',
  func: filter_eq
});
filterFuncs.set({
  name: 'gt',
  func: filter_gt
});
filterFuncs.set({
  name: 'lt',
  func: filter_lt
});
filterFuncs.set({
  name: 'contains',
  func: filter_contains
});

//chainable array filter library
module.exports = function alibFilter(arrayToFilter) {
  //filter stack
  var filterStack = [];
  var limitVal = null;
  var offsetVal = 0;
  var orderBySet = false;
  var orderByComparator = null;
  var orderByProp = null;

  var registerFilter = function (name, func) {
    filterFuncs.set({
      name: name,
      func: func
    });
  }

  //add a filter
  //////////////////////////////////////////////////////////////////////////////////////////
  var filter = function (prop, name, value, options) {
    filterStack.push({
      prop: prop,
      name: name,
      value: value,
      options: options
    });

    return this;
  };

  //limit & offset
  //////////////////////////////////////////////////////////////////////////////////////////  
  var limit = function (limit) {
    limitVal = limit;

    return this;
  }
  var offset = function (offset) {
    offsetVal = offset;

    return this;
  }

  var orderBy = function (prop, direction, type) {
    orderBySet = true;
    orderByProp = prop;

    //ordering functions
    var comp_desc = function (a, b) {
      return a > b ? 1 : (a < b ? -1 : 0);
    };
    var comp_asc = function (a, b) {
      return a > b ? -1 : (a < b ? 1 : 0);
    };

    if (direction === 'desc') {
      orderByComparator = comp_desc;
    }
    if (direction === 'asc') {
      orderByComparator = comp_asc;
    }

    

    return this;
  }

  function insertSorted(arr, item) {
    // get the index we need to insert the item at
    var min = 0;
    var max = arr.length;
    var index = Math.floor((min + max) / 2);
    while (max > min) {
      if (orderByProp !== null) {
        if (orderByComparator(item[orderByProp], arr[index][orderByProp]) < 0) {
          max = index;
        } else {
          min = index + 1;
        }
      }
      else {
        if (orderByComparator(item, arr[index]) < 0) {
          max = index;
        } else {
          min = index + 1;
        }
      }

      index = Math.floor((min + max) / 2);
    }

    // insert the item
    arr.splice(index, 0, item);
  };

  //result passback, used at end of chain
  var run = function () {
    var offset = 0;
    var limit = 0;
    var results = [];
    var resultsOrderBy = [];

    //temp vars
    var tfunc = null;
    var tpropval = null;
    var toptions = null;
    var hasFailed = false;

    //execute filter
    for (var i = 0; i < arrayToFilter.length; i++) {
      //check filters
      hasFailed = false;
      for (var j = 0; j < filterStack.length; j++) {
        //check if prop present
        if (arrayToFilter[i][filterStack[j].prop] || filterStack[j].prop === null) {
          //get value
          tpropval = ((filterStack[j].prop !== null) ? arrayToFilter[i][filterStack[j].prop] : arrayToFilter[i]);
          toptions = null;
          if (filterStack[j].options) {
            toptions = filterStack[j].options;
          }
          //check
          if (!filterFuncs.get(filterStack[j].name).func(tpropval, filterStack[j].value, toptions)) {
            //failed this filter
            hasFailed = true;
            //break no need to check any more filters as failed this one
            break;
          }
        }
      }

      //check limit / offset
      if (!hasFailed) {
        if (!orderBySet) {
          if (offset >= offsetVal) {
            if ((limitVal === null) || (results.length < limitVal)) {
              //within limit and offset - push to output
              results.push(arrayToFilter[i]);
            }
            else {
              //exceeded limit
              break;
            }
          }
          //inc
          offset++;
        }
        else {
          //order by has been set so we need to do a full scan before running limit and offset
          insertSorted(resultsOrderBy, arrayToFilter[i]);
        }
      }

    }

    if (!orderBySet) {
      //return non ordered results
      return results;
    }

    if (limitVal !== null) {
      //return resultsOrderBy with applied offset / limit
      return resultsOrderBy.slice(offsetVal, (limitVal + offsetVal));
    }

    return resultsOrderBy;
  };

  //return
  return {
    filter: filter,
    limit: limit,
    offset: offset,
    orderBy: orderBy,
    registerFilter: registerFilter,
    run: run
  };

};
