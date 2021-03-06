define(	['jquery', 'marionette', 'js/views/task_search'], 
		function ($, Marionette, SearchTaskItemView) 
{	
	var HeaderView = Marionette.CompositeView.extend({
		template: '#header-template',
		childView: SearchTaskItemView,
		childViewContainer: ".task-list_block_search",
		currentQuery: '',
		
		initialize: function(options) {
			if (typeof options.mainCollection !== 'undefined') {
				this.mainCollection = options.mainCollection;
			}
		},
		onRender: function () {				
			this.ui.date_input.datepicker({
				dateFormat: "dd.mm.yy 12:00"
			});
		},
		
		childViewOptions: function (model, index) {
			return { hasSeparator: index !== (this.collection.length - 1), span: this.currentQuery };
		},
		
		ui: {
			entry: '.search-input',
			popup_search: '.popup_task_search',
			popup_create: '.popup_task_create',
			button_add_task: '.create-task-icon',
			desc_input: '.task-create-inputs__desc',
			date_input: '.task-create-inputs__date',
			save_input: '.task-create-inputs__save',
			completed_icon: '.task-completed-icon',
		},
		
		ui_class: {
			completed_checked: 'task-completed-icon_status_true',
			btn_danger: 'btn-danger'
		},
		
		events: {
			"keyup @ui.entry": function (e) {
				
				var query = $(e.target).val();
				this.currentQuery = query;
				
//					this.collection.fetch({
//						url: this.collection.url + '?query=' + 
//					});
				
				var filtered = this.mainCollection.filter(function (item) {
					return query != '' && item.get('description').match(new RegExp(query, 'i'));
				});					
				
				this.collection.reset();
				this.collection.set(filtered);
				
				if (this.collection.size() > 0) { 
					this.ui.popup_search.fadeIn(); }
				else {
					this.ui.popup_search.fadeOut();	
				}
			},
			"blur @ui.entry": function (e) {
				this.ui.popup_search.fadeOut();
			},
			"click @ui.button_add_task": function (e) {
				this.popup_toggle();
			},
			"focus @ui.desc_input, @ui.date_input": function (e) {
				this.ui.save_input.removeClass(this.ui_class.btn_danger);					
			},
			"click @ui.completed_icon": function (e) {
				this.ui.completed_icon.toggleClass(this.ui_class.completed_checked);
			},				
			"click @ui.save_input": function (e) {					
				try {
					var dateVal = this.ui.date_input.val();
					
					var	dateAndTime = dateVal.split(' '),
						date = dateAndTime[0].split('.'), 
						time = dateAndTime[1].split(':');						
						day = parseInt(date[0], 10), 
						month = parseInt(date[1], 10) - 1, 
						year = parseInt(date[2], 10),
						hours = parseInt(time[0], 10), 
						minutes = parseInt(time[1], 10),
						deadline = new Date(year, month, day, hours, minutes, 0, 0);
					
					this.mainCollection.create({
						description: this.ui.desc_input.val(),
						deadline: deadline.getTime(),
						completed: this.ui.completed_icon.hasClass(this.ui_class.completed_checked)
					}, {
						wait: true, 
						error: _.bind(this.bad_create, this), 
						success: _.bind(this.popup_toggle, this)
					});																						
				} catch (exception) {
					this.bad_create();
				}
				
			}				
		},
		
		popup_toggle: function () {
			this.ui.popup_create.toggle(500);
		},
		
		bad_create: function (model, response) {
			this.ui.save_input.addClass(this.ui_class.btn_danger);
		}
	});
	
	return HeaderView;
});