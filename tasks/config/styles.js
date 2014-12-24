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

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

module.exports = function(gulp, plugins, growl) {

  // Compile and Automatically Prefix Stylesheets
  gulp.task('styles:dev', function () {
    return gulp.src([
      'views/global/**/*.less',
      'views/global/**/*.css',
      'views/blocks/**/*.less',
      'views/blocks/**/*.css'
    ],{ base: "views" })
      .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
      .pipe(plugins.changed('.tmp/public', {extension: '.css'}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.if('!vars.less', plugins.insert.prepend('@import "vars";')))
      .pipe(plugins.less({
        expand: true,
        ext: '.css',
        paths: ['views/global/styles']
      }))
      .pipe(plugins.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest('.tmp/public'))
      // Concatenate And Minify Styles
      .pipe(plugins.concat('production.css'))
      .pipe(plugins.if('*.css', plugins.csso()))
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest('.tmp/public'))
      .pipe(plugins.size({title: 'styles'}))
      .pipe(plugins.if(growl, plugins.notify({ message: 'less dev task complete' })));
  });
};
