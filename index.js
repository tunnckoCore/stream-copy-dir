/*!
 * stream-copy-dir <https://github.com/tunnckoCore/stream-copy-dir>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var path = require('path')
var utils = require('./utils')

/**
 * > Copy files from `src` to `dest` directory
 * without globs and recursion. Can provide `plugin`
 * function  to modify file contents, which is useful
 * for template engines. The `plugin` function gets
 * two arguments - `file` and `cb`, where `file` is [vinyl][]
 * file and `cb` is optional, but it's recommended to pass the file
 * like so `cb(null, file)`
 *
 * **Example**
 *
 * ```js
 * var copyFolder = require('stream-copy-dir')
 * var handlebars = require('handlebars')
 *
 * function plugin (file, cb) {
 *   var contents = file.toString()
 *   var template = handlebars.compile(contents)
 *
 *   contents = template({
 *     name: 'Charlike',
 *     baz: 'qux'
 *   })
 *
 *   // Buffer constructor is deprecated
 *   // so don't use `new Buffer` anymore in new code/projects
 *   // instead use `Buffer.from`
 *   file.contents = new Buffer(contents)
 *
 *   cb(null, file)
 * }
 *
 * copyFolder('./src/templates', './my-project', plugin)
 *   .once('error', console.error)
 *   .once('finish', function () {
 *     console.log('copied and modified without errors')
 *   })
 * ```
 *
 * @param  {String|Buffer} `<src>` source directory with files, passed to [create-readdir-stream][]
 * @param  {String|Buffer} `<dest>` destination folder for (modified) files, passed to [write-file][]
 * @param  {Function} `[plugin]` perfect place to access and modify contents of each file
 * @return {Stream} transform stream, [through2][]
 * @api public
 */

module.exports = function streamCopyDir (src, dest, plugin) {
  var app = new utils.dir.CreateReaddirStream()
  return app.createReaddirStream(src)
    .pipe(utils.through2.obj(function (file, enc, cb) {
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
            utils.writeFile(fp, file.contents, cb)
          }

          end(file)
        })
      })
    }))
}
