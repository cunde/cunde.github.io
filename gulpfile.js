var gulp = require('gulp');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*',
  sass: './sass/**/*.scss',
  markdownd: './article/*.md'
};


gulp.task('markdownd', function () {
	 gulp.src('./article/**/*.md')
		.pipe(markdown())
		.pipe(gulp.dest('./article/blog/'));
});
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./sass/dist/css'));
});
    // md2html /article/tdoc.md > /path/to/doc.html
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.markdownd, ['markdownd']);
});


//
// // Not all tasks need to use streams
// // A gulpfile is just another node program and you can use all packages available on npm
// gulp.task('clean', function(cb) {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   del(['build'], cb);
// });
//
// gulp.task('scripts', ['clean'], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   return gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
//       .pipe(coffee())
//       .pipe(uglify())
//       .pipe(concat('all.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'));
// });
//
// // Copy all static images
// gulp.task('images', ['clean'], function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });
//
//
// // The default task (called when you run `gulp` from cli)
// gulp.task('default', ['watch', 'scripts', 'sass','markdownd']);
