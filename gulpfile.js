'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browsersync = require("browser-sync").create();
const reload = browsersync.reload;

const paths = {
  styles: {
    scssInput: 'css/*.scss',
    cssDest: 'css/',
  },
  scripts: {
    input: [
      'js/scripts.js',
    ],
    dest: 'js/',
  },
};

function styles() {
	return gulp
	    .src(paths.styles.scssInput)
	    .pipe(sassGlob())
	    .pipe(sass(sassOptions)).on('error', sass.logError)
	    .pipe(cleanCSS())
	    .pipe(rename({
	    	suffix: '.min',
	    }))
	    .pipe(gulp.dest(paths.styles.cssDest))
	    .pipe(reload({ stream: true }));
}
exports.styles = styles;

function scripts() {
	return gulp
		.src(paths.scripts.input)
		.pipe(uglify())
	    .pipe(rename({
	        dirname: '',
	        extname: '.min.js',
	    }))
	    .pipe(gulp.dest(paths.scripts.dest))
	    .pipe(reload({ stream: true }))

}
exports.scripts = scripts;

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
};

function browserSync() {
  browsersync.init({
    proxy: "localhost",
    notify: false,
    open: false,
    snippetOptions: {
      ignorePaths: ["wp-admin/**"],
    },
  });
}

function watch() {
  gulp.watch(paths.styles.scssInput, styles).on('all', (event, path, stats) => {
    console.log(`File ${path} was ${event}, running tasks...`);
  });
  gulp.watch(paths.scripts.input, scripts).on('all', (event, path, stats) => {
    console.log(`File ${path} was ${event}, running tasks...`);
  });
}
exports.watch = watch;

const build = gulp.parallel(styles, scripts, browserSync, watch);

gulp.task('default', build);