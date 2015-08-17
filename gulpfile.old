var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var templates = require('gulp-angular-templatecache');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var manifest;

gulp.task('usemin',['templates'], function() {
  gulp.src('./public/index.html')
      .pipe(usemin({
        //html: [revReplace({manifest: manifest}), minifyHTML({empty: true})],
        html: [revReplace({manifest: manifest})],
        css: [minifyCss(), 'concat', rev()],
        vendorcss: [minifyCss(), 'concat', rev()],
        vendorjs: [stripDebug(), uglify(), rev()],
        js: [stripDebug(), uglify(), rev()]
      }))
      .pipe(gulp.dest('www/'));
});

gulp.task('templates', function () {
  manifest = gulp.src(['./public/partials/*.html'])
    .pipe(minifyHTML({ quotes: true}))
    .pipe(templates('templates.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('www/assets/javascript/'))
    .pipe(rev.manifest())
});

gulp.task('libcopy', function () {
  gulp.src('./public/assets/images/*.*')
    .pipe(gulp.dest('www/assets/images/'));

  gulp.src('./public/assets/fonts/*.*')
    .pipe(gulp.dest('www/assets/fonts/'));
});

gulp.task('clean', function() {
    return gulp.src('www/*')
        .pipe(vinylPaths(del));
});

gulp.task('default',['clean'], function() {
  gulp.start('libcopy', 'usemin');
});

