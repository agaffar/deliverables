// Karma configuration
// Generated on Fri Mar 31 2017 16:15:04 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/components/version/version.js',
      'app/components/version/version-directive.js',
      'app/components/version/interpolate-filter.js',
      'node_modules/ng-table/bundles/ng-table.min.js',
      'app/modules/app.module.js',
      'app/modules/app.config.js',
      'app/modules/app.resources.js',
      'app/modules/home/home.module.js',
      'app/modules/home/home.controller.js',
      'app/modules/home/home.factory.js',
      'app/modules/home/result-table.component.js',
      'app/modules/home/search-form.component.js',
      'app/services/users/users.spec.js',
      'app/partials/*.html'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      /*'**!/!*.js': ['sourcemap'],*/
    /*  'app/modules/!**!/!(radial-polar-area-chart).js': ['coverage'],
      'app/partials/!**!/!*.html': ['ng-html2js'],
      '**!/!*.json'   : ['json_fixtures']*/
    },

    jsonFixturesPreprocessor: {
      variableName: 'jsonFixtures'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    reporters : ['spec','dots', 'karma-remap-istanbul', 'junit','coverage'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-remap-istanbul',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-fixture',
      'karma-json-fixtures-preprocessor'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    /*remapIstanbulReporter: {
      reports: {
        html: 'coverage/cover',
        lcovonly: './coverage/cover/coverage.lcov',
        cobertura: './coverage/cover/cobertura.xml'
      }
    },
    check: {
      global: {
        statements: 90,
        branches: 90,
        functions: 100,
        lines: 90
      },
      each: {
        statements: 90,
        branches: 90,
        functions: 100,
        lines: 90
      }
    },

    coverageReporter:{
      type : 'html',
      dir : 'coverage/',
      file : 'index.html'
    },

    // add the plugin settings
    ngHtml2JsPreprocessor: {
      stripPrefix: ''
    },*/
    browserNoActivityTimeout: 1000000

  });
};
