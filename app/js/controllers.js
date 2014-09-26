/* Controllers */

angular.module('harmonia.controllers', [
  'harmonia.services',
  'ngResource',
  'ui.codemirror',
  'ui.bootstrap',
  'ui.bootstrap.accordion'
])
.controller('reviewerCtrl', ['$scope', '$stateParams', '$location', 'Review','Services', 
  function($scope, $stateParams, $location, Review, Services) {
    console.log("reviewCtrl");

    //****Code Mirror options
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        readOnly: 'nocursor',
        mode: 'javascript', 
        theme:'mbo'
    };
    //***************

    var path= $location.path().split('/');
    console.log($location.path());
    
    /*$scope.reviews = Review.get({id: 1}, function(data){
      console.log('**Midgard**: ' + data);
    });
    */
    $scope.reviewId = $stateParams.reviewId;
    $scope.peeps=[];
    
    
    $scope.getRevs = function(callback){
      Services.getReviews(callback); 
    }
    $scope.getOneRev = function(reviewId, callback){
      Services.getOneReview(reviewId, callback);
    }
     
   $scope.getOneRev($scope.reviewId, function(rev){
        $scope.currentReview = rev;
        $scope.reviewName = $scope.currentReview.name;
        if($scope.peeps.length==0){
          loadPeeps();
        }
       // console.log($scope.peeps)
    });
    
    function loadPeeps(){
      $scope.peeps.length= 0;
      $scope.peeps.push($scope.currentReview.author);
        for(key in $scope.currentReview.reviewers){
          $scope.peeps.push($scope.currentReview.reviewers[key]);
        }
    }
    /*
    Review.query(function(data){
      console.log(data);
      $scope.reviews = data;
    });
    
    Review.get({id:$stateParams.reviewId}, function(rev){
        $scope.currentReview = rev;
        $scope.reviewName = $scope.currentReview.name;
        if($scope.peeps.length==0){
          loadPeeps();
        }
       // console.log($scope.peeps)
    });
    */
 
  }])
.controller('reviewerNavCtrl', ['$scope', '$stateParams', '$location', 'Services',
  function($scope, $stateParams, $location, Services) {
    console.log("reviewNavCtrl");
    var path= $location.path().split('/');

    $scope.reviewId = $stateParams.reviewId;
    $scope.fileId = $stateParams.fileId;
    $scope.isComments = true;
    $scope.reviewName="";
    $scope.currentView = path[5];
    $scope.code= "";
    $scope.actions = [];
    $scope.getRevs(function(rev){
      $scope.reviews = rev;
      //console.log($scope.reviews);
      //console.log($scope.reviewId);
      $scope.currentReview = $scope.reviews[$scope.reviewId];
      //console.log("getRevs" + $scope.currentReview.files);
    });
    
    $scope.getOneRev($scope.reviewId, function(rev){
        $scope.currentReview = rev;
        $scope.isFiles = {};
        $scope.choosenFile = $scope.currentReview.files[$scope.fileId].name
        $scope.code=$scope.currentReview.files[$scope.fileId].code;
        $scope.reviewName = $scope.currentReview.name;
        for(var file in $scope.currentReview.files){
          //console.log(file);
          $scope.isFiles[$scope.currentReview.files[file].name]=false;
        }
        $scope.isFiles[$scope.currentReview.files[$scope.fileId].name] = true;
        //console.log($scope.currentReview);
       // console.log($scope.peeps)
    });

    $scope.switchView = function(view){
      var isComments = false;
      var isActions = false;
      var isFocus = false;
      if(view== 'comments'){
        $scope.currentView= 'comments';
        isComments=true;
      }
      if(view== 'actions'){
        $scope.currentView= 'actions';
        isActions= true;
        
      }
      if(view== 'focus'){
        $scope.currentView= 'focus';
        isFocus= true;
      }

      $scope.isComments = isComments;
      $scope.isActions = isActions;
      $scope.isFocus = isFocus;
    }
 
    $scope.switchView(path[5]);
    $scope.filesToggle = function(fileName, fileId){
      $scope.fileId= fileId;
      $scope.choosenFile = fileName;
      $scope.code=$scope.currentReview.files[$scope.fileId].code;
      for(var key in $scope.isFiles){
        //console.log(file + ", " + key);
        if(fileName == key){
           $scope.isFiles[key] = true;
        }
        else{
           $scope.isFiles[key] = false;
         }
       }
     
    };
 
  }])
  .controller('commentsCtrl', ['$scope', '$stateParams', '$http',
    function($scope, $stateParams, $http) {
      $scope.isCreate = false;

      $scope.createComment = function(){
        $scope.isCreate = !$scope.isCreate;
        $scope.authorName = '';
        $scope.newComment= '';
        $scope.startline= '';
        $scope.endline= '';
      }
      $scope.submitComment = function(){
        $scope.isCreate = false;
        $scope.currentReview.comments.push({
            id:$scope.currentReview.comments.length,
            fileId: $scope.fileId,
            reviewer: $scope.authorName,
            comment: $scope.newComment,
            startLine: $scope.startline,
            endLine: $scope.endline
          });
      }


  }])
  .controller('actionsCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    $scope.isCreate = false;

    $scope.createAction = function(){
      $scope.isCreate = !$scope.isCreate;
      $scope.authorName = '';
      $scope.newAction= '';
      $scope.startline= '';
      $scope.endline= '';
    }
    $scope.submitAction = function(){
      $scope.isCreate = false;
      $scope.currentReview.actions.push(
        { id:$scope.currentReview.actions.length,
          fileId: $scope.fileId,
          reviewer: $scope.authorName,
          action: $scope.newAction,
          startLine: $scope.startline,
          endLine: $scope.endline,
          completed: false
        });
    }
    
  }])
  .controller('focusCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    $scope.isCreate = false;

    $scope.createFocus = function(){
      $scope.isCreate = !$scope.isCreate;
      $scope.authorName = '';
      $scope.newFocus= '';
      $scope.startline= '';
      $scope.endline= '';
    }
    $scope.submitFocus = function(){
      $scope.isCreate = false;
      $scope.currentReview.foci.push(
        { id:$scope.currentReview.foci.length,
          fileId: $scope.fileId,
          reviewer: $scope.authorName,
          focus: $scope.newFocus,
          startLine: $scope.startline,
          endLine: $scope.endline,
          completed: false
        });
    }
    
  }])
.controller('indexCtrl', ['$scope', 'Services', '$stateParams', '$http',
  function($scope, Services, $stateParams, $http) {
    $scope.review = {id: 0, fileId:0};
       $scope.buttonCreate = false;
      $scope.buttonSummary = true;
      $scope.buttonReviewer = false;
      $scope.author={};
      $scope.peeps=[];
      $scope.buttonToggle = function(b){
        if(b=='create'){
          $scope.buttonCreate = true;
          $scope.buttonSummary = false;
          $scope.buttonReviewer = false;
        }
        else if(b=='summary'){
          $scope.buttonCreate = false;
          $scope.buttonSummary = true;
          $scope.buttonReviewer = false;
          }
        else{
          $scope.buttonCreate = false;
          $scope.buttonSummary = false;
          $scope.buttonReviewer = true;
        }
      };

      Services.getAuthor(function(author){
        $scope.author = author[0];
        
      });


      //$scope.images = ['/img/green.png','/img/madRed.png', '/img/blackDevil.png','/img/purpleEye.png', '/img/skull.png'];
  }])
  .controller('createCtrl', ['$scope', '$stateParams', '$http', 'Services',
  function($scope, $stateParams, $http, Services) {
    $scope.oneAtATime = true; 
    $scope.isOpenInfo = true;
    $scope.isOpenFiles = false;
    $scope.isOpenReviewers = false;
    $scope.isOpenFocus = false;
    $scope.opened = false;

    $scope.info={};
    $scope.info.newName="";
    $scope.info.deadline = "";
    $scope.reviewers = {};
    $scope.reviewers.newName = "";
    $scope.reviewers.list = [];
    $scope.reviewers.selected = 0;
    $scope.focus = {};
    $scope.focus.newFocus="";
    $scope.focus.list = [];
    $scope.focus.reviewer = 0;
    $scope.focus.selected = 0;
    $scope.reviewers.images= ['green', 'purpleEye', 'blackDevil', 'madRed', 'skull']
    $scope.$watch('info.deadline', function(){
      console.log($scope.info.deadline);
    });
    $scope.addReviewer = function(){
      if($scope.reviewers.newName){
        $scope.reviewers.list.push({
          name: $scope.reviewers.newName,
          img: "/app/img/" + $scope.reviewers.images[Math.floor(Math.random()*4)] + ".png"});
      }
      $scope.reviewers.newName = ""
    }
    $scope.setReviewer = function(index){
       $scope.reviewers.selected = index;
    }
    $scope.removeReviewer = function(){
      if($scope.reviewers.list.length >0){
        $scope.reviewers.list.splice($scope.reviewers.selected,1);   
      }
    }
    $scope.reviewerSelected= function(index){
      $scope.focus.reviewer = index;
    }
    $scope.focusSelected= function(index){
      $scope.focus.selected = index;
    }
    $scope.addFocus = function(){
      if($scope.reviewers.list.length >0){
        if($scope.focus.newFocus){
          $scope.focus.list.push({
              focus: $scope.focus.newFocus, 
              reviewer: $scope.reviewers.list[$scope.focus.reviewer].name,
              fileId:0,
              id: $scope.reviewers.list.length
          });
        }
        $scope.focus.newFocus= ""
      }
    }
    $scope.removeFocus = function(){
      if($scope.focus.list.length >0){
        $scope.focus.list.splice($scope.focus.selected,1);   
      }
    }

    $scope.submitReview = function(){
      Services.addReview({
        name: $scope.info.newName,
        deadline: $scope.info.deadline,
        status: "open",
        author: {name:"User", 
                  img:"/app/img/" + $scope.reviewers.images[Math.floor(Math.random()*4)] + ".png"
                },
        reviewers: $scope.reviewers.list,
        foci: $scope.focus.list,
        comments: [],
        actions: [],
        files: [{"id":0,
                "name": "quick.js",
                "code":"function codeReview(){\n \tconsole.log('yayaya');\n}\n\tvar char = nothing;"}]
      });
        console.log("submited review");
    }
    /********* 
    * Calender
    **********/
    $scope.today = function() {
      $scope.info.deadline=new Date();
    };
    //$scope.today();
    console.log($scope.info.deadline);
    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.info.deadline = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      'year-format': "'yy'"//,
      //'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[2];

    }])
    .controller('summaryCtrl', ['$scope', '$stateParams', '$http', 'Services',
    function($scope, $stateParams, $http, Services) {
      $scope.reviewer = {reviews: {}};
      $scope.author = {reviews: {}};
      $scope.reviewer.reviews = [];
      $scope.author.reviews = [];

      $scope.author.options = [ 
          {option: "name"},
          {option: "status"}, 
          {option: "deadline"},
          {option: "-name"},
          {option: "-status"}, 
          {option: "-deadline"}
      ];
      $scope.reviewer.options = [ 
          {option: "name"},
          {option: "status"}, 
          {option: "deadline"},
          {option: "-name"},
          {option: "-status"}, 
          {option: "-deadline"}
      ];
      $scope.author.order = $scope.author.options[0];
      $scope.reviewer.order = $scope.reviewer.options[0];

      $scope.getRevs = function(callback){
        Services.getReviews(callback); 
      }
      $scope.getRevs(function(rev){
        for(var r in rev){
          console.log(rev[r].deadline);
          rev[r].deadline = new Date(rev[r].deadline);
        }
        $scope.reviewer.reviews = rev;
        $scope.author.reviews = rev;
      });
      
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[2];

    }]);
  
/*
harmoniaControllers.controller('reviewDetailCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    $http.get('reviewer/' + $stateParams.phoneId ).success(function(data) {
      $scope.phone = data;
    });
  }]);
*/