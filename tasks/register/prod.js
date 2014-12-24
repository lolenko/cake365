module.exports = function (gulp, plugins) {
	gulp.task('prod', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:js',
			'uglify:dist',
			'sails-linker-gulp:prodAssets',
			'sails-linker-gulp:prodViews',
			cb
		);
	});
};
