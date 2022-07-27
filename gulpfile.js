'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var uglify = composer(uglifyes, composer);

var concat = require('gulp-concat');

const src_dir = "./oslo";
const public_dir = "./public";
const development = true;

gulp.task('build', async function (cb) {
	gulp.src([
			`${src_dir}/style.scss`
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest(`${public_dir}/`));

	var x = gulp.src([
			`${src_dir}/Oslo.js`,
			`${src_dir}/core/*.js`,
			`${src_dir}/controllers/*.js`,
			`${src_dir}/classes/*.js`,
		])
	if(!development)
		x = x.pipe(development ? false : uglify())
	x.pipe(concat('oslo.min.js'))
		.pipe(gulp.dest(`${public_dir}/`));

	gulp.src([
			`${src_dir}/index.html`,
			`${src_dir}/favicon.ico`,
			`${src_dir}/views`,
			`${src_dir}/assets`,
		])
		.pipe(gulp.dest(`${public_dir}/`));
	
	[
		"views", 
		"assets"
	].forEach(folder => {
		gulp.src([
			`${src_dir}/${folder}/**`,
		])
		.pipe(gulp.dest(`${public_dir}/${folder}`))
	});
	// gulp.src([
	// 	`${src_dir}/assets/**`,
	// ])
	// .pipe(gulp.dest(`${public_dir}/assets`))
});

gulp.task('watch', function() {
    gulp.watch(['oslo/**/*.*'], gulp.series('build'));
});