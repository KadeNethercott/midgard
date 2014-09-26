'use strict';

/* jasmine specs for controllers go here */

describe('reviewerCtrl', function(){
  var $scope, mockBackend, createReviewCtrl, createReviewNavCtrl, stateparams, body;
    
  beforeEach(module('harmonia.controllers'));
  //beforeEach(module('harmonia.services'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    mockBackend = _$httpBackend_;
    $controller = $controller;
    $scope = $rootScope.$new();
    stateparams = {reviewId: 0, fileId: 0};
    body = [{  "id": 0,
                "name": 'projectUno', 
                "author": {"name":"Jimbo", "img":"/app/img/green.png"},
                "reviewers": [{   "name": "Rogers","img":"/app/img/madRed.png"
                                },
                                {"name": "Patrice","img":"/app/img/blackDevil.png"},
                                {"name": "Burris","img":"/app/img/purpleEye.png"},
                                {"name": "Kyle","img":"/app/img/skull.png"}
                              ],
                "files": [{"id":0,"name": "henderit.js","code":"function codeReview(){\n \tconsole.log('yayaya');\n}\n\tvar char = nothing;"},
                          {"id":1,"name":  "qui.json","code":"{\n\t'id': 0,\n\t'name': 'projectUno',\n\t'author':\n\t\t {\n\t\t\t'name':'Jimbo',\n\t\t\t'img':'/img/green.png'\n\t\t},\n\t'created': '2004-11-06T16:06:42 +06:00'\n}"}
                        ]
              }];
    createReviewCtrl = function(){
      return $controller('reviewerCtrl', {$scope: $scope, $stateParams: stateparams});
    }
    createReviewNavCtrl = function(){
      return $controller('reviewerNavCtrl', {$scope: $scope, $stateParams: stateparams});
    }
    
  }));

  it('should list the number of people assigned to the review', inject(function() {
    var ctrl =  createReviewCtrl();
    mockBackend.expectGET('/midgard/harmonia/reviews').respond(body);
    mockBackend.expectGET('/midgard/harmonia/reviews').respond(body);
    mockBackend.flush();
    expect($scope.peeps.length).toBe(5);
    expect($scope.currentReview.id).toBe(body[0].id);
    expect($scope.reviewName).toBe('projectUno');
  }));

  it('should list the number of people assigned to the review', inject(function() {
    var ctrl =  createReviewCtrl();
    var revNavCtrl =  createReviewNavCtrl();
    mockBackend.expectGET('/midgard/harmonia/reviews').respond(body);
    mockBackend.expectGET('/midgard/harmonia/reviews').respond(body);
    mockBackend.expectGET('/midgard/harmonia/reviews').respond(body);
    mockBackend.flush();
    expect($scope.peeps.length).toBe(5);
    expect($scope.currentReview.id).toBe(body[0].id);
    expect($scope.reviewName).toBe('projectUno');
  }));
});

/*
describe('reviewerNavCtrl', function(){
  var $scope;
  var $httpBackend;

  beforeEach(module('harmonia.controllers'));
  beforeEach(module('harmonia.services'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $controller('reviewerNavCtrl', {$scope: $scope, $route: { current: {} }, $routeParams: {plugin: "foo" } });
  }));

  it('should request the page for the plugin', inject(function() {
    var body = "<h1>Header</h1>";
    $httpBackend.expectGET('/partials/foo.html').respond(body);
    $httpBackend.flush();
    expect($scope.rawHtml[0].innerHTML).toBe('Header');
  }));
});
*/

