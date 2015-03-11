///////////////////////////////////////////////////////////////////////////
///////////////////////////// First Bar Chart /////////////////////////////
///////////////////////////////////////////////////////////////////////////	

function startBar() {
	
	modus = "startBar";
	rVar == "pop";
	setTimeout(function() {counter = 2;}, 1000);
	
	//Activate the back button
	d3.select("#clickerBack").classed("activeButton",true);
	d3.select("#clickerBack").classed("inactiveButton",false);
	//Change text of front button
	d3.select("#clickerFront").html("Continue");

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Reset the progress bar
	resetProgressBar();

	//Set the progress circles
	setCircleProgress(1);
	
	//Remove the intro explanation 
	d3.select("#explanationIntro")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanationIntro")
				.style("visibility","hidden");
		});
	
	//Remove all elements of startBarChart (if present)
	startBarChart.selectAll("g").remove();

	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");

	d3.select("#section")
		.style("opacity",0)
		.style("visibility","hidden");
		
	//Remove the bar chart to the right - if present
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();

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
		.attr("r", 0)
		.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
		.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});

	//Hide the buttons - if present
	d3.select(".btn-group")
		.style("visibility", "hidden");		
		
	//Remove dot histogram axis
	dotWrapper.selectAll("g").remove();
	dotWrapper.selectAll("text").remove();
	
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

	var delay = 5000;
	
	//Start the progress bar
	runProgressBar(delay*8.6);
	
	//Set the bar chart dimension and location
	var barTotalHeight = 500,
		barWidth = 35,
		loc2000bar = 25,
		loc2010bar = 100;
		
	startBarChart.attr("width", 600)
			.attr("height", barTotalHeight)
			.attr("transform","translate(100,75)");
	
	var total2000 = d3.sum(countries, function(d) {return d.pop_2000;});
	var total2010 = d3.sum(countries, function(d) {return d.pop_2010;});
	
	var yScale = d3.scale.linear()
		.range([0, barTotalHeight])
		.domain([0,d3.sum(countries, function(d) {return d.pop_2010;})])	

	var startBar2000 = startBarChart.append("g").attr("class","bar2000");
	var startBar2010 = startBarChart.append("g").attr("class","bar2010");
	
	//////////////////////////////////////////////////////
	///////////////////////// Map ////////////////////////
	//////////////////////////////////////////////////////
	
	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.transition().duration(2000)
		.style("stroke-opacity", 1)
		.style("fill-opacity", 0.6);
	
	//The number of cities
	d3.select("#explanation")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","visible")
					.style("top", 350 + "px")
					.style("left", 400 + "px")
					.style("width", 450 + "px")
					.html("Data is available on the 869 urban areas in the region with populations over 100,000 in 2010");	
		})
		.transition().duration(1000)
		.style("opacity",1);
	//Show the 869 cities small in the background
	cities2000.selectAll(".city_2000")
		.transition().duration(2000)
		.style("fill-opacity", 0.3)
		.attr("r", 1.5);

	//////////////////////////////////////////////////////
	/////////////////////// Bar 2000 /////////////////////
	//////////////////////////////////////////////////////
	//The number of people in 2000
	explanationText(varText = "The 580 million people that were already living in these cities in <span style='color: #858483;'>2000</span> grew to 780 million in <span style='color: #DA6761;'>2010</span>", delay = delay, delayStep = 1);
		
	//Create the 2000 grey bar
	startBar2000.append("rect")
		.attr("x",  loc2000bar)
		.attr("y",  barTotalHeight)
		.attr("class","city_2000")
		.attr("width", barWidth)
		.attr("height", 0)
		.transition().duration(2000).delay(delay*1)
		.attr("height", yScale(total2000))
		.attr("y",  (barTotalHeight - yScale(total2000)));
	//Append the year 2000 at the bottom
	startBar2000.append("text")
		.attr("class", "city_2000")
		.attr("x", (loc2000bar + barWidth/2))
		.attr("y", (barTotalHeight + 20))
		.attr("text-anchor", "middle")
		.style("font-size", 14)
		.text(2000)
		.style("opacity", 0)
		.transition().duration(1000).delay(delay*1)
		.style("opacity", 1);
	//Text inside the 2000 bar	
	startBar2000.append("text")
		.attr("class", "city_2000 startbar-inside")
		.attr("x", (loc2000bar + barWidth/2))
		.attr("y", (barTotalHeight - yScale(total2000) + 15))
		.style("text-anchor", "middle")
		.style("fill", "white")
		.text(numFormatSI(total2000))
		.style("opacity", 0)
		.transition().duration(1000).delay(delay*1+2000)
		.style("opacity", 1);

	//////////////////////////////////////////////////////
	/////////////////////// Bar 2010 /////////////////////
	//////////////////////////////////////////////////////

	//The number of people in 2010
	explanationText(varText = "", delay = delay, delayStep = 2);	
		
	//Create the 2010 reddish bar
	startBar2010.append("rect")
		.attr("x",  loc2010bar)
		.attr("y",  barTotalHeight)
		.attr("class","city_2010")
		.attr("width", barWidth)
		.attr("height", 0)
		.transition().duration(2000).delay(delay*1)//First grow to 2000 number
		.attr("height", yScale(total2000))
		.attr("y",  (barTotalHeight - yScale(total2000)))
		.transition().duration(1500).delay(delay*1+2500)//Then grow to 2010 number
		.attr("height", yScale(total2010))
		.attr("y",  (barTotalHeight - yScale(total2010)));
		
	//Append the year 2010 at the bottom
	startBar2010.append("text")
		.attr("class", "city_2010")
		.attr("x", (loc2010bar + barWidth/2))
		.attr("y", (barTotalHeight + 20))
		.attr("text-anchor", "middle")
		.style("font-size", 14)
		.text(2010)
		.style("opacity", 0)
		.transition().duration(1000).delay(delay*1)
		.style("opacity", 1);
	//Text inside the 2010 bar
	startBar2010.append("text")
		.attr("class", "city_2010 startbar-inside")
		.attr("x", (loc2010bar + barWidth/2))
		.attr("y", (barTotalHeight - yScale(total2010) + 15))
		.style("text-anchor", "middle")
		.style("fill", "white")
		.text(numFormatSI(total2010))
		.style("opacity", 0)
		.transition().duration(1000).delay(delay*1+3000)
		.style("opacity", 1);

		
	//////////////////////////////////////////////////////
	///////////////////// Difference /////////////////////
	//////////////////////////////////////////////////////
	//Growth
	explanationText(varText = "<p>That is an increase of 34% in just 10 years, a difference of 200 million people</p> <p>This would be the world’s sixth-largest population for any single country</p>", delay = delay, delayStep = 2);	

	//Dashed vertical line
	startBar2000.append("line")
		.attr("x1", (loc2000bar + barWidth/2))
		.attr("x2", (loc2000bar + barWidth/2))
		.attr("y1", yScale(total2010-total2000))
		.attr("y2", yScale(total2010-total2000))
		.style("stroke","#AAAAAA")
		.style("stroke-dasharray", ("7, 4"))
		.style("stroke-width", 1.5)
		.transition().duration(2000).delay(delay*2)
		.attr("y2", 2);		
	//Horizontal line
	startBar2000.append("line")
		.attr("x1", loc2000bar)
		.attr("x2", (loc2000bar + barWidth))
		.attr("y1", 2)
		.attr("y2", 2)
		.style("stroke","#AAAAAA")
		.style("stroke-width", 1.5)
		.style("opacity", 0)
		.transition().duration(500).delay(delay*2+1500)
		.style("opacity", 1);			

	//Make text disappear
	d3.select("#explanation")
			.transition().duration(1000).delay(delay*3.4)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
			});
	
	//Remove lines above 2000	
	startBar2000.selectAll("line")
		.transition().duration(1000).delay(delay*3.4)
		.style("opacity", 0)
		.call(endall, function() {
			startBar2000.selectAll("line")
				.remove();
		});
		
	setTimeout(introduceCities, delay*3.4);
	
}//startBar
