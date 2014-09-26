module.exports = function(config){
    config.set({
    basePath : '../',

    files : [  
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'app/lib/codeMirror/ui-codemirror.js',
      'app/lib/codeMirror/ui-codemirror.js',
      'app/lib/angular-ui/*.js',

      'test/lib/angular/angular-mocks.js',    
      'app/js/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
       'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],
    preprocessors: {
      'app/partials/*.html': 'html2js'
    },
 
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
