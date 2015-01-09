define(['backbone', 'js/models/task'], function (Backbone, TaskModel) {

	var Collection = Backbone.Collection.extend({			
		model: TaskModel,			
		urlRoot: location.host,
		
		initialize: function (attributes, options) {
			this.url = options.url;
			this.fetch();
		},		
		comparator: function (task) {
			return task.get('deadline');
		}
	});
	
	return Collection;
});
