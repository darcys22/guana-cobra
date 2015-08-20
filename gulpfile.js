var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var del = require('del');
var vinylPaths = require('vinyl-paths');


gulp.task('build', ['clean'], function () {
    return gulp.src(
        [
            'public/index.html',
            'public/assets/images/**/*',
            'public/assets/fonts/**/*'
        ],
        {base: 'public'})
        .pipe(plugins.if(isIndexHtml, plugins.usemin({
            //js: [plugins.ngAnnotate(), plugins.uglify(), plugins.rev()],
            js: [plugins.ngAnnotate(), plugins.rev()],
            vendorjs: [plugins.rev()],
            vendorcss: [plugins.minifyCss(), 'concat', plugins.rev()],
            css: [plugins.minifyCss(), 'concat', plugins.rev()],
            templateCache: [
                plugins.addSrc('public/partials/**/*.html'),
                plugins.angularTemplatecache({
                    module: 'myApp',
                    root: 'partials/'
                }),
                'concat',
                plugins.rev()
            ]
        })))
        .pipe(gulp.dest('www/'));

    function isIndexHtml (file) {
        return file.path.match('index\\.html$');
    }
});

gulp.task('clean', function() {
    return gulp.src('www/*')
        .pipe(vinylPaths(del));
});

