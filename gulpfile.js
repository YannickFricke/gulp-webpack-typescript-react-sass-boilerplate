const gulp = require('gulp');
const del = require('del');
const fs   = require('fs');

/**
  * Plugins
  */

const $ = {
	autoPrefixer: require('gulp-autoprefixer'),
	browserSync: require('browser-sync').create(),
	concat: require('gulp-concat'),
	cssmin: require('gulp-cssmin'),
	if: require('gulp-if'),
	ignore: require('gulp-ignore'),
	pump: require('pump'),
	sass: require('gulp-sass'),
	sourcemap: require('gulp-sourcemaps'),
	uglify: require('gulp-uglify'),
	webpack: require('webpack-stream')
};

/**
  * Config
  */

const config = {
	assetDir: 'public/assets/',
	autoprefixer: {
		browsers: ['last 2 versions'],
		cascade: false
	},
	developmentMode: process.env.NODE_ENV === "development",
	distDir: 'dist/',
	globs: {
		html: 'public/**/*.html',
		images: 'src/images/**/*',
		sass: 'src/sass/**/*',
		ts: 'src/ts/**/*'
	},
	webpack: require('./webpack.config.js')
};

/**
  * Tasks
  */

gulp.task('compile-ts:dev', function(cb)
{
	$.pump([
			gulp.src('./src/ts/index.tsx'),
			$.webpack(config.webpack),
			gulp.dest(config.assetDir + 'js')
		], cb)
});

gulp.task('compile-ts:release', function(cb)
{
	$.pump([
			gulp.src('./src/ts/index.tsx'),
			$.webpack(config.webpack),
			$.if('*.js', $.uglify().on('error', function(error)
				{
					console.log(error);
				})),
			$.ignore('bundle.js.map'),
			gulp.dest(config.distDir + 'js')
		], cb)
});

gulp.task('ts-reload', ['compile-ts:dev'], function(callback)
{
	$.browserSync.reload();
	callback();
});

gulp.task('bundle-sass:dev', function(cb)
{
	$.pump([
			gulp.src(config.globs.sass),
			$.sourcemap.init(),
			$.sass().on('error', $.sass.logError),
			$.autoPrefixer(config.autoprefixer),
			$.concat('bundle.css'),
			$.sourcemap.write('.'),
			gulp.dest(config.assetDir + 'css'),
			$.browserSync.stream({match: '**/*.css'})
		], cb);
});

gulp.task('bundle-sass:release', function(cb)
{
	$.pump([
			gulp.src(config.globs.sass),
			$.sass().on('error', $.sass.logError),
			$.autoPrefixer(config.autoprefixer),
			$.cssmin(),
			$.concat('bundle.css'),
			gulp.dest(config.distDir + 'css'),
		], cb);
});

gulp.task('copy-images:dev', function()
{
	del(config.assetDir + 'img/**/*');
	return gulp.src(
		[
			config.globs.images,
			'!src/images/.gitkeep'
		]).pipe(gulp.dest(config.assetDir + 'img/'));
});

gulp.task('copy-images:release', function()
{
	del(config.distDir + 'img/**/*');
	return gulp.src(
		[
			config.globs.images,
			'!src/images/.gitkeep'
		]).pipe(gulp.dest(config.distDir + 'img/'));
});

gulp.task('dev', ['compile-ts:dev', 'bundle-sass:dev', 'copy-images:dev'], function()
{
	$.browserSync.init({
		server: {
			baseDir: './public/',
			middleware: function(req, res, next) {
				let fileName = req.url.split("?")[0];
                let fileExists = fs.existsSync(__dirname + "/public" + fileName);
                if (!fileExists && req.url.indexOf("browser-sync-client") < 0)
                {
                    req.url = "/index.html";
                }
            	return next();
            }
		}
	});

	gulp.watch(config.globs.sass, ['bundle-sass:dev']);
	gulp.watch(config.globs.ts, ['ts-reload']);
	gulp.watch(config.globs.images, ['copy-images:dev']);
	gulp.watch(config.globs.html).on('change', $.browserSync.reload);
});

gulp.task('release', ['bundle-sass:release', 'compile-ts:release', 'copy-images:release']);