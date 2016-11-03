/*!
 * stream-copy-dir <https://github.com/tunnckoCore/stream-copy-dir>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var app = require('create-readdir-stream')
var path = require('path')
var through2 = require('through2')
var writeFile = require('write-file')

module.exports = function streamCopyDir (src, dest, plugin) {
  return app.createReaddirStream(src)
    .pipe(through2.obj(function (file, enc, cb) {
      fs.stat(file.path, function (err, stats) {
        if (err) return cb(err)
        file.stat = stats
        if (file.stat.isDirectory()) {
          return cb(null, file)
        }
        fs.readFile(file.path, function (err, str) {
          if (err) return cb(err)
          file.contents = str

          if (typeof plugin === 'function') {
            plugin(file)
          }

          var fp = path.resolve(dest, file.basename)
          writeFile(fp, file.contents, cb)
        })
      })
    }))
}

// streamCopyDir('./', '../foo/bar/baz', function (file) {
//   var str = file.contents.toString().replace('{foo}', 'ba222aaareee!')
//   file.contents = new Buffer(str)
// })
