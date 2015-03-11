///////////////////////////////////////////////////////////////////////////
//////////////////////////// Introduce cities /////////////////////////////
///////////////////////////////////////////////////////////////////////////	

function introduceCities() {
	
	modus = "introduceCities";
	hoverType = "city";
	rVar == "pop";
	
	//setTimeout(function() {counter = 3;}, 1000);

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Reset the progress bar
	//resetProgressBar();

	//Set the progress circles
	//setCircleProgress(2);
	
	//d3.select("#section")
	//	.style("opacity",0)
	//	.style("visibility","hidden");
	
	//Remove the two bars - if present
	startBarChart.selectAll("g")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			startBarChart.selectAll("g")
				.remove();
		});
		
	//Remove the bar chart to the right - if present
	//barChart.selectAll("g").remove();
	//barWrappingOther.selectAll("g").remove();

	//Hide the cities - if present
	cities2010.selectAll(".city_2010")
		.on("mouseover", null)
		.on("mouseout", null)
		.transition().duration(1000)
		.attr("r", 0)
		.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
		.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
	cities2000.selectAll(".city_2000")
		.on("mouseover", null)
		.on("mouseout", null)
		.transition().duration(1000)
		.attr("r", 1.5)
		.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
		.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});

	//Remove dot histogram axis
	//dotWrapper.selectAll("g").remove();
	//dotWrapper.selectAll("text").remove();

	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

	var delay = 5000;
		
	//Start the progress bar
	//runProgressBar(delay*5.25);
	
	rScale
		.domain([d3.min(data, function(d) {return d.pop_2000;}),d3.max(data, function(d) {return d.pop_2010;})])
		.range([1,20]);
		
	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.transition().duration(1000).delay(500)
		.style("stroke-opacity", 1)
		.style("fill-opacity", 1);
		
	//////////////////////////////////////////////////////
	/////////////////// Smallest cities //////////////////
	//////////////////////////////////////////////////////
	//Smallest cities
	d3.select("#explanation")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.style("top", 350 + "px")
					.style("left", 400 + "px")
					.style("width", 400 + "px")
					.html("There are 738 cities with a population between 100,000 to 1 million people");	
		})
		.transition().duration(1000)
		.style("opacity",1);
		
	//Highlight the small cities - 2000
	cities2010.selectAll(".city_2010")
		.filter(function(d) { return d.pop_2010 < 1e6;})
		.transition().duration(2000).delay(1000)
			.attr("r", function(d) {return rScale(d.pop_2010);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.5);
	
	//Highlight the small cities - 2010
	cities2000.selectAll(".city_2000")
		.filter(function(d) { return d.pop_2010 < 1e6;})
		.transition().duration(2000).delay(1000)
			.attr("r", function(d) {return rScale(d.pop_2000);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.7);

	//////////////////////////////////////////////////////
	//////////////////// Medium cities ///////////////////
	//////////////////////////////////////////////////////
	//Medium cities
	explanationText(varText = "123 cities with a population between 1 and 10 million people", delay = delay, delayStep = 1);	
		
	//Plot the sizes of the cities in 2010 in reddish
	cities2010.selectAll(".city_2010")
		.filter(function(d) { return d.pop_2010 >= 1e6 & d.pop_2010 < 10e6;})
		.transition().duration(2000).delay(1*delay)
			.attr("r", function(d) {return rScale(d.pop_2010);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.5);
	
	//On the same location plot the sizes of the cities in 2000 in greyish	
	cities2000.selectAll(".city_2000")
		.filter(function(d) { return d.pop_2010 >= 1e6 & d.pop_2010 < 10e6;})
		.transition().duration(2000).delay(1*delay)
			.attr("r", function(d) {return rScale(d.pop_2000);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.7);

	//////////////////////////////////////////////////////
	//////////////////// Large cities ////////////////////
	//////////////////////////////////////////////////////
	//Large cities
	explanationText(varText = "And 8 megacities with more than 10 million people", delay = delay, delayStep = 2);	
		
	//Plot the sizes of the cities in 2010 in reddish
	cities2010.selectAll(".city_2010")
		.filter(function(d) { return d.pop_2010 >= 10e6;})
		.transition().duration(2000).delay(2*delay)
			.attr("r", function(d) {return rScale(d.pop_2010);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.5);
	
	//On the same location plot the sizes of the cities in 2000 in greyish	
	cities2000.selectAll(".city_2000")
		.filter(function(d) { return d.pop_2010 >= 10e6;})
		.transition().duration(2000).delay(2*delay)
			.attr("r", function(d) {return rScale(d.pop_2000);})
			.style("fill-opacity", 1)
		.transition().duration(1500)
			.style("fill-opacity", 0.7);

	//////////////////////////////////////////////////////
	///////////////// Pearl River Delta //////////////////
	//////////////////////////////////////////////////////
	//Pearl River Delta
	explanationText(varText = "For example, the Pearl River Delta in China has overtaken Tokyo as the world’s largest urban area in both size and population", delay = delay, delayStep = 3);	

	cities2000.selectAll(".city_2000")
		.transition().duration(2000).delay(3*delay)
		.style("fill-opacity", function(d) {
			if(d.rank_pop == 1) {return 0.9;}
			else {return 0.05;}
		});	
	cities2010.selectAll(".city_2010")
		.transition().duration(2000).delay(3*delay)
		.style("fill-opacity", function(d) {
			if(d.rank_pop == 1) {return 0.9;}
			else {return 0.05;}
		});	
	setTimeout(function() {circleHover($.grep(data, function(d) {return d.rank_pop == 1;})[0])}, 3.25*delay);
	
	explanationText(varText = "Its population grew with more than 50% to almost 42 million people", delay = delay, delayStep = 4.25);	

	/*
	cities2000.selectAll(".city_2000")
		.transition().duration(2000).delay(5.75*delay)
		.style("fill-opacity", 0.05);	
	cities2010.selectAll(".city_2010")
		.transition().duration(2000).delay(5.75*delay)
		.style("fill-opacity", 0.05);	
	*/	
	//////////////////////////////////////////////////////
	///////////////////// Zhumadian //////////////////////
	//////////////////////////////////////////////////////
	/*//Zhumadian
	explanationText(varText = "The Zhumadian urban area, though relatively small, has seen a population growth of almost 150%", delay = delay, delayStep = 6);	

	cities2000.selectAll(".city_2000")
		.transition().duration(2000).delay(6*delay)
		.style("fill-opacity", function(d) {
			if(d.rank_pop == 320) {return 1;}
			else {return 0.025;}
		});	
	cities2010.selectAll(".city_2010")
		.transition().duration(2000).delay(6*delay)
		.style("fill-opacity", function(d) {
			if(d.rank_pop == 320) {return 1;}
			else {return 0.025;}
		});	
	setTimeout(function() {circleHover($.grep(data, function(d) {return d.rank_pop == 320;})[0])}, 6.25*delay);

	explanationText(varText = "However, the population density increased steeply, with 85% because the urban land increased much slower", delay = delay, delayStep = 7.75);		
	*/
	//////////////////////////////////////////////////////
	///////////////////// Finish it //////////////////////
	//////////////////////////////////////////////////////
	//Make text disappear
	d3.select("#explanation")
			.transition().duration(1000).delay(delay*5.25)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
					
				d3.select("#callOut").style("visibility","hidden");
			});
				

	setTimeout(totalAreaMap, delay*5.25);

}//introduceCities
