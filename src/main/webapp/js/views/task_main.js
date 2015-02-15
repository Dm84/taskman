define(['jquery', 'js/views/task'], function ($, TaskItemView) {
	
	var MainTaskItemView = TaskItemView.extend({
		template: '#task-item-template',
		tagName: 'div class="task-item"',
		
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
		},			
		
		onRender: function () {
			TaskItemView.prototype.onRender.call(this);
			this.$el.attr('id', 'task-' + this.model.id);				
			
			if (this.model.get('completed')) {
				this.$el.find('.task-completed-icon').
					addClass('task-completed-icon_status_true');
				this.$el.find('.task-date').removeClass('task-date_status_todo task-date_status_future task-date_status_overdue').
					addClass('task-date_status_completed');
			} else {
				this.$el.find('.task-completed-icon').addClass('task-completed-icon_status_false');
			}
		},
		
		events: {
			'click .task-completed-icon_status_false': function () {

				if (this.model.state !== 'completed') {
					this.$el.find('.task-completed-icon').addClass('task-completed-icon_status_wait');
					this.model.complete();
				}
			}
		}
	});

	return MainTaskItemView;
});