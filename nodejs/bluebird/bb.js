var Promise = require('bluebird');

// 1.promise all
Promise.all([
    Promise.resolve(1),
    Promise.resolve(2)
]).spread((p1, p2) => {
    console.log(`p1=${p1} p2=${p2}`)
})

// 2.promise delay
Promise.delay(2000).then(function(){
    console.log('delay func');
})

// 3.promise catch
Promise.delay(500).then(function(){
    throw new Error('NOTHING')
}).catch(TypeError, function(e){
    console.log(e)
}).catch(ReferenceError, function(e){
    console.log(e)
}).catch(function(e){
    console.log('all error!');
})

// 4.custom error
function MyCustomError(message) {
    this.message = message;
    this.name = '';
    Error.captureStackTrace(this, MyCustomError);
}

// 5.promise file
const readFile = Promise.promisify(require('fs').readFile);

readFile('package.json', 'utf8')
.then(function(contents){
    console.log(contents)
})

// 6.tranform plain func to promise support
const fsAsync = Promise.promisifyAll(require('fs'));
fsAsync.readFileAsync('package.json', 'utf8')
.then(function(cts){
    console.log(cts);
})

// 7.promise with cb
Promise.fromCallback((cb) => {
    cb(null, 'hello', '2017')
}, { multiArgs: true }).spread((p1, p2) => {
    console.log(p1, p2);
})


// 8.constrol flow, just like co lib
// you can yield any type by writing your Promise.coroutine.addYieldHandler
function PingPong() {

}

PingPong.prototype.ping = Promise.coroutine(function* (val) {
    console.log("Ping?", val);
    yield Promise.delay(500);
    this.pong(val+1);
});

PingPong.prototype.pong = Promise.coroutine(function* (val) {
    console.log("Pong!", val);
    yield Promise.delay(500);
    this.ping(val+1);
});

var a = new PingPong();
a.ping(0);