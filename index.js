/*!
 * stream-copy-dir <https://github.com/tunnckoCore/stream-copy-dir>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var Readdir = require('create-readdir-stream').CreateReaddirStream
var path = require('path')
var through2 = require('through2')
var writeFile = require('write-file')

module.exports = function streamCopyDir (src, dest, plugin) {
  var app = new Readdir()
  return app.createReaddirStream(src)
    .pipe(through2.obj(function (file, enc, cb) {
      fs.stat(file.path, function (err, stats) {
        /* istanbul ignore next */
        if (err) return cb(err)

        file.stat = stats
        file.contents = null

        if (file.stat.isDirectory()) {
          return cb(null, file)
        }

        fs.readFile(file.path, function (err, str) {
          /* istanbul ignore next */
          if (err) return cb(err)

          file.contents = str

          if (typeof plugin === 'function') {
            var called = false
            plugin(file, function (er, f) {
              called = true
              /* istanbul ignore next */
              if (er) return cb(er)
              end(f)
            })

            /* istanbul ignore next */
            return called ? null : end(file)
          }

          function end (file) {
            var fp = path.resolve(dest, file.basename)
            writeFile(fp, file.contents, cb)
          }

          end(file)
        })
      })
    }))
}
