// GENERATED CODE BY BUCKLESCRIPT VERSION 0.3 , PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../caml_builtin_exceptions");
var Caml_obj                = require("../caml_obj");
var Caml_format             = require("../caml_format");
var Block                   = require("../block");
var Ext_string              = require("./ext_string");
var Curry                   = require("../curry");
var Ext_log                 = require("./ext_log");
var Lam_current_unit        = require("./lam_current_unit");
var $$String                = require("../string");
var List                    = require("../list");

function process(x) {
  switch (x) {
    case "index__" : 
    case "index__r" : 
    case "index__r_unsafe" : 
    case "index__unsafe_r" : 
        return /* tuple */[
                /* Js_read_index */0,
                "index"
              ];
    case "index__w" : 
    case "index__w_js" : 
    case "index__w_js_unsafe" : 
    case "index__w_unsafe" : 
        return /* tuple */[
                /* Js_write_index */1,
                "index"
              ];
    default:
      var sub = "__";
      var v = Ext_string.rfind(sub, x);
      if (v < 0) {
        return /* tuple */[
                /* Unknown */Block.__(2, [/* None */0]),
                x
              ];
      }
      else {
        var len_sub = sub.length;
        var indicator = Ext_string.tail_from(x, v + len_sub | 0);
        var normal_name = $$String.sub(x, 0, v);
        switch (indicator) {
          case "r" : 
              return /* tuple */[
                      /* Js_read */3,
                      normal_name
                    ];
          case "w" : 
              return /* tuple */[
                      /* Js_write */2,
                      normal_name
                    ];
          default:
            var props = Ext_string.split(/* None */0, indicator, /* "_" */95);
            var kind = [/* None */0];
            var arity = [/* None */0];
            var fail = function (l) {
              var error = "invalid indicator" + (indicator + ("in method name " + (x + (":" + Lam_current_unit.get_file(/* () */0)))));
              Curry._1(Ext_log.err(l, /* Format */[
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* End_of_format */0
                          ]),
                        "%s"
                      ]), error);
              throw [
                    Caml_builtin_exceptions.failure,
                    error
                  ];
            };
            var update_ref = function (r, k) {
              var match = r[0];
              if (match) {
                if (Caml_obj.caml_notequal(match[0], k)) {
                  return fail('File "lam_methname.ml", line 107, characters 42-49');
                }
                else {
                  return 0;
                }
              }
              else {
                r[0] = /* Some */[k];
                return /* () */0;
              }
            };
            List.iter(function (x) {
                  switch (x) {
                    case "gen" : 
                        return update_ref(kind, /* Unknown */785140586);
                    case "js" : 
                        return update_ref(kind, /* Js */16617);
                    case "ml" : 
                        return update_ref(kind, /* Ml */17279);
                    case "unsafe" : 
                        return /* () */0;
                    default:
                      var exit = 0;
                      var v;
                      try {
                        v = Caml_format.caml_int_of_string(x);
                        exit = 1;
                      }
                      catch (exn){
                        return fail('File "lam_methname.ml", line 122, characters 34-41');
                      }
                      if (exit === 1) {
                        return update_ref(arity, v);
                      }
                      
                  }
                }, props);
            var arity$1 = arity[0];
            var match = kind[0];
            var $js;
            if (match) {
              var match$1 = match[0];
              $js = match$1 !== 17279 ? (
                  match$1 >= 785140586 ? /* Unknown */Block.__(2, [arity$1]) : /* Js */Block.__(0, [arity$1])
                ) : /* Ml */Block.__(1, [arity$1]);
            }
            else {
              $js = /* Js */Block.__(0, [arity$1]);
            }
            return /* tuple */[
                    $js,
                    normal_name
                  ];
        }
      }
  }
}

exports.process = process;
/* Ext_log Not a pure module */
