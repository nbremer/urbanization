///////////////////////////////////////////////////////////////////////////
///////////////////////////// Scatter plot GDP ////////////////////////////
///////////////////////////////////////////////////////////////////////////	

var yBarScale = d3.scale.linear();
var barDimWidth = 400,
	barDimHeight = 500,
	barX = 50,
	barY = 40,
	dotSize = 6;

function callScatter() {

	setTimeout(function() {counter = 9;}, 1000);
		
	//Set the progress circles
	setCircleProgress(8);
	
	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Activate the back button
	d3.select("#clickerBack").classed("activeButton",true);
	d3.select("#clickerBack").classed("inactiveButton",false);
	//Activate the front button
	d3.select("#clickerFront").classed("activeButton",true);	
	d3.select("#clickerFront").classed("inactiveButton",false);	
	d3.select("#clickerFront").html("Finish");
	
	//Reset the progress bar
	resetProgressBar();

	//Remove the two bars - if present
	startBarChart.selectAll("g").remove();
	
	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");	
	
	//Remove previous slope elements
	slopes.selectAll(".slopes").remove();
	text2000.selectAll("text").remove();
	text2010.selectAll("text").remove();
	slopeTitles.selectAll("text").remove();

	//Show the text & button on the right
	d3.select("#section")
		.transition().delay(100)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");
				
			//Change title in top right corner
			d3.select("#sectionTitle")
				.html("Urbanization and economic prosperity");
			//Change text in top right corner
			d3.select("#sectionText")
				.html('<p>Even though it would almost appear as if all inhabitants of East Asia live in cities, the large majority of the citizens currently still live in rural areas. Continuous urban growth is therefore expected to occur in the coming decades</p>' +
					  '<p>The current view reveals a correlation between a rise in the urban population as a percentage to the whole population and an increase in the GDP (for the countries where GDP information is available) showing a glance of the possible economic prosperity that continuous urban growth might bring to an urban area and people that might move here in the coming future</p>' +
					  '<p>For now, one can only speculate about the impact the continuous move towards cities will have on the social and economic circumstances of these families and areas. However, with more investment into research on the factors that influence the positive side of urbanization a future might be created in which more urban areas can be a place of constant development and continuous economic and social opportunities</p>' +
					  '<p><span style="color: #A8A8A8;">To see which country belongs to each circle-line element hover over the plot on the left</span></p>');		
		})
		.transition().duration(1000)
		.style("opacity",1);	
		
	//Hide the buttons
	d3.select(".btn-group")
		.style("visibility", "hidden");

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
			
	//Remove map - if present
	map.selectAll(".geo-path")
		.transition().duration(2000)
		.style("stroke-opacity", 0)
		.style("fill-opacity", 0)
		.call(endall,  function() {
			map.selectAll(".geo-path")
				.attr("visibility", "hidden");			
		});

	//Remove dot histogram axis & text
	dotWrapper.selectAll("g")
		.transition().duration(1000)
		.style("opacity", 0)
		.remove();
	dotWrapper.selectAll("text")
		.transition().duration(1000)
		.style("opacity", 0)
		.remove();

	//Remove 2000 cities
	cities2000.selectAll(".city_2000")
		.transition().duration(1000)
		.attr("r", 0)
		.style("fill-opacity", 0);
		
	//Remove 2010 cities
	cities2010.selectAll(".city_2010")
		.style("fill", null)
		.transition().duration(1000)
		.attr("r", 0)
		.style("fill-opacity", 0);
	
	//Remove all previous elements of the bar chart
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();

	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

			
	//Set the new x axis range
	barScale
		.range([0, barDimWidth])
		.domain([0,0.7]);
	//Set new x-axis
	xAxis
		.ticks(8)
		.scale(barScale)
		.tickFormat(numFormatPercent);
		
	//Set the new y axis range
	yBarScale
		.range([barDimHeight,100])
		.domain([0, 70000]);		
	yAxis
		.tickFormat(numFormatCurrency)
		.scale(yBarScale);	
		
	//Move bar chart to the new location
	barChart
			.style("visibility","visible")
			.attr("width", barDimWidth)
			.attr("height", barDimHeight)
			.attr("transform","translate(" + barX + "," + barY + ")")
			.style("opacity",0)
			.transition().duration(1000)
			.style("opacity",1);
	//Move the axes wrapper		
	barWrappingOther
			.style("visibility","visible")
			.attr("width", barDimWidth)
			.attr("height", 20)
			.attr("transform","translate(" + barX + ", " + (barY + barDimHeight) +")")
			.style("opacity",0)
			.transition().duration(1000)
			.style("opacity",1);

	//Create a group for each bar
	var bar = barChart.selectAll("g")
		.data(countries)
		.enter().append("g")
		.filter(function(d) {return d.country != "Singapore" & d.gdp_2000 != 0;})
		.attr("class", "barWrapper")
		.style("visibility","visible")
		.attr("transform", function(d, i) { return "translate(75,0)"; });
				
	//Already append a few lines for later
	bar.append("line")
		.attr("class", "line-connect")
		.style("stroke-width", 1)
		.attr("stroke", "#858483")
		.style("opacity", 0);
		
	//Create the 2010 circles
	bar.append("rect")
		.attr("class","city_2010")
		.style("fill-opacity", 0)
		.attr("rx",dotSize)
		.attr("ry",dotSize)
		.attr("width",dotSize)
		.attr("height",dotSize)
		.attr("transform", function (d) {
			return "translate(" + (barScale(d.pop_perc_2010) - dotSize/2) + "," + (yBarScale(d.gdp_2010) - dotSize/2) + ")";
		});
	
	//Create the 2010 circles
	bar.append("rect")
		.attr("class","city_2000")
		.style("fill-opacity", 0)
		.attr("rx",dotSize)
		.attr("ry",dotSize)
		.attr("width",dotSize)
		.attr("height",dotSize)
		.attr("transform", function (d) {
			return "translate(" + (barScale(d.pop_perc_2000) - dotSize/2) + "," + (yBarScale(d.gdp_2000) - dotSize/2) + ")";
		});
		
	//Append the x-axis
	barWrappingOther.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(75," + 10 + ")");
	
	//Append the y-axis
	barWrappingOther.append("g")
		.attr("class", "y axis");

	//Create the x axis
	barWrappingOther.selectAll(".x.axis")
		.style("opacity", 0)
		.call(xAxis)
		.transition().duration(1000).delay(1000)
		.style("opacity", 1);
	barWrappingOther.selectAll(".x.axis text")
		.style("font-size", "10px");	
	//Set up X axis label
	barWrappingOther.append("g")
		.append("text")
		.attr("class", "x label titleTop")
		.attr("text-anchor", "middle")
		.attr("transform", "translate(" + (75 + barDimWidth/2) + "," + 60 + ")")
		.style("font-size", "15px")
		.style("opacity", 0)
		.text("% of population living in urban areas of 100,000 people or more")
		.transition().duration(1000).delay(1000)
		.style("opacity", 1);
		
	setTimeout(createScatter, 1000);
		
}//callScatter

function createScatter() {
	
	d3.select("#clickerFront").html("Finish");

	//Create the y axis
	barWrappingOther.select(".y.axis")
		.attr("transform", "translate(65," + -barDimHeight + ")")
		.style("opacity", 0)
		.transition().duration(1000)
		.style("opacity", 1)
		.call(yAxis);
	barWrappingOther.selectAll(".y.axis text")
		.style("font-size", "10px");
	
	//Set up y axis label
	barWrappingOther.append("g")
		.append("text")
		.attr("class", "y label titleTop")
		.attr("text-anchor", "middle")
		.attr("transform", "translate(65, " + -(55+barDimHeight-100) + ")")
		.style("font-size", "15px")
		.style("opacity", 0)
		.text("GDP per capita")
		.transition().duration(1000)
		.style("opacity", 1);
	barWrappingOther.append("g")
		.append("text")
		.attr("class", "y label subTitle")
		.attr("transform", "translate(65, " + -(35+barDimHeight-100) + ")")
		.style("opacity", 0)
		.text("purchasing power parity")
		.transition().duration(1000)
		.style("opacity", 1);
	barWrappingOther.append("g")
		.append("text")
		.attr("class", "y label subTitle")
		.attr("transform", "translate(65, " + -(19+barDimHeight-100) + ")")
		.style("opacity", 0)
		.text("current international $")
		.transition().duration(1000)
		.style("opacity", 1);
		
	//Move the 2000 dots to the correct height
	barChart.selectAll(".city_2000")
		.on("mouseover", countryHover)
		.on("mouseout", countryOut)
		.transition().duration(1000)
		.style("fill-opacity", 1)
		.attr("transform", function (d) {
			return "translate(" + (barScale(d.pop_perc_2000) - dotSize/2) + "," + (yBarScale(d.gdp_2000) - dotSize/2) + ")";
		});
	//Move the 2010 dots to the correct height			
	barChart.selectAll(".city_2010")
		.on("mouseover", countryHover)
		.on("mouseout", countryOut)
		.transition().duration(1000)
		.style("fill-opacity", 1)
		.attr("transform", function (d) {
			return "translate(" + (barScale(d.pop_perc_2010) - dotSize/2) + "," + (yBarScale(d.gdp_2010) - dotSize/2) + ")";
		});
		
	//Move the lines between the dots to the correct height
	barChart.selectAll("line")
		.on("mouseover", countryHover)
		.on("mouseout", countryOut)
		.transition().duration(1000)
		.style("opacity", 1)
		.attr("x1", function(d) {return barScale(d.pop_perc_2000);})
		.attr("x2", function(d) {return barScale(d.pop_perc_2010);})
		.attr("y1", function(d) {return yBarScale(d.gdp_2000);})
		.attr("y2", function(d) {return yBarScale(d.gdp_2010);});

	
}//createScatter

//Show country name in the last GDP scatterplot
function countryHover(d) {
	//Change the numbers to reflect the hovered over city
	d3.select("#callOutCountry").html(d.country);
	//Make the callOut visible again
	d3.select("#callOutCountryWrapper")
		.style("visibility","visible")
		//.transition().duration(500)
		.style("opacity", 1);
}//countryHover

//Hide callout again
function countryOut() {
	//Make the callOut hidden
	d3.select("#callOutCountryWrapper")
		.transition().duration(500)
		.style("opacity", 0)
		.call(endall, function() {
			d3.select("#callOutCountryWrapper")
				.style("visibility","hidden");
		});
}//countryOut
