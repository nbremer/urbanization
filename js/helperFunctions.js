///////////////////////////////////////////////////////////////////////////
/////////////////////////// Helper Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////	

//Change the explanation text
function explanationText(varText, delay, delayStep) {
	d3.select("#explanation")
		.transition().duration(1000).delay(delay*delayStep)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.html(varText);	
		})
		.transition().duration(1000)
		.style("opacity",1);	
}//explanationText

/*
//Deactivate continue and back buttons
function buttonDeactivate(buttonName) {
	d3.select(buttonName)
		.style("pointer-events", "none")
		.transition().duration(400)
		.style("border-color", "#D3D3D3")
		.style("color", "#D3D3D3");	
}//buttonDeactivate

//Activate continue and back buttons
function buttonActivate(buttonName, delay) {
	d3.select(buttonName)
		.style("pointer-events", "auto")
		.transition().duration(400).delay(delay)
		.style("border-color", "#363636")
		.style("color", "#363636");		
}//buttonActivate
*/

/*Run the progress bar during an animation*/
function runProgressBar(time) {	
	
	/*Make the progress div visible*/
	d3.selectAll("#progress")
		.style("visibility", "visible");
	
	/*Linearly increase the width of the bar
	//After it is done, hide div again*/
	d3.selectAll(".prgsFront")
		.transition().duration(time).ease("linear").delay(100)
		.attr("width", prgsWidth)
		.call(endall,  function() {
			d3.selectAll("#progress")
				.style("visibility", "hidden");
			/*Reset to zero width*/
			d3.selectAll(".prgsFront")
				.attr("width", 0);
		});
		
};/*runProgressBar*/

/*Reset the progress bar*/
function resetProgressBar() {	
	
	/*Make the progress div visible*/
	d3.selectAll("#progress")
		.style("visibility", "hidden");
	
	/*Reset to zero width*/
	d3.selectAll(".prgsFront")
		.transition().duration(0)
		.attr("width", 0);
		
};/*resetProgressBar*/

//Set the progress circles white/grey
function setCircleProgress(num) {
	for (i = 0; i <= 9; i++) {
		if (i <= num) d3.select(eval('"#circle_' + i + '"')).style("background","#D3D3D3");
		if (i > num) d3.select(eval('"#circle_' + i + '"')).style("background","white");
	}//for i	
}//setCircleProgress

//Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
//Calls a function only after the total transition ends
function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////// Mouseover events //////////////////////////////
///////////////////////////////////////////////////////////////////////////	
	
var hoverType;

//Show city statistics when hovering over circle in map
function circleHover(chosen) {
	
	//Position of call out depends on view
	if (modus == "Dot") {
		d3.select("#callOut")
			.style("top", "70px")
			.style("left", "250px");
	} else {
		d3.select("#callOut")
			.style("top", "570px")
			.style("left", "30px");
	}//else
	
	//Change the numbers to reflect the hovered over city
	if (hoverType == "city") {d3.select("#callOutCity").html(chosen.city + " urban area, " + chosen.country);}
	if (hoverType == "country") {d3.select("#callOutCity").html(chosen.country);}
	d3.select("#td-pop-2000").html(numFormatTwo(chosen.pop_2000/1e6));
	d3.select("#td-land-2000").html(chosen.land_2000);
	d3.select("#td-density-2000").html(Math.round(chosen.density_2000));
	d3.select("#td-pop-2010").html(numFormatTwo(chosen.pop_2010/1e6) + ' <span style="font-size: 9px;">(' + chosen.rank_pop + ')</span>');
	d3.select("#td-land-2010").html(chosen.land_2010 + ' <span style="font-size: 9px;">(' + chosen.rank_land + ')</span>');
	d3.select("#td-density-2010").html(Math.round(chosen.density_2010) + ' <span style="font-size: 9px;">(' + chosen.rank_density + ')</span>');
	d3.select("#td-pop-perc").html(numFormatOne((chosen.pop_2010-chosen.pop_2000)/chosen.pop_2000*100) + "%");
	d3.select("#td-land-perc").html(numFormatOne((chosen.land_2010-chosen.land_2000)/chosen.land_2000*100) + "%");
	d3.select("#td-density-perc").html(numFormatOne((chosen.density_2010-chosen.density_2000)/chosen.density_2000*100) + "%");
	
	//Make the callOut visible again
	d3.select("#callOut")
		.style("visibility","visible");

}//circleHover
	
 //Revert back to default when the mouse moves away from a city
function showAll() {
	
	if (modus == "Map") {
		cities2000.selectAll(".city_2000")
			.style("fill-opacity", 0.7);
			
		cities2010.selectAll(".city_2010")
			.style("fill-opacity", 0.5);
	} else {
		cities2000.selectAll(".city_2000")
			.style("fill-opacity", 0.9);
			
		cities2010.selectAll(".city_2010")
			.style("fill-opacity", 0.9);		
		
	}//else
	
	if (modus == "Slope") {
		slopes.selectAll(".slopes")
			.style("opacity", 0.4);
			
		text2000.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) { return eval("d.rank_" + rVar) < 10;})
			.style("opacity", 0.7);
			
		text2010.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) { return eval("d.rank_" + rVar) < 10;})
			.style("opacity", 0.7);
	}//if
	
	//Remove visibility of callout in lower left corner
	if (modus == "Map" | modus == "Dot") {
		d3.select("#callOut").style("visibility","hidden");
	}//if
	
}//slopeAll	
		
 
 //Show only the circles and line for the hovered over city
 function showOne(d) {
	
	//Compare everything with the hovered over city
	var chosen = d;
	var setOpacity = 0;
	
	//Show information of city in small table in the lower left corner
	if (modus == "Map" | modus == "Dot") {
		hoverType = "city";
		circleHover(chosen);
		setOpacity = 0.1;
	}//if
			
	cities2000.selectAll(".city_2000")
		.filter(function(d) {return eval("d.rank_" + rVar) != eval("chosen.rank_" + rVar);})
		.style("fill-opacity", setOpacity);
		
	cities2010.selectAll(".city_2010")
		.filter(function(d) {return eval("d.rank_" + rVar) != eval("chosen.rank_" + rVar);})
		.style("fill-opacity", setOpacity);

	if (modus == "Slope") {		
		slopes.selectAll(".slopes")
			.style("opacity", 0)
			.filter(function(d) {return eval("d.rank_" + rVar) == eval("chosen.rank_" + rVar);})
			.style("opacity", 0.4);
			
		text2000.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) {return eval("d.rank_" + rVar) == eval("chosen.rank_" + rVar);})
			.style("opacity", 0.7);
			
		text2010.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) {return eval("d.rank_" + rVar) == eval("chosen.rank_" + rVar);})
			.style("opacity", 0.7);	
	}//if

}//showOne

//Mouseover event for the bar chart on the right
function highlight(d) {
	//Compare everything with the hovered over city
	var chosen = d,
		setOpacity = 0;

	//Show information of city in small table in the lower left corner
	if (modus == "Map" | modus == "Dot") {
		hoverType = "country";
		circleHover(chosen);
		setOpacity = (modus == "Map" ? 0.1 : 0.2);
	}//if
	
	cities2000.selectAll(".city_2000")
		.filter(function(d) {return d.country != chosen.country;})
		.style("fill-opacity", setOpacity);
		
	cities2010.selectAll(".city_2010")
		.filter(function(d) {return d.country != chosen.country;})
		.style("fill-opacity", setOpacity);
		
	if (modus == "Slope") {
		slopes.selectAll(".slopes")
			.style("opacity", 0)
			.filter(function(d) {return d.country == chosen.country;})
			.style("opacity", 0.4);
			
		text2000.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) {return d.country == chosen.country;})
			.style("opacity", 0.7);
			
		text2010.selectAll("text")
			.style("opacity", 0)
			.filter(function(d) {return d.country == chosen.country;})
			.style("opacity", 0.7);	
	};

}//highlight	
