
angular.module('harmonia.services',[])
.factory('Review', [ '$resource',
    function($resource){
        return $resource('http://localhost:8081/midgard/review/:id', {id: '@id'})//$resource('/midgard/harmonia/reviews/:id', {id: '@id'});
}])
.service('Services', [ '$http',
	function($http){
		var reviews = [];
		var currentReview={};
		var author = {};

         $http.get('/midgard/harmonia/reviews').then(function(resp) { 
                reviews=resp.data;

                console.log(resp.data);
            });
//' http://localhost:8081/midgard/review/1/summary'
        
    	this.getReviews = function(callback){
            callback(reviews);
            //return reviews;

        }
// 'http://localhost:8081/midgard/review/1/summary'
        this.getAuthor = function(callback){
            $http.get('/midgard/harmonia/author').then(function(resp){
                author = resp.data; 
                callback(resp.data);  
                return author;
            });
            
        }

        this.getOneReview = function(id, callback){

       $http.get('/midgard/harmonia/reviews').then(function(resp) { 

                reviews=resp.data;
                currentReview=reviews[id];
                console.log("id:" + id + " review: " + currentReview);
                callback(currentReview);
                return currentReview;
                //console.log(resp.data);

            });

            //currentReview=reviews[id];
            //callback(currentReview);
            /*
                 $http.get('reviews/reviews.json').then(function(resp) {
                    callback(resp.data[id]);
                    currentReview=resp.data[id];
                });
            */
            //return currentReview;
        }


    	this.addReview = function(review){
            console.log("**add Review: " + review);
    		review.id = reviews.length;
    		reviews.push(review);
    		/*$http.post('/midgard/harmonia/reviews', reviews).success(function(data){
    			console.log(data);
    		});*/
    	}



}]);