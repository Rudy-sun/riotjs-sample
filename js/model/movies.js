
var MoviesCollection = function(conf) {
	//make it observable 
	var self = $.observable(this);

	//collection array to hold models
	self.collection = [];

	//fetches model over AJAX and calls back callback when done
	self.fetch = function(callback){		
		if(conf){
			self.populate(conf);			
			if(callback){ callback(); }
		}else{
			$.getJSON('js/model/movies.json', function(data){
				self.populate(data);
				if(callback){ callback(); }
			});
		}		
	};	


	//helper fn to make each movie object observable and fill into collection
	self.populate = function(movies){
		self.collection = [];
		$.each(movies, function(index, movie){
			self.collection.push($.observable(movie));
		});
		self.trigger('populated');
	};

	//returns matched movie item based on id
	self.get = function(movieId){
		var selectedMovie = null;
		$.each(self.collection, function(index, movie){
			if(movie.id == movieId){				
				selectedMovie = movie;				
			}
		});
		return selectedMovie;
	};	
};