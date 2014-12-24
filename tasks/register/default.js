module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			'compileAssets',
			['images'],
			['watch:api', 'watch:assets'],
			cb
		);
	});
};
