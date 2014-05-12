//main app object
var App = {
	Views: {},
	Models: {}
};

//start with DOM ready event 
$(function(){	

	//shows list view 
	App.showMovieList = function(){			
			
		App.Views.MovieList.empty();

		$.each(App.Models.MovieList.collection, function(index, movie){
			var movieListItemView = new MovieListItemView({
				model: movie,
				template: $('#tmpl-listItem').html()
			});

			App.Views.MovieList.append(movieListItemView.render());

			movieListItemView.on('movie-clicked', function(item){
				var movie = item.data('itemid');
				console.log('movie-clicked', movie);
				$.route('#movie/' + movie);
			});
		});			
	};

	//shows details view
	App.showMovieDetails = function(movieId){		

		var selectedMovie = App.Models.MovieList.get(movieId);

		if(selectedMovie){
			console.log('showing ', selectedMovie);

			var movieDetailsView = new MovieDetailsView({
				model: selectedMovie,
				template: $('#tmpl-itemDetails').html()
			});

			App.Views.MovieDetails.empty().append(movieDetailsView.render());
		}		
	};	

	//binds URL hash changes event to dirveApp
	App.bindRoutes = function(){
		$.route(function(path){
			App.driveApp(path);
		});
	};

	//drives the app state as per URL hash
	// /, movies -- show list
	// #movie/{movieId} -- show details of movie
	App.driveApp = function(path){
		console.log('hash ', path);
		var hashParts = path.substring(1).split('/'); //remove the # char and split the remaining part by /
		switch(hashParts[0]){
			case "":
			case 'movies':
				//hide details and show list view																		
				App.Views.MovieDetails.hide();
				App.showMovieList();					
				App.Views.MovieList.show();
			break;			
			case 'movie':
				//hide list and show details view					
				var movie = hashParts[1];
				App.Views.MovieList.hide();
				App.showMovieDetails(movie);
				App.Views.MovieDetails.show();
			break;			
		}
	};

	// initializes the app
	App.init = function(){
		App.Views.MovieList = $.observable($('#movie-list'));
		App.Views.MovieDetails = $.observable( $('#movie-details') );
		App.Models.MovieList = new MoviesCollection();
		App.bindRoutes();			
		App.Models.MovieList.fetch(function(){	
			//once fetched the model start the app as per URL hash
			App.driveApp(window.location.hash);
		});		
	}

	//starts app
	App.init();	
});
