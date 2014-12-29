module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			'compileAssets', 'blocks:dev',
			['images', 'sails-linker-gulp'],
			['watch:api', 'watch:assets'],
			cb
		);
	});
};
