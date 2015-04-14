///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Map View //////////////////////////////////
///////////////////////////////////////////////////////////////////////////	

var rScale = d3.scale.sqrt(); 			
var rVar = "pop";
			
//This function shows the map and moves the circles to their geo locations
function totalAreaMap() {
	
	setTimeout(function() {counter = 3;}, 1000);
	
	modus = "Map";

	//Set the progress circles
	setCircleProgress(2);
	
	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Activate the back button
	d3.select("#clickerBack").classed("activeButton",true);
	d3.select("#clickerBack").classed("inactiveButton",false);
	//Activate the front button
	d3.select("#clickerFront").classed("activeButton",true);	
	d3.select("#clickerFront").classed("inactiveButton",false);	
	//Change text of front button
	d3.select("#clickerFront").html("Continue");
	
	//Remove the intro explanation 
	d3.select("#explanationIntro")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanationIntro")
				.style("visibility","hidden");
		});
		
	//Show the buttons
	d3.select(".btn-group")
		.style("visibility", "visible");

	//Remove the two bars - if present
	startBarChart.selectAll("g").remove();
	
	//Reset the progress bar
	resetProgressBar();

	//Remove slopegraph elements - if present
	slopes.selectAll(".slopes").remove();
	text2000.selectAll("text").remove();
	text2010.selectAll("text").remove();
	slopeTitles.selectAll("text").remove();

	//Remove color setting from dot-plot
	cities2010.selectAll(".city_2010")
		.style("fill","#DA6761");
		
	//Remove dot histogram axis & text - if present
	dotWrapper.selectAll("g").remove();
	dotWrapper.selectAll("text").remove();
	
	//Make text & call-out disappear - if present
	d3.select("#explanation")
			.transition().duration(1000)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
					
				d3.select("#callOut").style("visibility","hidden");
			});

	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

	//Show the text in the top right corner
	d3.select("#section")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",1);

	//Show the text & button on the right
	d3.select("#section")
		.transition().delay(100)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");			
			//Change title in top right corner
			d3.select("#sectionTitle")
				.style("opacity",1)
				.html("Cities with over 100,000 inhabitants");
			//Change text in top right corner
			d3.select("#sectionText")
				.html('<p>The urban areas in this research have 100,000 or more inhabitants in 2010. In 2000 there were already 580 million people living in these 869 cities and just one decade on this number grew to 780 million. That’s 200 million people more!<br>With this amount of people of the move, it becomes imperative for cities to plan for their arrival in terms of housing and infrastructure</p>' + 
					  '<p><span style="color: #A8A8A8;">Click on the buttons below to see the differences of the urban population, urban land or urban population density per city or hover over the plots to get more detailed information</span></p>');	
		})
		.transition().duration(1000)
		.style("opacity",1);

	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.style("stroke-opacity", 1)
		.style("fill-opacity", 1);

	setTimeout(initiateBarChart(), 1000);
	
	//Plot the sizes of the cities in 2010 in reddish
	//On the same location plot the sizes of the cities in 2000 in greyish			
	if (rVar == "pop") {totalPopulationMap();};
	if (rVar == "land") {totalUrbanLandMap();};
	if (rVar == "density") {totalDensityMap();};	
	
}//totalAreaMap	

function totalPopulationMap() {
	rScale.domain([d3.min(data, function(d) {return d.pop_2000;}),d3.max(data, function(d) {return d.pop_2010;})])
		  .range([1,20]);
	rVar = "pop"
	changeMap();
}//totalPopulationMap

function totalUrbanLandMap() {
	rScale.domain([d3.min(data, function(d) {return d.land_2000;}),d3.max(data, function(d) {return d.land_2010;})])
		  .range([1,20]);
	rVar = "land"
	changeMap();	
}//totalUrbanLandMap

function totalDensityMap() {
	rScale.domain([d3.min(data, function(d) {return d.density_2000;}),d3.max(data, function(d) {return d.density_2010;})])
		  .range([1,8]);
	rVar = "density"
	changeMap();	
}//totalDensityMap

//Change the dots on the map
function changeMap() {
	//Plot the sizes of the cities in 2010 in reddish
	cities2010.selectAll(".city_2010")
		.on("mouseover", showOne)
		.on("mouseout", showAll)
		.transition().duration(1500)
			.attr("r", function(d) {return eval("rScale(d." + rVar + "_2010)");})
			.style("fill-opacity", 0.5)
			.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
			.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
	
	//On the same location plot the sizes of the cities in 2000 in greyish	
	cities2000.selectAll(".city_2000")
		.on("mouseover", showOne)
		.on("mouseout", showAll)
		.transition().duration(1500)
			.attr("r", function(d) {return eval("rScale(d." + rVar + "_2000)");})
			.style("fill-opacity", 0.7)
			.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
			.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
}//changeMap