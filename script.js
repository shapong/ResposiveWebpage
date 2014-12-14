var countDown = function(end,elements,callback) {
		
	var	timeLeft = end.split(":"),
		daysLeft = parseInt(timeLeft[0]),
		hoursLeft = parseInt(timeLeft[1]),
		minsLeft = parseInt(timeLeft[2]),
		secondsLeft = parseInt(timeLeft[3]),
		timer,

		calculate = function() {

			/*console.log(daysLeft);
			console.log(hoursLeft);
			console.log(minsLeft);
			console.log(secondsLeft);*/
				
			var data; //that stores the time left..
			
			if(daysLeft ===0 && hoursLeft===0 && minsLeft ===0 && secondsLeft===0) {
				// For the last 1 sec to change to 00.....
				data = {
					'days': daysLeft,
					'hours': hoursLeft,
					'mins': minsLeft,
					'seconds' : secondsLeft
				}

				if(elements.length) {
					for(x in elements) {
						var x = elements[x];
						data[x] = ("00" + data[x]).slice(-2);
						document.getElementById(x).innerHTML = data[x];
					}
				}
				////////////////////////////////////////////////

				clearInterval(timer);
				if(typeof callback === "function") {
					callback();
				}
			/// More time left to go.....
			} else {
				if(!timer) {
					timer = setInterval(calculate, 1000);
				}

				data = {
					'days': daysLeft,
					'hours': hoursLeft,
					'mins': minsLeft,
					'seconds' : secondsLeft
				}

				if(elements.length) {
					for(x in elements) {
						var x = elements[x];
						data[x] = ("00" + data[x]).slice(-2);
						document.getElementById(x).innerHTML = data[x];
					}
				}

			}

			if(daysLeft >=1 && hoursLeft === 0  && minsLeft===0 && secondsLeft ===0) {
				daysLeft--;
				hoursLeft = 23;
				minsLeft = 59;
			}

			else if(hoursLeft >= 1 && minsLeft === 0 && secondsLeft===0) {
				hoursLeft--;
				minsLeft = 59;
			}

			else if(minsLeft >= 1 && secondsLeft ===0) {
				minsLeft--;
			}

			if(secondsLeft ===0) {
				secondsLeft = 59;
			} else {
				secondsLeft--;
			}

		};

		calculate();
};


var initiateLaunch = function() {

	var imgObj = null;
	function init(){
	   imgObj = document.getElementById('rocket');
	   imgObj.style.position= 'relative'; 
	   imgObj.style.left = '0px';
	   imgObj.style.bottom = '0px';
	}
	init();

	var done,onScreen;
	function launchRocket(){
		onScreen = $(imgObj).isOnScreen();
		console.log(onScreen);
		imgObj.style.left = parseInt(imgObj.style.left) + 1 + 'px';
		imgObj.style.bottom = parseInt(imgObj.style.bottom) + 1 + 'px';
		if(!onScreen) {
			clearInterval(done);
			setTimeout(init,100);
			return;
		} else {
			if(!done) {
				done = setInterval(launchRocket,10);
			}
		}
	}

	launchRocket();
};
//window.onload =init;

$.fn.isOnScreen = function(){
	
	var win = $(window);
	
	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();
	
	var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
	
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	
};