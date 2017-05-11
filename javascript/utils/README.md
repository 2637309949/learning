Array
-----

**array实现n次遍历**
   
    // use the spread syntax of es6
    var arrs = [...Array(12)].map(x => Array.apply())

    // to fill a empty array
    var arrs = Array(3).fill().map(x => Array.apply())

----------
**array实现range**

    if (!Array.prototype.range) {
      Object.defineProperty(Array.prototype, 'range', {
        value: function(a, b, step) {
            var A= [];
            if(typeof a == 'number'){
                A[0]= a;
                step= step || 1;
                while(a+step<= b){
                    A[A.length]= a+= step;
                }
            }
            else{
                var s= 'abcdefghijklmnopqrstuvwxyz';
                if(a=== a.toUpperCase()){
                    b=b.toUpperCase();
                    s= s.toUpperCase();
                }
                s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
                A= s.split('');        
            }
            return A;
        }
      });
    }

----------
**array实现flatMap**

    if (!Array.prototype.flatMap) {
      Object.defineProperty(Array.prototype, 'flatMap', {
        value: function(predicate) {
          return Array.prototype.concat.apply([], this.map(predicate));
        }
      });
    }

----------
**array实现equals**

    if (!Array.prototype.equals) {
      Object.defineProperty(Array.prototype, 'equals', {
        value: function(array) {
          if (!array) return false;
          if (this.length !== array.length) return false;
          for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
              if (!this[i].equals(array[i])) return false;
            }
            else if (this[i] !== array[i]) {
              return false;
            }
          }
          return true;
        },
        enumerable: false
      });
    }

----------
**array实现find**

    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
          for (var i = 0, value; i < this.length; i++) {
            value = this[i];
            if (predicate.call(this, value))
              return value;
          }
          return undefined;
        }
      });
    }

----------
**array实现findIndex**

    if (!Array.prototype.findIndex) {
      Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
          'use strict';
          if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
          }
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          var value;
          for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return i;
            }
          }
          return -1;
        },
        enumerable: false,
        configurable: false,
        writable: false
      });
    }


Date
-----
**Date实现Format**

    if (!Date.prototype.Format) {
      Object.defineProperty(Date.prototype, 'Format', {
        value: function(fmt) {
          var o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
          return fmt;
        },
        enumerable: false
      });
    }


String
-----
**String实现startsWith**

    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      };
    }

