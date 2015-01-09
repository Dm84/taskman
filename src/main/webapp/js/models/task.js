define(['underscore', 'backbone'], function (_, Backbone) {
	
	var Model = Backbone.Model.extend({			

		state: 'todo',

		defaults: {
			description: '',
			deadline: (new Date()).getTime(),
			completed: false,
		},	

		validate: function (attrs) {

			var errors = [];

			if (typeof attrs.deadline !== 'number' || attrs.deadline < (new Date()).getTime()) {
				errors.push('deadline');
			}

			if (typeof attrs.description !== 'string' || attrs.description.length === 0) {
				errors.push('description');
			}

			if (errors.length) return errors;
		},
		
		initialize: function (attributes, options) {
			this.updateState();
			this.on('change', function () { this.updateState(); });
		},

		updateState: function () {
			var now = new Date(), nowMs = now.getTime(), 
			deadlineMs = this.get('deadline'), 
			deadlineDate = new Date(deadlineMs),
			overdue = nowMs - deadlineMs;		

			if (this.get('completed') === true) {
				this.state = 'completed';
			} else {
				if (overdue > 0) {
					this.state = 'overdue';										
				} else {
					var dayPeriodMs = 24 * 60 * 60 * 1000;
					if (-overdue < dayPeriodMs) {
						this.state = 'today';
					} else {
						this.state = 'todo';
					}
				}
			}
		},

		complete: function () {
			this.sync(null, this, { 
				url: this.url() + '/complete', 
				type: 'post',
				success: _.bind(this.set, this, {completed: true})
			});			
		}
	});
	
	return Model;
});