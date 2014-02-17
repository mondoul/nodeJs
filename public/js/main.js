require.config({
  paths: {
    'jquery': 'lib/jquery.min',
    'angular': 'lib/angular.min',
    'underscore': 'lib/underscore.min',
    'bootstrap': 'lib/bootstrap.min',
    'animate' : 'lib/angular-animate'
  },
  shim: {
    bootstrap : { 
        deps: ['jquery']
    },
    angular: {
      deps: [ 'jquery', 'bootstrap' ], 
      exports: 'angular'
    },
    underscore : {
        exports: '_'
    }
  },
  packages: [
    'controllers',
    'services',
    'directives'
  ]
});


require([
  'angular',
  'app'
], function (angular, app) {
  'use strict';
    var html = angular.element(document).find('html');
    angular.bootstrap(html, [app.name]);
});
