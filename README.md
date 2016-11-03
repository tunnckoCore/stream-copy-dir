# [stream-copy-dir][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Streaming copy of directory to destination - no globs and no recursion. In addition can pass a 'plugin' function to modify the contents of each file - perfect place for template engines.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i stream-copy-dir --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const streamCopyDir = require('stream-copy-dir')
```

## API

### [streamCopyDir](index.js#L60)
> Copy files from `src` to `dest` directory without globs and recursion. Can provide `plugin` function  to modify file contents, which is useful for template engines. The `plugin` function gets two arguments - `file` and `cb`, where `file` is [vinyl][] file and `cb` is optional, but it's recommended to pass the file like so `cb(null, file)`

**Params**

* `<src>` **{String|Buffer}**: source directory with files, passed to [create-readdir-stream][]    
* `<dest>` **{String|Buffer}**: destination folder for (modified) files, passed to [write-file][]    
* `[plugin]` **{Function}**: perfect place to access and modify contents of each file    
* `returns` **{Stream}**: transform stream, [through2][]  

**Example**

```js
var copyFolder = require('stream-copy-dir')
var handlebars = require('handlebars')

function plugin (file, cb) {
  var contents = file.toString()
  var template = handlebars.compile(contents)

  contents = template({
    name: 'Charlike',
    baz: 'qux'
  })

  // Buffer constructor is deprecated
  // so don't use `new Buffer` anymore in new code/projects
  // instead use `Buffer.from`
  file.contents = new Buffer(contents)

  cb(null, file)
}

copyFolder('./src/templates', './my-project', plugin)
  .once('error', console.error)
  .once('finish', function () {
    console.log('copied and modified without errors')
  })
```

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [callback2stream](https://www.npmjs.com/package/callback2stream): Transform sync, async or generator function to Stream. Correctly handle errors and optional arguments. | [homepage](https://github.com/hybridables/callback2stream#readme "Transform sync, async or generator function to Stream. Correctly handle errors and optional arguments.")
- [create-readdir-stream](https://www.npmjs.com/package/create-readdir-stream): Streaming `fs.readdir`, extensible with smart plugins. No recursion and no globs by default - [use][] plugins. Does… [more](https://github.com/tunnckocore/create-readdir-stream#readme) | [homepage](https://github.com/tunnckocore/create-readdir-stream#readme "Streaming `fs.readdir`, extensible with smart plugins. No recursion and no globs by default - [use][] plugins. Does not stat and doesn't read the filepaths - use plugins. It just push [vinyl][] files to stream. Follows signature and semantics of `fs.creat")
- [minibase](https://www.npmjs.com/package/minibase): MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [promise2stream](https://www.npmjs.com/package/promise2stream): Transform ES2015 Promise to Stream - specifically, Transform Stream using [through2][]. Works in object mode by default… [more](https://github.com/hybridables/promise2stream#readme) | [homepage](https://github.com/hybridables/promise2stream#readme "Transform ES2015 Promise to Stream - specifically, Transform Stream using [through2][]. Works in object mode by default, but you can pass options directly to the [through2][] package.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/stream-copy-dir/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[create-readdir-stream]: https://github.com/tunnckocore/create-readdir-stream
[dezalgo]: https://github.com/npm/dezalgo
[once]: https://github.com/isaacs/once
[through2]: https://github.com/rvagg/through2
[use]: https://github.com/jonschlinkert/use
[vinyl]: https://github.com/gulpjs/vinyl
[write-file]: https://github.com/tunnckocore/write-file

[npmjs-url]: https://www.npmjs.com/package/stream-copy-dir
[npmjs-img]: https://img.shields.io/npm/v/stream-copy-dir.svg?label=stream-copy-dir

[license-url]: https://github.com/tunnckoCore/stream-copy-dir/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/stream-copy-dir.svg

[downloads-url]: https://www.npmjs.com/package/stream-copy-dir
[downloads-img]: https://img.shields.io/npm/dm/stream-copy-dir.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/stream-copy-dir
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/stream-copy-dir.svg

[travis-url]: https://travis-ci.org/tunnckoCore/stream-copy-dir
[travis-img]: https://img.shields.io/travis/tunnckoCore/stream-copy-dir/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/stream-copy-dir
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/stream-copy-dir.svg

[david-url]: https://david-dm.org/tunnckoCore/stream-copy-dir
[david-img]: https://img.shields.io/david/tunnckoCore/stream-copy-dir.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

