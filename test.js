/*!
 * stream-copy-dir <https://github.com/tunnckoCore/stream-copy-dir>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('mukla')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var copyDir = require('./index')

test('should not copy directories and skip them', function (done) {
  rimraf.sync('./tmp')
  mkdirp.sync('./tmp/actual/foobar')
  mkdirp.sync('./tmp/dest')

  fs.writeFileSync('./tmp/actual/qux.txt', 'some content')

  copyDir('./tmp/actual', './tmp/dest')
    .once('error', done)
    .once('finish', function () {
      var len = fs.readdirSync('./tmp/dest').length
      test.strictEqual(len, 1)
      rimraf.sync('./tmp')
      done()
    })
})

test('should allow customizing file content through plugin', function (done) {
  rimraf.sync('./abc')
  mkdirp.sync('./abc/zzz')

  fs.writeFileSync('./abc/zzz/ddd.json', 'aa{{name}}cc')

  copyDir('./abc/zzz', './abc', function (file, cb) {
    var contents = file.contents.toString()
    contents = contents.replace('{{name}}', 'BBB')
    file.contents = new Buffer(contents)
    cb(null, file)
  })
    .once('error', done)
    .once('finish', function () {
      var data = fs.readFileSync('./abc/ddd.json', 'utf8')
      test.strictEqual(data, 'aaBBBcc')
      rimraf.sync('./abc')
      done()
    })
})

