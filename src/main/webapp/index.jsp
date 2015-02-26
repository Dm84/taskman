<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
	<link rel="stylesheet" type="text/css" media="screen" href="css/styles.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="css/jquery-ui.css" />
	<script data-main="main" src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.15/require.js"></script>
	<title>Taskman</title>
</head>
<body>

	<script type="text/x-handlerbars-template" id="task-item-template">
		<div class="task-completed-icon">
		</div>
		{{description}}
		<div class="task-date">
			{{dateFormat deadline}}
		</div>
	</script>

	<script type="text/x-handlerbars-template" id="header-template">
		<div class="header-bar">

			<div class="search-block">
				<div class="create-task-icon"></div>
				<div class="search-input-bar">
					<input type="text" class="search-input" />
					<div class="popup popup_task_search" style="display: none">
						<div class="popup-content">
							<div class="task-list task-list_block_search"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="header-date">
			Сейчас {{dateFormat dateNow}}
		</div>

		<div class="popup popup_task_create" style="display: none">
			<div class="popup-content">
				<div class="task-create-inputs">
					<div class="task-completed-icon"></div>
					<textarea class="task-create-inputs__desc task-create-input "></textarea>
					<input type="text" class="task-create-inputs__date task-create-input" />
					<button class="btn btn-default pull-right task-create-inputs__save">Сохранить</button>
				</div>
			</div>
		</div>
	</script>

	<script type="text/x-handlerbars-template" id="search-task-template">
		{{description}}
		<div class="task-date task-date_block_search">
			{{dateFormat deadline}}
		</div>
	</script>

	<script type="text/x-handlebars-template" id="search-separator-template">
		<div class="task-item task-item_block_search">
			<div class="item-separator item-separator_block_search"></div>
		</div>
	</script>

	<div class="container">
		<div id="content" class="content">
			<div class="header" id="header"></div>
			<div id="task-list" class="task-list">
				<div class="loader"></div>
			</div>
			<div class="chart-wrap">
				<canvas id="myChart" class="chart"></canvas>
			</div>
		</div>
	</div>


</body>
</html>