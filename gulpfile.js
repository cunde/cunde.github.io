var gulp = require('gulp');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var paths = {
  scripts: 'input/**/*.js',
  images: 'client/img/**/*',
  sass: './sass/**/*.scss',
  mdarticle: './article/*.md',
  mdangular: './angular/md/*.md'
};


gulp.task('mdangular', function () {
	 gulp.src('./angular/md/*.md')
		.pipe(markdown())
		.pipe(gulp.dest('./angular/note/'));
});
gulp.task('mdarticle', function () {
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
  gulp.watch(paths.mdarticle, ['mdarticle']);
  gulp.watch(paths.mdangular, ['mdangular']);
  gulp.watch('js', bundle);
});
gulp.task('default',['watch','mdarticle','mdangular']);
// gulp.task('scripts', function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
//       .pipe(uglify())
//     //   .pipe(concat('all.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'));
// });


var gulp = require('gulp');
var customOpts = {
  entries: ['input/test.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

 // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
bundle();
function bundle() {
    console.log(b._options.entries);
  b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}


// gulp.task('default', ['watch', 'scripts', 'sass','markdownd']);
