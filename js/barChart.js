///////////////////////////////////////////////////////////////////////////
///////////////////////////////// Bar Chart ///////////////////////////////
///////////////////////////////////////////////////////////////////////////	

var barScale = d3.scale.linear();
		
var xAxis = d3.svg.axis()
    .orient("bottom");
	
var yAxis = d3.svg.axis()
    .orient("left")
	.ticks(8);  //Set rough # of ticks
		
var barHeight = 17,
	barChartHeight = 330,
	barTitleText;
		
function initiateBarChart() {
	
	//Remove all previous elements of the bar chart
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();
		
	//Set the bar chart dimension and location
	barChart.attr("width", 300)
			.attr("height", barChartHeight)
			.attr("transform","translate(650,220)")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2000)
			.style("opacity",1);
			
	barWrappingOther.attr("width", 300)
			.attr("height", 20)
			.attr("transform","translate(650, " + (220 + barChartHeight) +")")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2000)
			.style("opacity",1);

	//Create the bar scale for population as the initialization
	barScale
		.range([0, 200])
		.domain([0,d3.max(countries, function(d) {return d.pop_2010;})]);
		
	//Set up axes
	xAxis
		.ticks(5)
		.scale(barScale)
		.tickFormat(numFormatSI);
	
	//Create a group for each bar
	var bar = barChart.selectAll("g")
		.data(countries)
		.enter().append("g")
		.attr("class", "barWrapper")
		.style("visibility","visible")
		.attr("transform", function(d, i) { return "translate(75," + (20 + (d.rank_pop-1) * (barHeight)) + ")"; })
		.on("mouseover", highlight)
		.on("mouseout", showAll);

	//Create a white bar to give better mousover and mouseout events
	bar.append("rect")
		.attr("class","background")
		.attr("x", -100)
		.attr("width", 300)
		.attr("height", barHeight)
		.style("fill", "white");

	//Already append a few lines for later
	bar.append("line")
		.attr("class", "line-connect")
		.style("stroke-width", 1)
		.attr("stroke", "#858483")
		.style("opacity", 0);
		
	//Create the 2010 reddish bars	
	bar.append("rect")
		.attr("class","city_2010")
		.style("fill-opacity", 0.8)
		.attr("width", 0)
		.attr("height", barHeight - 2);
	
	//Create the 2010 grey bars	
	bar.append("rect")
		.attr("class","city_2000")
		.style("opacity", 0.8)
		.attr("width", 0)
		.attr("height", barHeight - 2);
		
	//Append country name	
	bar.append("text")
		.attr("class", "barLabels")
		.attr("x", -10)
		.attr("y", 11)
		.style("text-anchor", "end")
		.text(function(d) { return d.country; });

	//Append the x-axis
	barWrappingOther.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(75," + 10 + ")");
	
	//Append the y-axis
	barWrappingOther.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(65," + -barChartHeight + ")");
		
	var barTitle = barChart.append("g")
		.append("text")
		.attr("class","barTitle titleTop")
		.style("visibility","visible")
		.attr("transform", "translate(175,5)")
		.style("text-anchor", "middle");	

	//Create the slopegraph based on the dimension selected		
	if (rVar == "pop") {totalPopulationBarGraph();};
	if (rVar == "land") {totalLandBarGraph();};
	if (rVar == "density") {totalDensityBarGraph();};	
}//initiateBarChart

//Update the bar graph to population
function totalPopulationBarGraph() {
	rVar = "pop";
	barTitleText = "Urban population";
	updateBar();	
}//totalPopulationBarGraph

//Update the bar graph to land
function totalLandBarGraph() {
	rVar = "land";
	barTitleText = "Urban land [in sq. km.]";
	updateBar();
}//totalLandBarGraph

//Update the bar graph to density
function totalDensityBarGraph() {
	rVar = "density";
	barTitleText = "Avg. urban population density [in persons/sq. km]";
	updateBar();
}//totalDensityBarGraph

//Update the bar graph to the chosen dimension in the buttons
function updateBar() {
	barScale.domain([0,d3.max(countries, function(d) {return eval("d." + rVar + "_2010");})])
	xAxis.scale(barScale);

	barChart.selectAll(".barWrapper")
		.style("visibility","visible")
		.transition().duration(1000)
		.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d.rank_" + rVar + "-1") * barHeight) + ")"; });

	barChart.selectAll(".city_2010")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + rVar + "_2010"));})

	barChart.selectAll(".city_2000")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + rVar + "_2000"));})

	//Update the x axis
	barWrappingOther.select(".x.axis")
		.transition().duration(1000)
		.call(xAxis);
		
	barChart.selectAll(".barTitle")
		.text(barTitleText);
		
}//updateBar
