/**
 * gulp插件。实现上传到阿里云的功能。
 * Created by 28652 on 2015/9/23.
 */

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

var _ = require('underscore');
var ossWrap = require('./lib/oss_wrap');

// 常量
const PLUGIN_NAME = 'gulp-upload-aliyun';

module.exports = function(opt) {
    return through.obj(function (file, enc, cb) {
        var w = this;
        if (file.isNull()) {
            w.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            var pathname = file.relative.replace(/\\/g, '/'), fileName = path.basename(file.path);

            ossWrap.uploadData(pathname, file.contents, {rename: fileName}, function(err, resp){
                if(err){
                    console.log('************ upload err ***********' + pathname, err);
                    w.push(file);
                    cb();
                    return
                }

                console.log('oss upload success ', pathname);
                w.push(file);
                cb();
            });
        }


    });
};