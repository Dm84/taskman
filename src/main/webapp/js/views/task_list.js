define(['marionette', 'js/views/task_main', 'chart'], function (Marionette, MainTaskItemView, Chart) {
	
	var TaskListView = Marionette.CollectionView.extend({
		childView: MainTaskItemView,
		emptyView: Marionette.ItemView.extend({ 
			template: _.template('<div class="loader"></div>')
		}),

		initialize: function() {
			this.listenTo(this.collection, 'change sync', this.drawChart);
		},

		drawChart: function () {
			var sectors = {
				overdue: {
					value: 0,
					color:"#e55c9a",
					highlight: "#e55c9a",
					//label: "Невыполненные"
				},
				completed: {
					value: 0,
					color: "#9ec54d",
					highlight: "#9ec54d",
					//label: "Завершенные"
				},
				today: {
					value: 0,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					//label: "На сегодня"		            	
				},		            
				todo: {
					value: 0,
					color: "#b8b8b8",
					highlight: "#b8b8b8",
					//label: "Запланированные"
				}					
			};
			
			var percent = 100.0 / this.collection.size(); 
			
			this.collection.each(function (item) {				
				sectors[item.state].value += percent; 				
			});
			
			var data = [];
			for (item in sectors) {
				data.push(sectors[item]);
			}
						
			var ctx = document.getElementById("myChart").getContext("2d");
			ctx.canvas.width = 290;
			ctx.canvas.height = 290;
			// Use Chart.js as normal here.
			
			var myDoughnutChart = new Chart(ctx).Doughnut(data, {
				maintainAspectRatio: false,
				animation: false,
				percentageInnerCutout : 70,
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
			});
			
			// Chart.noConflict restores the Chart global variable to it's previous owner
			// The function returns what was previously Chart, allowing you to reassign.
			var Chartjs = Chart.noConflict();

		},

		onRender: function () {

			if (this.collection.size() == 0) {
	
			} else {		
				this.drawChart();
			}
		}	
	});
	
	return TaskListView;
});