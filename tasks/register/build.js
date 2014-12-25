module.exports = function (gulp, plugins) {
	gulp.task('build', function (cb) {
		plugins.sequence(
			'compileAssets',
      'sails-linker-gulp',
			'clean:build',
			'copy:build',
			cb
		);
	});
};
