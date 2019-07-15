const greeter = require('./Greeter.js');
require('./index.css');
require('./index.less');

let fn = () => {
    console.log('这是个什么东西？');
};

fn();

class A {
    a = 1;
}