import * as Utils1 from './verify1/test';
import * as Utils2 from './verify2/test';

// use js mudule
// Tag: tsc never copy js files to lib dir
// 只是使用.d.ts文件
let myArrs:string = Utils1.arrs;
console.log('arrs1: ', myArrs);

// use ts mudule
// Tag: tsc split .ts files to .d.ts and .js
// 生成.js和.d.ts
myArrs = Utils2.arrs;
console.log('arrs2: ', myArrs);


