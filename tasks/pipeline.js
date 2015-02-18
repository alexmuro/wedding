/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  //'styles/white/application.css'
  '/styles/twile/fonts/stylesheet.css',
  '/bower_components/bootstrap/dist/css/bootstrap.css',
  '/bower_components/bootstrap/dist/css/bootstrap-theme.css',
  '/styles/twili/owl.carousel.css',
  '/styles/twili/owl.theme.css',
  '/styles/twili/owl.transitions.css',
  '/styles/twili/animate.css',
  '/styles/twili/lightbox.css',
  '/styles/twili/twili.css',
   // <!-- place your extra custom styles in this file -->
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  
  // Dependencies like sails.io.js, jQuery, or Angular
  // are brought in here
  //'js/dependencies/**/*.js',
  '/bower_components/jquery/dist/jquery.js',
  '/bower_components/bootstrap/dist/js/bootstrap.js',
  '/js/dependencies/jquery.easing.js',
  '/js/dependencies/jquery.backstretch.js',
  '/js/dependencies/jquery.mobile.browser.js',
  '/js/dependencies/owl.carousel.min.js',
  '/js/dependencies/lightbox/js/lightbox.min.js',
  '/js/dependencies/wow.min.js',
  '/js/dependencies/jquery.fitvids.js',
  '/js/twili/functions.js',    
  '/js/twili/theme.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  //'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
