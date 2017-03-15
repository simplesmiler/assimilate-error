# assimilate-error

> Assimilate error-like object, that originated from a different execution context, or was created in a weird way.

## Install

``` sh
$ npm install assimilate-error --save
```

## Usage

``` js
var errio = require('errio');
var assimilateError = require('assimilate-error');

var err1 = new Error('Demo');
var serialized1 = errio.toObject(err1, { stack: true });

var err2 = errio.fromObject(serialized1);
err2; // outputs `Error { ... }` in the Chrome console

err2 = assimilateError(err2);
err2; // outputs `Error: Demo` with the stack in Chrome console
```

## License

[ISC](https://opensource.org/licenses/ISC)
