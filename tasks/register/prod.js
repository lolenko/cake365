module.exports = function (gulp, plugins) {
	gulp.task('prod', function(cb) {
		plugins.sequence(
			'compileAssets',
      'sails-linker-gulp',
			cb
		);
	});
};
