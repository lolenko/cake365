module.exports = function (gulp, plugins) {
	gulp.task('buildProd', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:js',
			'uglify:dist',
      'sails-linker-gulp',
			'clean:build',
			'copy:build',
			cb
		);
	});
};
