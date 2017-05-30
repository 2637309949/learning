"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./verify1/test");
var Utils2 = require("./verify2/test");
// use js file
var myArrs = Utils.arrs;
console.log('arrs1: ', myArrs);
// use ts file
myArrs = Utils2.arrs;
console.log('arrs2: ', myArrs);
