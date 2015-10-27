/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

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
        webpackHotMiddleware(bundler)
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'app/**/*.css',
      'app/**/*.html',
      'app/**/*.js'
      'elements/**/*.html',
      'elements/**/*.css',
      'elements/**/*.js'
    ]
});