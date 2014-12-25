module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			'compileAssets',
			['images', 'sails-linker-gulp'],
			['watch:api', 'watch:assets'],
			cb
		);
	});
};
