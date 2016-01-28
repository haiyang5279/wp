/**
 * Created with JetBrains WebStorm.
 * User: 28652
 * Date: 15-6-30
 * Time: 下午4:17
 * 压缩JS,CSS文件，拷贝资源文件到时间戳文件夹，拷贝相关的文件，生成发布目录
 *
 * toHTML 生成静态HTML流程 on 2015-07-18
 * 1、执行 toHTMLMini
 * 2、修改config.json，onLine修改为1，staticVer修改为时间戳（时间戳在第一步的时候会生成，在public目录下）
 * 3、执行 toHTML
 *
 * tip：需要单独执行gulpfile.js中的某一个任务，可以使用webStorm的gulp插件，亦可以使用命令 gulp toHTMLMini;
 */

var _ = require('underscore');
var moment = require('moment');
var gulp = require('gulp');
var concat = require('gulp-concat');        //文件合并
var uglify  = require('gulp-uglify');       //js压缩
var minifycss = require('gulp-minify-css'); //css压缩
var zip = require('gulp-zip');              //zip压缩
var fs = require('fs');

var upload_aliyun = require('./gulpUpload');

var mod = {};

mod.ver = moment().format("MMDDHHmmss");
mod.dir = 'D:/LC_Web_' + mod.ver;

/**
 * 压缩CSS，移动至临时目录
 */
gulp.task('min_css', function(){
    var dir = './public/css/',
        arr = [
            dir + 'base.css',
            dir + 'fn.css',
            dir + 'layout.css',
            dir + 'ui.*.css',
            dir + 'p.*.css'
        ];

    return gulp.src(arr)
        .pipe(concat('lc.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/' + mod.ver + '/css/'));
});

/**
 * 压缩通用JS，移动至临时目录
 */
gulp.task('min_js', function(){
    var dir = './public/js/lib/',
        arr = [
            dir + 'jquery-1.11.3.min.js',
            dir + 'underscore-min.js',
            dir + 'backbone-min.js',
            dir + 'require.js',
            dir + 'jquery.flexslider-min.js',
            './public/js/ui/*.js',
            './public/js/page/*.js'
        ];

    return gulp.src(arr)
        .pipe(concat('lc.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/' + mod.ver + '/js/'));
});

/**
 * 拷贝其他资源至临时目录
 */
gulp.task('copy', function(){
    var arr = [
        './public/@(css)/@(font)/**/*',
        './public/@(css)/hack-*.css',
        './public/@(img)/**/*',
        './public/@(ckplayer)/**/*'
    ];
    return gulp.src(arr)
        .pipe(gulp.dest('./public/' + mod.ver));
});

var minTaskList = ['min_css', 'min_js', 'copy'];

/**
 * min任务只是为了开发的时候测试用，发布的时候，不使用。
 */
gulp.task('min', minTaskList, function(){
    return true;
});

/**
 * 静态资源上传至阿里云存储空间。
 */
gulp.task('upload', minTaskList, function(){

    return gulp.src('./public/@('+mod.ver+')/**/*')
        .pipe( upload_aliyun() );
});

/**
 * 临时上传
 */
gulp.task('uploadSearch', function(){

    return gulp.src('./public/@(x-search)/**/*')
        .pipe( upload_aliyun() );
});

/**
 * 临时上传
 */
gulp.task('uploadBaidu', function(){

    return gulp.src('./public/baidu_verify_hjv6dfGSCr.html')
        .pipe( upload_aliyun() );
});

/**
 * 临时上传
 */
gulp.task('uploadX', function(){

    return gulp.src('./public/@(x-test)/**/*')
        .pipe( upload_aliyun() );
});

/**
 * 拷贝项目中的文件至发布目录。
 */
gulp.task('publish', ['upload'], function(){
    var dir = mod.dir;

    //创建发布目录
    fs.mkdirSync(dir);

    mod.buildConfig(dir);

    var arr = [
        './@(bin|lib|controller)/**/*',
        './@(public)/@(page)/**/*',
        './@(public)/@(img)/favicon.ico',
        './@(app.js|package.json|route.js|pm2.json)'
    ];
    return gulp.src(arr)
        .pipe(gulp.dest(dir));
});

/**
 * zip发布目录。
 */
gulp.task('zip', ['publish'], function(){
   return gulp.src(mod.dir + '/**/*')
       .pipe(zip('LC_Web_' + mod.ver + '.zip'))
       .pipe(gulp.dest('D:/'));
});

/**
 * 输出配置信息：测试或线上。
 */
mod.buildConfig = function(dir){
    var online = {
        "onLine": 1,                        //是否是线上环境
        "staticPath": "http://static.lechange.cn",//线上环境，静态资源的URL地址。如： http://static.lecheng.cn
        "staticVer": mod.ver,               //静态资源的时间戳
        "LC_URL": "http://www.lecheng.cn",  //链接的绝对路径
        "port": 80                       //端口
    }
    fs.writeFileSync(dir + '/config.json', JSON.stringify(online));
};


gulp.task('default',['zip'], function() {
    console.log('** gulp finish **');
});