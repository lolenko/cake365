module.exports = function (gulp, plugins) {
	gulp.task('compileAssets', function(cb) {
		plugins.sequence(
			'clean:dev',
			'styles:dev',
			'scripts:dev',
      'blocks:dev',
			//'copy:dev',
			cb
		);
	});
};
