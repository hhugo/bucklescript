// GENERATED CODE BY BUCKLESCRIPT VERSION 0.3 , PLEASE EDIT WITH CARE
'use strict';

var Caml_int32 = require("../caml_int32");

function odd(_z) {
  while(true) {
    var z = _z;
    var even = Caml_int32.imul(z, z);
    var a = (even + 4 | 0) + even | 0;
    console.log("" + a);
    _z = 32;
    continue ;
    
  };
}

var even = odd

exports.odd  = odd;
exports.even = even;
/* No side effect */
