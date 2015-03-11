///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Slopegraph ////////////////////////////////
///////////////////////////////////////////////////////////////////////////	

//Default initial
var slopeTitle,
	firstSlope;

//Initiate the scale for the vertical invisible lines of the slopegraph
var slopeScale = d3.scale.linear().range([620,120]);

//Location of the 2000 and 2010 vertical "lines"
var xAxisLoc2000 = 200,
	xAxisLoc2010 = xAxisLoc2000 + 200;

function callSlopeGraph() {

	//Change visual modus to slope	
	modus = "Slope";
	
	setTimeout(function() {counter = 5;}, 1000);
		
	//Set the progress circles
	setCircleProgress(4);
	
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
	
	//Reset the progress bar
	resetProgressBar();

	//Remove the two bars - if present
	startBarChart.selectAll("g").remove();
	
	//Show the buttons
	d3.select(".btn-group")
		.style("visibility", "visible");
		
	//Remove the intro explanation 
	d3.select("#explanationIntro")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanationIntro")
				.style("visibility","hidden");
		});
		
	//Make text & call-out disappear - if present
	d3.select("#explanation")
			.transition().duration(1000)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
			});
			
	//Remove map
	map.selectAll(".geo-path")
		.transition().duration(2000)
		.style("stroke-opacity", 0)
		.style("fill-opacity", 0)
		.call(endall,  function() {
			map.selectAll(".geo-path")
				.attr("visibility", "hidden");			
		});

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
				.html("Creating the right kind of density in a city");
			//Change text in top right corner
			d3.select("#sectionText")
				.html('<p>Urban population density, which was already high in the year 2000 for East Asia has only grown larger for practically all cities outside of China. Continuous growth can be expected in the coming years. Therefore, the focus for urban planners should be on the design of this density, the appropriate coordination and location of different city aspects</p>' + 
					  '<p><span style="color: #A8A8A8;">Click on the buttons below to see the differences of the urban population, urban land or urban population density per city or hover over the plots to get more detailed information</span></p>');	
		})
		.transition().duration(1000)
		.style("opacity",1);	

	//Show bar chart again
	initiateBarChart();	
	
	//Call slopegraph
	setTimeout(initiateSlopeGraph, 1100);
	
	//Remove color setting from dot-plot
	cities2010.selectAll(".city_2010")
		.style("fill", null)
		.style("fill-opacity", 0.8);
		
	//Remove dot histogram axis
	dotWrapper.selectAll("g").remove();
	dotWrapper.selectAll("text").remove();
	
	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");
	
}//callSlopeGraph
	
//Function to show the slopegraph			
function initiateSlopeGraph() {

	//Remove map
	map.selectAll(".geo-path")
		.transition().duration(2000)
		.style("stroke-opacity", 0)
		.style("fill-opacity", 0)
		.call(endall,  function() {
			map.selectAll(".geo-path")
				.attr("visibility", "hidden");			
		});
		
	//Change visual modus to slope	
	modus = "Slope";
	//Adds a small delay of the slope lines when drawn from the map modus
	firstSlope = true;

	//Make all elements visible again	
	d3.selectAll(".slopeGraph")
		.attr("visibility", "visible")
		.transition().duration(1000)
		.style("opacity", 1);

	//Remove previous slope elements
	slopes.selectAll(".slopes").remove();
	text2000.selectAll("text").remove();
	text2010.selectAll("text").remove();
	slopeTitles.selectAll("text").remove();
	
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////
	
	//Initiate the lines for the slopegraph
	slopes.selectAll(".slopes")
		.data(data)
		.enter().append("line")
		.attr("class", "slopes")
		.style("stroke-width", 1)
		.attr("stroke", "#858483")
		.on("mouseover", showOne)
		.on("mouseout", showAll)
		.style("opacity", 0);
				
	//Initiate the text for 2000 datapoints
	text2000.selectAll("text")
		.data(data)
		.enter().append("text")
			.attr("class", "text2000")
			.style("text-anchor","end")
			.attr("font-size", 10)
			.attr("dy", ".4em")
			.style("cursor","default")
			.on("mouseover", showOne)
			.on("mouseout", showAll)
			.style("opacity", 0);

	//Initiate the text for 2010 datapoints
	text2010.selectAll("text")
		.data(data)
		.enter().append("text")
			.attr("class", "text2010")
			.style("text-anchor","start")
			.attr("font-size", 10)
			.attr("dy", ".3em")
			.style("cursor","default")
			.on("mouseover", showOne)
			.on("mouseout", showAll)
			.style("opacity", 0);

	//////////////////////////////////////////////////////
	//////////////////// Titles on top ///////////////////
	//////////////////////////////////////////////////////
	
	//2000 above left axis	
	slopeTitles.append("text")
		.attr("class","title titleTop city_2010")
		.attr("x", xAxisLoc2000)
		.attr("y", slopeScale.range()[1] - 40)
		.style("text-anchor", "middle")
		.text("2000")
		.style("opacity", 0)
		.attr("visibility", "visible")
		.transition().duration(1000)
		.style("opacity", 1);
	//2010 above right axis
	slopeTitles.append("text")
		.attr("class","title titleTop")
		.attr("x", xAxisLoc2010)
		.attr("y", slopeScale.range()[1] - 40)
		.style("text-anchor", "middle")
		.style("fill", "#DA6761")
		.text("2010")
		.style("opacity", 0)
		.attr("visibility", "visible")
		.transition().duration(1000)
		.style("opacity", 1);
	//The title on top
	slopeTitles.append("text")
		.attr("class","titleTop top")
		.attr("x", (xAxisLoc2010 - xAxisLoc2000)/2 + xAxisLoc2000)
		.attr("y", slopeScale.range()[1] - 80)
		.style("text-anchor", "middle")
		.text(slopeTitle)
		.style("opacity", 0)
		.attr("visibility", "visible")
		.transition().duration(1000)
		.style("opacity", 1);
		
	//Create the slopegraph based on the dimension selected		
	if (rVar == "pop") {totalPopulationSlopeGraph();};
	if (rVar == "land") {totalUrbanLandSlopeGraph();};
	if (rVar == "density") {totalDensitySlopeGraph();};	
	
}//initiateSlopeGraph					

//Move circles to show Population between 2000 and 2010
function totalPopulationSlopeGraph() {	
	rVar = "pop";
	slopeTitle = "Urban population [in millions]";
	changeSlope();
}//totalPopulationSlopeGraph

//Move circles to show Land between 2000 and 2010
function totalUrbanLandSlopeGraph() {
	rVar = "land";
	slopeTitle = "Urban land [in sq. km.]";
	changeSlope();
}//totalUrbanLandSlopeGraph

//Move circles to show Density between 2000 and 2010
function totalDensitySlopeGraph() {
	rVar = "density";
	slopeTitle = "Urban population density [in 1000 persons/sq. km]";
	changeSlope();
}//totalDensitySlopeGraph

//Actual function that sets the positions, lines and text of the slopgraph elements
function changeSlope() {	

	var dur = (firstSlope == true ? 2000 : 2000);
	var delaySlope = (firstSlope == true ? 500 : 0);
	
	//Create domains of the scale
	slopeScale.domain([d3.min(data, function(d) {return eval("d." + rVar + "_2000");}),d3.max(data, function(d) {return eval("d." + rVar + "_2010");})]);

	//Move city circles of 2000 to left axis
	cities2000.selectAll(".city_2000")
		.transition().duration(dur)
		.style("fill-opacity", 0.8)
		.attr("r", 3)
		.attr("cx", xAxisLoc2000)
		.attr("cy", function(d){return slopeScale(eval("d." + rVar + "_2000"));});
	
	//Move city circles of 2010 to right axis
	cities2010.selectAll(".city_2010")
		.transition().duration(dur)
		.style("fill", null)
		.style("fill-opacity", 0.8)
		.attr("r", 3)
		.attr("cx", xAxisLoc2010)
		.attr("cy", function(d){return slopeScale(eval("d." + rVar + "_2010"));});
	
	//Draw the lines between the points
	slopes.selectAll(".slopes")
		.transition().duration(dur/2).delay(delaySlope)
		.style("opacity", 0)
		.call(endall, function () {
			slopes.selectAll(".slopes")
				.attr("x1", xAxisLoc2000)
				.attr("x2", xAxisLoc2010)
				.attr("y1",function(d){return slopeScale(eval("d." + rVar + "_2000"));})
				.attr("y2",function(d){return slopeScale(eval("d." + rVar + "_2010"));})
				.transition().duration(dur)
				.style("opacity", 0.4)
		});
		
	text2000.selectAll("text")
		.transition().duration(dur/2)	
		.style("opacity", 0)
		.call(endall,  function() {
			text2000.selectAll("text")
				.attr("x", xAxisLoc2000 - 10)		
				.attr("y", function(d){return slopeScale(eval("d." + rVar + "_2000"));})
				.text(function(d) {
					if (rVar == "pop") {
						if (d.pop_2000 > 1e6) {return d.city + ", " + d.country + " | " + numFormatOne(d.pop_2000/1e6);} 
						else {return d.city + ", " + d.country + " | " + numFormatTwo(d.pop_2000/1e6);}
					} else if (rVar == "land") {
						return d.city + ", " + d.country + " | " + d.land_2000;
					} else if (rVar == "density") {
						return d.city + ", " + d.country + " | " + numFormatTwo(d.density_2000/1e3); 
					}//else if
				})				
				.filter(function(d) { return eval("d.rank_" + rVar + " < 10");})
				.transition().duration(dur/2)			
				.style("opacity", 0.7)
		});
		
	text2010.selectAll("text")
		.transition().duration(dur/2)	
		.style("opacity", 0)
		.call(endall,  function() {
			text2010.selectAll("text")
				.attr("x", xAxisLoc2010 + 10)		
				.attr("y", function(d){return slopeScale(eval("d." + rVar + "_2010"));})
				.text(function(d) {
					if (rVar == "pop") {
						if (d.pop_2000 > 1e6) {return numFormatOne(d.pop_2010/1e6) + " | " + d.city + ", " + d.country;} 
						else {return numFormatTwo(d.pop_2010/1e6) + " | " + d.city + ", " + d.country; }
					} else if (rVar == "land") {
						return d.land_2010 + " | " + d.city + ", " + d.country;
					} else if (rVar == "density") {
						return numFormatTwo(d.density_2010/1e3) + " | " + d.city + ", " + d.country; 
					}//else if
				})
				.filter(function(d) { return eval("d.rank_" + rVar + " < 10");})
				.transition().duration(dur/2)			
				.style("opacity", 0.7)
		});
				
	slopeGraph.selectAll(".top")
		.text(slopeTitle);

	firstSlope = false;
}//changeSlope
