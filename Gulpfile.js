var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    concat = require("gulp-concat"),
    child = require("child_process"),
    fs = require('fs'),
    gutil = require("gulp-util"),
    colors = require("colors")

gutil.log = require("./bin/log")

var server;
gulp.task('browserify', function(){
  gulp.src('src/js/main.js')
  .pipe(browserify({transform: 'reactify'}))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/js'))

})

gulp.task('copy', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('styles', function(){
    return sass('src/sass/',{style: 'expanded'})
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8' , 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix:".min"}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
    })



gulp.task('watch', function(){
gulp.watch('src/sass/*.scss', ['styles']);
gulp.watch('src/*.html', ['copy'])
gulp.watch("src/js/*/*.*", ['browserify'])
gulp.watch("server.js", ['restart'])
    })

gulp.task('server', function(){
  server = child.spawn('node', ['server.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.on('data', function(data){
   process.stdout.write(data.toString())
    })
  server.stderr.pipe(log);
  
})
gulp.task('restart', function(){
  server.kill('SIGINT');
  gulp.start('server')
  gutil.log("server restarted!".red)

})

gulp.task('default', ['styles','server', 'watch'], function() {
  // place code for your default task here
});