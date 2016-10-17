(function(){
	app = {
		timer:10,
		intervalID:null,
		init: function(){
			app.listeners();
		},
		listeners: function(){
			$(".play").on('click', app.play);
			$(".stop").on('click', app.stop);
			$('.reset').on('click', app.reset);
		},
		play: function(){
			app.intervalID = setInterval(app.decrement, 1000);
		},
		decrement:function(){
			app.timer--;
			app.updateView();
			if(app.timer===0){
				clearInterval(app.intervalID);
			}
		},
		updateView: function(){
			var minutes = parseInt(app.timer/60, 10);
			var secondes = app.timer % 60;
			$("#minutes").text(minutes);
			$("#secondes").text(secondes);
		},
		reset: function(){
			app.timer = 10;
		},
		stop: function(){
			clearInterval(app.intervalID);
		},
	};
	app.init();
})();