var test = require('tape')

test('this is demo for test1', t => {
    t.plan(2);

    t.deepEqual({
        name: 'test'
    }, {
        name: 'test'
    });
    t.deepEqual({
        name: 'test'
    }, {
        name: 'test'
    })

    t.end();
});


test('this is demo for test2', async t => {
    t.plan(1);
    console.log('22222');

    await Promise
    .resolve('hello')
    .then(c => t.equal(c, 'hello'))

    console.log('33333');
    t.end();
});

