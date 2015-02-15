/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 *
 */
module.exports = function(gulp, plugins, growl) {

	gulp.task('jsx:dev', function() {
		return gulp.src(['views/**/*.jsx'])
				.pipe(plugins.jsx({
				ignoreDocblock: true,
				jsx: 'jopa'
			}))
				.pipe(gulp.dest('.tmp/public'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'Transpile JSX task complete' })));
	});

};

