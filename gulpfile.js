var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
/**
* Refreshes the page after save file
*/
browserSync.init({
     server: "dist/",
     browser: ["google chrome"]
});
/**
* converts the .scss files to css and stores,
* them in a new folder.
* also adds prefixes to certain commands, so that they,
* would work for other browsers and also for the last 2 versions.
*/
gulp.task('styles', function(done) {
	gulp.src('source/css/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(gulp.dest('dist/css'))
	browserSync.reload();
	done()
});
/**
* Runs the default gulp command.
* it watches for the changes in .scss files, index.html and .js files.
*/
gulp.task('default', function(done) {
	gulp.watch('source/css/*.scss', gulp.series('styles'))
	gulp.watch('source/index.html', gulp.series('copy-html'))
	gulp.watch('source/js/*.js', gulp.series('scripts'))
	done()
});
/**
* Creates new .js files that are converted to ES 2015.
* also those files are saved in a different folder.
*/
gulp.task('scripts', function(done) {
	gulp.src('source/js/*.js')
	.pipe(babel( {
		plugins: ['transform-runtime'],
        presets: ['env']
    }))
    /**
	* Inserts globals, so that require would be difined in main js files.
	*/
	//.pipe(browserify( {
		//insertGlobals: true
	//}))
	.pipe(gulp.dest('dist/js'))
	browserSync.reload();
	done()
});
/**
* Copies the index.html file to a dist folder on save.
*/
gulp.task('copy-html', function(done) {
	gulp.src('source/index.html')
	.pipe(gulp.dest('dist'))
	browserSync.reload();
	done()
});

