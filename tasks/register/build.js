module.exports = function (gulp, plugins) {
	gulp.task('build', function (cb) {
		plugins.sequence(
			'compileAssets',
			'clean:build',
			'copy:build',
			cb
		);
	});
};
