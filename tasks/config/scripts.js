/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 */

module.exports = function(gulp, plugins, growl) {

  gulp.task('scripts:dev', function () {
    return gulp.src([
      'views/global/**/*.js',
      'views/blocks/**/*.js'
    ],{ base: "views" })
      .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
      //.pipe(plugins.jshint('.jshintrc'))
      //.pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.changed('.tmp/public'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.if('!**/vendor/**/*.js', plugins['6to5']({modules: 'amd'})))
      .pipe(gulp.dest('.tmp/public'))
      .pipe(plugins.uglify(/* {mangle: true} */))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest('.tmp/public/production'))
      .pipe(plugins.size({title: 'scripts'}))
      .pipe(plugins.if(growl, plugins.notify({ message: 'scripts dev task complete' })));
  });
};
