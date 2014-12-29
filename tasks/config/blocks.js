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

	gulp.task('blocks:dev', function() {
		return gulp.src(['views/blocks/**/*.jade', '!views/blocks/_blocks.jade'])
				.pipe(plugins.concat('_blocks.jade'))
				.pipe(gulp.dest('views/blocks'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'Concatenate blocks task complete' })));
	});

};

