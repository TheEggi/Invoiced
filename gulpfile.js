/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync');

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
    server: {
      baseDir: 'app',
      routes: {
        "/bower_components": "bower_components",
        "/elements": 'elements',
        '/src': 'src',
      },

        // bundler should be the same as above
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'app/**/*.css',
      'app/**/*.html',
      'app/**/*.js',
      'elements/**/*.html',
      'elements/**/*.css',
      'elements/**/*.js'
    ]
});
