//  * Ideas 

//     * Make it change color based on X 

//     * Change the circle... 

//         * Make it into a thermometer that fills up 

//         * Make it a car that leaves tracks 

//         * Make it into a bottle of sunscreen that shoots the temp out 

//         * Etc. 

//     * Change the background based on the weather code 

// * Explore the API 

//     * There is a lot more that you can do than what we covered. 

//     * http://openweathermap.org/weather-conditions 

//     * See if you can find and use other end points 

//     * See what else is the object we are already getting back and what you can do with it 

// * Make it a full-blown widget someone would want on their page! 

// * Make a modal via bootstrap or Fancybox that pops open the wind speed, etc. 

// * Go look at other widgets online and follow suit.

// * Remove balls when they are clicked on

// * When you run out of money, have the user guess the temp in Chicago for more money


$(document).ready(function(){
	$('#weather-form').submit(function(){
	// stop the form from submitting
	event.preventDefault();
	// Input field has ID of location. Go get it.
	var location = $('#location').val();
	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='+location+', us&appid='+apiKey;
	console.log(weatherUrl);

	$.getJSON(weatherUrl, function(weatherData){
		console.log(weatherData);
		var currTemp = weatherData.main.temp;
		var name = weatherData.name;
		var icon = weatherData.weather[0].icon + '.png';
		$('#currTemp').html('<img src="http://openweathermap.org/img/w/'+icon+'">The temp in ' +name+ ' is currently ' +currTemp+ '&deg; ');
		var canvas = $('#weather-canvas');
		var context = canvas[0].getContext('2d');
		

		// Set up the outer circle
		var currPercent = 0; //0 because we always start at the top to draw this circle
		function animate(current){
			//Draw inner circle
			context.fillStyle = "#ccc";
			context.beginPath();
			context.arc(155, 75, 65, Math.PI*0, Math.PI*2);//This will draw a circle starting at 155, 75
			context.closePath();
			context.fill();

			// Draw the outer line
			context.lineWidth = 10; //Make a thick outer line
			context.strokeStyle = "#129793";
				// Color code arc according to temperature
				if(currTemp <= 30){
					context.strokeStyle = "#00ffed";
				} else if((currTemp > 30) && (currTemp <= 70)){
					context.strokeStyle = "#f4b2d2";
				} else{
					context.strokeStyle = "#ff0000";
				}
			context.beginPath();
			//Line itself will be at 70. 5 will be on the inside, 5 will be on the outside.
			//Drawing a full circle. Outside arc starts at (155, 75) with a radius of 70. 5px 
			//Math.PI*1.5 becuase you start drawing at 12:00. the only thing that keeps changing is the arc being drawn
			context.arc(155, 75, 70, Math.PI*1.5,(Math.PI * 2 * current) + Math.PI*1.5);
			context.stroke();//stroke, not fill because we want a line.
			// increment current percent by 1 b/c as it draws, everytime animate draws, we get the percentage of the arc drawn so the arc inches forward each time currPercent is incremented. entire circle is 100%. If our temperature is over 100deg, the entire circle will be drawn
			currPercent++;
			// increment only if the currPercent is less than currTemp to draw more of arc to match current temp
			if(currPercent < currTemp){
				requestAnimationFrame(function(){
					animate(currPercent / 100);
				});
			}
		}
		animate();
		
	});
	})
});
