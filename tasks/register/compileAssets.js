module.exports = function (gulp, plugins) {
	gulp.task('compileAssets', function(cb) {
		plugins.sequence(
			'clean:dev',
			'styles:dev',
			//'copy:dev',
			cb
		);
	});
};
