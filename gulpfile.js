var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var babel = require('babel/register');
var notifier = require('node-notifier');

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: {
        js: babel
      }
    }))
    .on('error', function(err){
      notifier.notify({
        title: 'Mocha error',
        message: 'Error: ' + err.message,
        sound: true,
      })
    });
});

gulp.task('watch', function() {
    gulp.watch(['App/*.js', 'test/**'], ['mocha']);
});

gulp.task('default', ['mocha']);
