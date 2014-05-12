//observable view that displays movie details
var MovieDetailsView = function(conf) {
	//make it observable
	var self = $.observable(this);	

	//clone the conf into self.options
	self.options = $.extend({}, conf);	

	//Backbone style element of the view
	self.$el = $('<div></div>');

	//renders template with given model
	self.render = function(){
		self.$el.html( $.render(self.options.template, self.options.model) );		
		return self.$el;
	};			
};