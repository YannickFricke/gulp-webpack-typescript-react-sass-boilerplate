var gulp = require('gulp');
var del  = require('del');
var fs   = require('fs');

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

gulp.task('compile-ts', function(cb)
{
	console.log(config.developmentMode);

	$.pump([
			gulp.src('./src/ts/index.tsx'),
			$.webpack(config.webpack),
			$.if('*.js', $.if(!config.developmentMode, $.uglify())),
			$.if(!config.developmentMode, $.ignore('bundle.js.map')),
			gulp.dest($.if(!config.developmentMode, config.distDir, config.assetDir) + 'js')
		], cb)
});

gulp.task('ts-reload', ['compile-ts'], function(callback)
{
	$.browserSync.reload();
	callback();
});

gulp.task('bundle-sass', function()
{
	return gulp.src(config.globs.sass)
				.pipe($.sourcemap.init())
				.pipe($.sass().on('error', $.sass.logError))
				.pipe($.autoPrefixer(config.autoprefixer))
				.pipe($.if(!config.developmentMode, $.cssmin()))
				.pipe($.concat('bundle.css'))
				.pipe($.sourcemap.write('.'))
				.pipe($.if(!config.developmentMode, $.ignore('bundle.css.map')))
				.pipe(gulp.dest($.if(!config.developmentMode, config.distDir, config.assetDir) + 'css'))
				.pipe($.browserSync.stream({match: '**/*.css'}));
});

gulp.task('copy-images', function()
{
	del(config.assetDir + 'img/**/*');
	return gulp.src(
		[
			config.globs.images,
			'!src/images/.gitkeep'
		]).pipe(gulp.dest($.if(!config.developmentMode, config.distDir, config.assetDir) + 'img/'));
});

gulp.task('dev', ['compile-ts', 'bundle-sass', 'copy-images'], function()
{
	$.browserSync.init({
		server: {
			baseDir: './public/',
			middleware: function(req, res, next) {
				var fileName = req.url.split("?")[0];
                var fileExists = fs.existsSync(__dirname + "/public" + fileName);
                if (!fileExists && req.url.indexOf("browser-sync-client") < 0)
                {
                    req.url = "/index.html";
                }
            	return next();
            }
		}
	});

	gulp.watch(config.globs.sass, ['bundle-sass']);
	gulp.watch(config.globs.ts, ['ts-reload']);
	gulp.watch(config.globs.images, ['copy-images']);
	gulp.watch(config.globs.html).on('change', $.browserSync.reload);
});

gulp.task('release', ['bundle-sass', 'compile-ts', 'copy-images']);