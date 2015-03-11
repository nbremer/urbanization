///////////////////////////////////////////////////////////////////////////
//////////////////////////// Dot Histogram ////////////////////////////////
///////////////////////////////////////////////////////////////////////////	

var dotScaleY = d3.scale.linear(),
	dotScaleX = d3.scale.linear().range([75,575]),
	dotLocation = 550,
	stepSize,
	perc,
	stepSize,
	stepper,
	maxNum = 3,
	legend,
	legendTitle,
	dotTitle,
	firstDot = true,
	ranking_pop = [],
	ranking_land = [].
	ranking_density = [];
	
var xDotAxis = d3.svg.axis()
    .orient("bottom")
	.ticks(8);  //Set rough # of ticks

var color = d3.scale.threshold();

function callDotHistogram() {
	
	setTimeout(function() {counter = 7;}, 1000);
	firstDot = true;

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

	//Set the progress circles
	setCircleProgress(6);

	
	//Remove the bar chart to the right - if present
	barChart.selectAll("g").transition().remove();
	barWrappingOther.selectAll("g").transition().remove();
	
	//Remove the two bars - if present
	startBarChart.selectAll("g").remove();
		
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
	
	//Remove slopegraph elements - if present
	slopes.selectAll(".slopes").remove();
	text2000.selectAll("text").remove();
	text2010.selectAll("text").remove();
	slopeTitles.selectAll("text").remove();

	//Show the buttons
	d3.select(".btn-group")
		.style("visibility", "visible");

	//Show the text & button on the right
	d3.select("#section")
		.transition().delay(100)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");
				
			//Change title in top right corner
			d3.select("#sectionTitle")
				.html("Rapid growth within one decade");
			//Change text in top right corner
			d3.select("#sectionText")
				.html('<p>These plots show the rapid growth in land and population within the cities. Growth may lead to numerous economic opportunities. However, it also forces urban policy makers and planners to rethink the design of their cities. The arrangement of future infrastructure can already be a crucial decision. Each city has its own challenges and opportunities and each county its own way of growing</p>' + 
					  '<p><span style="color: #A8A8A8;">Click on the buttons below to see the differences of the urban population, urban land or urban population density per city or hover over the plots to get more detailed information</span></p>');
				
		})
		.transition().duration(1000)
		.style("opacity",1);		
	
	//Show bar chart again
	setTimeout(initiateBarChart, 600);	
	
	//Call slopegraph
	setTimeout(dotHistogram, 1100);

}

function dotHistogram() {

	modus = "Dot";
	
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

	//Create domains of the scale
	dotScaleY
		.range([dotLocation,(dotLocation-500)])
		.domain([1,100]);

	//////////////////////////////////////////////////////
	////////////////////// Build axes ////////////////////
	//////////////////////////////////////////////////////
	
	//Remove any previous axis & legend
	dotWrapper.selectAll("g").remove();
	dotWrapper.selectAll("text").remove();
	
	//Set the format of the y axis
	xDotAxis.tickFormat(numFormatPercent);
	
	//Put in the right location
	dotWrapper.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + 0 + "," + (dotLocation+10) + ")")
		.style("opacity", 0);

	//Set up X axis label
	dotWrapper.append("text")
		.attr("class", "x label titleTop")
		.attr("text-anchor", "middle")
		.attr("x", (75 + (575-75)/2))
		.attr("y", dotLocation + 60)
		.style("font-size", "18px")
		.style("opacity", 0);

	////////////////// y axis ////////////////////
	var yDotAxis = d3.svg.axis()
		.orient("left")
		.ticks(8)  //Set rough # of ticks
		.scale(dotScaleY);
		
	//Put in the right location
	dotWrapper.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 65 + "," + 0 + ")")
		.style("opacity", 0)
		.transition().duration(1000).delay(2000)
		.style("opacity", 1)
		.call(yDotAxis);
	dotWrapper.selectAll(".y.axis text")
		.style("font-size", "10px");
		
	//Set up Y axis label
	dotWrapper.append("text")
		.attr("class", "y label titleTop")
		.attr("text-anchor", "middle")
		//.attr("transform", "rotate(-90)")
		//.attr("x", -180)
		//.attr("y", 85)
		.attr("x", 65)
		.attr("y", 35)
		.style("font-size", "12px")
		.style("opacity", 0)
		.text("Number of cities")
		.transition().duration(1000).delay(2000)
		.style("opacity", 1);
		
	//////////////////////////////////////////////////////
	//////////////////// Set color ///////////////////////
	//////////////////////////////////////////////////////
	
	//Create color scale
	//var hexColors = ['#631b17','#7f2d28','#9d403a','#bb534e','#da6761'];
	//var hexColors = ['rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(222,45,38)','rgb(165,15,21)'];
	//var popData = [];	
	//data.forEach(function(d, i) {
	//	popData[i] = d.pop_2010;
	//})
	//var color = d3.scale.linear()
	//	.domain([d3.quantile(popData, 0),d3.quantile(popData, 0.25),d3.quantile(popData, 0.5),d3.quantile(popData, 0.75),d3.quantile(popData, 1)])
	//	.range(hexColors.reverse());	
	//var hexColors = ["#fcbba1","#67000d"];
	//var color = d3.scale.log()
	//	.domain(d3.extent(data, function(d) {return d.pop_2010;}))
	//	.range(hexColors);		
	//var color = d3.scale.quantile()
	//  .domain(popData)
	//  .range(hexColors.reverse());
	
	//var hexColors = ["#63A69F","#F2E1AC","#F2836B","#cb181d"];
	var hexColors = ["#fcbba1","#fb6a4a","#cb181d","#67000d"];
	color.range(hexColors);

	//////////////////////////////////////////////////////
	///////////////// Initiate legend ////////////////////
	//////////////////////////////////////////////////////
	
	//Adding legend
	legendWrapper = dotWrapper.append("g")
		.attr("transform","translate(460, 200)")
		.style("opacity", 0);
		
	legend = legendWrapper
		.selectAll("g.legend")
		.data(color.range())
		.enter().append("g")
		.attr("class", "legend");

	//Create title of Legend
	legendWrapper.append("g")
		.attr("class", "legendTitleWrapper")
		.append('text')                                     
		.attr('x', 0)              
		.attr('y', 15)  
		.style("text-anchor", "start")
		.attr('class', 'legendTitle titleTop')
		.style("font-size", "14px");
			  
	var ls_w = 15, 
		ls_h = 15;

	legend.append("rect")
		.attr("x", 0)
		.attr("y", function(d, i){ return 100 - (i*ls_h) - 2*ls_h;})
		.attr("width", ls_w)
		.attr("height", ls_h)
		.style("fill", function(d, i) { return d; })
		.style("opacity", 0.8);

	legendText = legend.append("text")
		.attr("x", 30)
		.attr("y", function(d, i){ return 100 - (i*ls_h) - ls_h - 4;});
		
	legendWrapper
		.transition().duration(1000).delay(2000)
		.style("opacity", 1);

	//////////////////////////////////////////////////////
	////////////////// Call Dot plot /////////////////////
	//////////////////////////////////////////////////////
	
	//Create the dot histogram based on the dimension selected		
	if (rVar == "pop") totalPopulationDotHisto();
	if (rVar == "land") totalLandDotHisto();
	if (rVar == "density") totalDensityDotHisto();	
	
}//dotHistogram


//Create the dot histogram based on the dimension selected		
function totalPopulationDotHisto() {
		stepSize = 0.05;
		color.domain([5e5, 1e6, 5e6]);
		legendTitle = "Urban population - 2010";
		dotTitle = "Growth in urban population between 2000 and 2010";
		//Set the y-axis scale
		dotScaleX.domain(d3.extent(data, function(d) {return d.pop_growth;}));	
		createDotHisto();
}//totalPopulationDotHisto

function totalLandDotHisto() {
		stepSize = 0.03;
		color.domain([200, 500, 1000]);
		legendTitle = "Urban land - 2010";
		dotTitle = "Growth in urban land between 2000 and 2010";
		//Set the y-axis scale
		dotScaleX
			.domain([d3.min(data, function(d) {return d.land_growth;}), maxNum])
			.clamp(true);	
		createDotHisto();
}//totalUrbanLandSlopeGraph

function totalDensityDotHisto() {
		stepSize = 0.02;
		color.domain([5000, 10000, 15000]);
		legendTitle = "Population density - 2010";
		dotTitle = "Growth in avg. urban population density between 2000 and 2010";
		//Set the y-axis scale
		dotScaleX.domain(d3.extent(data, function(d) {return d.density_growth;}));	
		createDotHisto();
}//totalDensityDotHisto
	

function createDotHisto() {
	
	//Create a delay when it is the first instance of the dot histo
	var extraDelay = 0;
	
	stepper = 1/stepSize;
		
	//Run this only when it is the first time the dot histogram is called
	if (firstDot == true) {
		
		extraDelay = 2000;

		/////////////////////////////////////////////////////////////////////
		///// Calculate cx positions for each of the 3 dimensions ///////////
		/////////////////////////////////////////////////////////////////////
		
		ranking_pop = rankLocation(0.05, "pop", 
								   minDomain = d3.min(data, function(d) {return d.pop_growth;}), 
								   maxDomain = d3.max(data, function(d) {return d.pop_growth;}))
		
		ranking_land = rankLocation(0.03, "land", 
								   minDomain = d3.min(data, function(d) {return d.land_growth;}), 
								   maxDomain = maxNum)

		ranking_density = rankLocation(0.02, "density", 
								   minDomain = d3.min(data, function(d) {return d.density_growth;}), 
								   maxDomain = d3.max(data, function(d) {return d.density_growth;}))								   
	
		//////////////////////////////////////////////////////
		////////////////// Move to one line //////////////////
		//////////////////////////////////////////////////////

		//Move 2000 cities towards 2010 version
		//Then make them disappear
		cities2000.selectAll(".city_2000")
			.transition().duration(2000)
			.attr("cy", dotLocation)
			.attr("cx", function(d,i) {return dotScaleX(Math.round(roundHalf(eval("d." + rVar + "_growth"),stepper)*100)/100);})
			.style("fill-opacity", 0.8)
			.attr("r", 0);
		//Move 2010 cities towards 2000 version
		cities2010.selectAll(".city_2010")
			.transition().duration(2000)
			.attr("cy", dotLocation)
			.attr("cx", function(d,i) {return dotScaleX(Math.round(roundHalf(eval("d." + rVar + "_growth"),stepper)*100)/100);})
			.style("fill-opacity", 0.8)
			.attr("r", 3);
		firstDot = false;
	}//if
			
	//Update the x axis
	xDotAxis.scale(dotScaleX);
	dotWrapper.selectAll(".x.axis")
		.transition().duration(1000).delay(extraDelay)
		.style("opacity", 1)
		.call(xDotAxis);
	dotWrapper.selectAll(".x.axis text")
		.style("font-size", "10px");

	//Change X axis label
	dotWrapper.select(".x.label")
		.text(dotTitle)
		.transition().duration(1000).delay(extraDelay)
		.style("opacity", 1);
		
	//update legend
	var legend_labels = ["< " + numFormatSI(color.domain()[0]), 
					 numFormatSI(color.domain()[0]) + " - " + numFormatSI(color.domain()[1]), 
					 numFormatSI(color.domain()[1]) + " - " + numFormatSI(color.domain()[2]), 
					 "> " + numFormatSI(color.domain()[2])];
	legendText
		.text(function(d, i){return legend_labels[i];});
		
	d3.selectAll(".legendTitle")
				.text(legendTitle);
		
	//////////////////////////////////////////////////////
	/////////////////// Build histogram //////////////////
	//////////////////////////////////////////////////////
			
	cities2010.selectAll(".city_2010")
		.transition().duration(2000).delay(function(d,i) {return (extraDelay + eval("d.rank_" + rVar)*0.5);}) //Grow from largest cities first
		.attr("r", 2)
		.style("fill-opacity", 0.9)
		.style("fill", function(d) { return color(eval("d." + rVar + "_2010")); })
		.attr("cx", function(d,i) {return dotScaleX(Math.round(roundHalf(eval("d." + rVar + "_growth"), stepper)*100)/100);})
		//.attr("cy", function(d,i) {return locateY(d);})	
		.attr("cy", function(d,i) {return eval("ranking_" + rVar + "[i].cy");})
		.call(endall, function() {
				cities2010.selectAll(".city_2010")
					.on("mouseover", showOneDot)
					.on("mouseout", showAllDot);			
		});
			
}//createDotHisto

//////////////////////////////////////////////////////
/////////////////// Extra Functions //////////////////
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
/////////////// Dot plot hover options ///////////////
//////////////////////////////////////////////////////
function showAllDot() {
		
	cities2010.selectAll(".city_2010")
		.transition()
		.style("fill-opacity", 1);
	
	d3.select("#callOut").style("visibility","hidden");
	
}//showAllDot	

 //Show only the circles and line for the hovered over city
 function showOneDot(d) {
	
	//Compare everything with the hovered over city
	var chosen = d;
	
	hoverType = "city";
	
	circleHover(chosen);
		
	cities2010.selectAll(".city_2010")
		.transition()
		.style("fill-opacity", function(d) {
			if (eval("d.rank_" + rVar) != eval("chosen.rank_" + rVar)) return 0.2;
			else return 1;
		});
}//showOneDot

//////////////////////////////////////////////////////
////////////////// Y axis locations //////////////////
//////////////////////////////////////////////////////
			
//Find the locations of the cx for each histogram
function rankLocation(stepSizeVar, Var, minDomain, maxDomain) {

	var rankingArray = [];	
	
	//Stepsize
	var stepping = 1/stepSizeVar;
	//Keeps track of the height of each year
	var perc = d3.range(Math.floor(Math.floor(minDomain*100)/100*stepping)/stepping, 
						Math.ceil(Math.ceil(maxDomain*100)/100*stepping)/stepping+stepSizeVar, 
						stepSizeVar).map(function(d,i) {
		  return {
			perc: numFormatTwo(d),
			number: 1
		  };
		});

	//Save required info in a separate array where the cx position will be filled in later
	data.forEach(function(d, i) {
		rankingArray.push({
			order: i,
			rank: eval("d.rank_" + Var),
			growth: eval("d." + Var + "_growth"),
			cy: 0
		});
	});	

	//Sort by the rank of pop/land/density
	rankingArray = rankingArray.sort(compareRank);
	//Now in the order of rank, run the locateX function so the smallest ranks (largest) are run first
	//and are therefore closer the the axis
	for (var i = 0; i < rankingArray.length; i++) {
		rankingArray[i].cy = locateY(rankingArray[i].growth, stepping, perc)
	};
	//Put the array back in the original order
	rankingArray = rankingArray.sort(compareOrder);
	
	return rankingArray;
}//rankLocation

function locateY(d, step, perc) {

	//console.log(roundHalf(d, step));
	var percLoc = getByValue(roundHalf(d, step), perc);

	var topping = perc[percLoc].number;
	perc[percLoc].number += 1;

	return dotScaleY(topping);	
}// function locateX
		
//Round to stepSize
function roundHalf(num, step) {
	num = numFormatTwo(Math.min(Math.floor(num*step)/step,maxNum));
	return num;
}//roundHalf

//Get location where perc stays
function getByValue(value, perc) {
  for (var i=0, iLen = perc.length; i < iLen; i++) {
	if (perc[i].perc == value) return i;
  }//for
}//getByValue

//Order by rank value
function compareRank(a,b) {
  if (a.rank < b.rank)
	 return -1;
  if (a.rank > b.rank)
	return 1;
  return 0;
}//compareRank

//Order by the order value
function compareOrder(a,b, varname) {
  if (a.order < b.order)
	 return -1;
  if (a.order > b.order)
	return 1;
  return 0;
}//compareOrder

/*
//Locate the X location based on what has come before
function locateXstraight(d) {

	//console.log(roundHalf(eval("d." + rVar + "_growth")));
	var percLoc = getByValue(roundHalf(eval("d." + rVar + "_growth")));
	
	var topping = perc[percLoc].number;
	perc[percLoc].number += 1;
	
	return dotScaleY(topping);	
}// function locateX
*/
