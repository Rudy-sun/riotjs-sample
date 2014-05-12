//observable view that displays each item in the list 
var MovieListItemView = function(conf) {
	//make it observable
	var self = $.observable(this);	

	//extend given options if any
	self.options = $.extend({}, conf);	

	//Backbone style element of the view
	self.$el = $('<li></li>');

	//renders template with given model 
	self.render = function(){
		self.$el.html( $.render(self.options.template, self.options.model) );
		self.bindEvents();
		return self.$el;
	};		

	//binds events to DOM parts of the same view
	self.bindEvents = function(){
		self.$el.on('click', '.movie-item', function(event){
			console.log('item clicked',  $(event.currentTarget).data('itemid'));
			//triggers event to let ohers know about selection
			self.trigger('movie-clicked',  $(event.currentTarget));
		});
	};	

};