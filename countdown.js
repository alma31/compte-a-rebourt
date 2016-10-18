"use strict";
(function(){
var app = {
	    defaultTimer:null,
		timer:null,
		intervalID:null,
		init: function(){
				this.timer = this.defaultTimer;
				this.listeners();
		},
		listeners: function(){
				$("#play").on('click', this.play.bind(this));
				$("#stop").on('click', this.stop.bind(this));
				$('#reset').on('click', this.reset.bind(this));
				$('#save').on('click', this.save.bind(this));
		},
		play: function(){
				this.stop();
				this.intervalID = setInterval(this.decrement.bind(this), 1000);
		},

        save: function(){
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
        },
		decrement:function(){
				this.timer--;
				this.updateView();
				if(this.timer <= 0){
					this.timer = 1;}
		},
		updateView: function(){
				var minutes = parseInt(this.timer/60, 10);
				var secondes = parseInt(this.timer % 60);
				$("#minutes").text(minutes);
				$("#secondes").text(secondes);
				if ( secondes < 10) {
					$('#secondes').html("0"+secondes);
				};
				if ( minutes < 10) {
					$('#minutes').html("0"+minutes);
				};
		},
		reset: function(){
			    this.init();
				this.updateView();   
		},
		stop: function(){
				clearInterval(this.intervalID);
		},
	};
app.init();
})();