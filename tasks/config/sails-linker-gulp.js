/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files. Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see (the original):
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(gulp, plugins, growl) {

    // Insert JS, CSS and template dev links into HTML and EJS files in the views folder
    gulp.task('sails-linker-gulp', function() {
        // Read templates
        return gulp.src(['views/**/*.jade'])
            // Link the styles
            .pipe(plugins.linker({
                scripts: ['.tmp/public/global/**/*.css', '.tmp/public/blocks/**/*.css', '!.tmp/public/production/**/*.css'],
                startTag: '// STYLES-DEBUG',
                endTag: '// STYLES-DEBUG END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public'
            }))
            .pipe(plugins.linker({
                scripts: ['.tmp/public/production/**/*.css'],
                startTag: '// STYLES-PRODUCTION',
                endTag: '// STYLES-PRODUCTION END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public'
            }))
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-linker-gulp complete' })));
    });

};
