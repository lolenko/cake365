module.exports = function (gulp, plugins) {
	gulp.task('buildProd', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:js',
			'uglify:dist',
			'linkAssetsBuildProd',
			'clean:build',
			'copy:build',
			cb
		);
	});
};
