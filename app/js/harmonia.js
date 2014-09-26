/* App Module */

angular.module('harmonia', [
  'ngRoute', 
  'ngAnimate',
  'ngResource',
  'harmonia.controllers',
  'harmonia.services',
  'ui.router',
  'ui.bootstrap',
  'ui.codemirror',
  'harmonia.filters',
  'harmonia.directives'
])
.value('codemirror',{
        mode: 'javascript', 
        lineWrapping : true,
        lineNumbers: true,
        readOnly: 'nocursor',
        matchBrackets: true,
        theme:'mbo'
})
.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/summary');

  $stateProvider
    .state('summary', {
      url: '/summary',
      templateUrl: './partials/summary.html',
      controller: 'summaryCtrl'
    })
    .state('create', {
      url: '/create',
      templateUrl: './partials/create.html',
      controller: 'createCtrl'
    })
    .state('reviewer', {
      url: '/reviewer/:reviewId',
      templateUrl: './partials/reviewer.html',
      controller: 'reviewerCtrl'
    })
    .state('reviewer.nav', {
      url: '/nav/:fileId',
      templateUrl: './partials/reviewer.nav.html',
      controller: 'reviewerNavCtrl'
    })
    .state('reviewer.nav.comments', {
      url: '/comments',
      templateUrl: './partials/reviewer.nav.comments.html',
      controller: 'commentsCtrl'
    })
    .state('reviewer.nav.actions', {
      url: '/actions',
      templateUrl: './partials/reviewer.nav.actions.html',
      controller: 'actionsCtrl'
    })
    .state('reviewer.nav.focus', {
      url: '/focus',
      templateUrl: './partials/reviewer.nav.focus.html',
      controller: 'focusCtrl'
    })

}]);

/*
harmoniaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/summary', {
        templateUrl: '/partials/summary.html',
        controller: 'summaryCtrl'
      }).
      when('/reviewer/comments/:reviewId/:fileId', {
        controller: 'reviewerCtrl',
        templateUrl: '/partials/reviewer.html',
        action: 'comments'
      }).
      when('/reviewer/actions/:reviewId/:fileId', {
          templateUrl: '/partials/reviewer.html',
          controller: 'reviewerCtrl',
          action: 'actions'
      }).
      when('/reviewer/focus/:reviewId/:fileId', {
        templateUrl: '/partials/reviewer.html',
        controller: 'reviewerCtrl',
        action: 'focus'
      }).
      when('/create', {
        templateUrl: '/partials/create.html',
        controller: 'createCtrl'
      }).
      otherwise({
        redirectTo: '/summary'
      });
  }]);

*/