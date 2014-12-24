module.exports = function (gulp, plugins) {
	gulp.task('prod', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:js',
			'uglify:dist',
			cb
		);
	});
};
