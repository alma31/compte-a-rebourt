"use strict";
(function(){
	var app = {
		defaultTimer:null,
		timer:null,
		intervalID:null,
		minutes:null,
		secondes:null,

		init: function(){
            this.cacher();
			this.listeners();
		},
		listeners: function(){
			$("#play").on('click', this.play.bind(this));
			$("#stop").on('click', this.stop.bind(this));
			$('#reset').on('click', this.reset.bind(this));
			$('#save').on('click', this.save.bind(this));
		},
		play: function(){
			clearInterval(this.intervalID);
			this.intervalID = setInterval(this.decrement.bind(this), 1000);
			if (this.minutes == 0 && this.secondes == 0)
				clearInterval(this.intervalID);
			
		},
		save: function(){
			$("#play").show();
			$("#stop").show();
			$("#reset").show();
			var min =  parseInt($('#min').val(),10);
			var sec =  parseInt($('#sec').val(),10);
			$('#minutes').html(min);
			$('#secondes').html(sec);
			if ( isNaN(min)  ) {
				min = 0;
			}
			if ( isNaN(sec) ){
				sec = 0;
			}
			this.timer = min*60 + sec;
			this.defaultTimer = this.timer;
		},
		decrement:function(){
			this.updateView();
			this.timer--;
			this.progress();
		},
		updateView: function(){
			this.minutes = parseInt(this.timer/60, 10);
			this.secondes = parseInt(this.timer % 60);
			$("#minutes").text(this.minutes);
			$("#secondes").text(this.secondes);
			if ( this.secondes < 10) {
				$('#secondes').html("0"+this.secondes);
			}
			if ( this.minutes < 10) {
				$('#minutes').html("0"+this.minutes);
			}
			if(this.minutes == 0 && this.secondes == 10){
				$('span').css('color','red');
				$('span').css('color','red');

			}
			if(this.secondes == 0 && this.minutes == 0){
				this.video();
			}

		},
		reset: function(){
			this.save();
			this.updateView();   
		},
		stop: function(){
			clearInterval(this.intervalID);
		},
		video: function(){ 
			$('body').html($('iframe').show('#video'));	
		},
		progress: function(){
			var pourcentage = this.timer*100/this.defaultTimer;
			$('progress').val(pourcentage);  
		},

		cacher: function(){
		    $("#reset").hide();
			$('iframe').hide();
			$("#play").hide();
			$("#stop").hide();
		},
	};
	app.init();
})();