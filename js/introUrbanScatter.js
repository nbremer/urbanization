///////////////////////////////////////////////////////////////////////////
/////////////////////////// Bar Chart to Scatter //////////////////////////
///////////////////////////////////////////////////////////////////////////	

function introUrbanScatter() {
	
	//Change visual modus	
	modus = "urbanPopDot";
	
	setTimeout(function() {counter = 8;}, 1000);
		
	//Set the progress circles
	setCircleProgress(7);
	
	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

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

	//Remove the text & button on the right
	d3.select("#section")
		.transition().duration(500)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","hidden");
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

	//Show bar chart again
	initiateBarChart();	
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////
	
	var delay = 5000;

	//Start the progress bar
	runProgressBar(delay*7);	 

	//New height of each country section
	newBarHeight = (barDimHeight/countries.length);

	//Set the new x axis range
	barScale
		.range([0, barDimWidth]);	
	xAxis.scale(barScale);
	//Set the new y axis range
	yBarScale
		.range([barDimHeight,100])
		.domain([0, 70000]);		
	yAxis
		.tickFormat(numFormatCurrency)
		.scale(yBarScale);

	//////////////////////////////////////////////////////
	////////// Move to left and make bigger //////////////
	//////////////////////////////////////////////////////

	d3.select("#explanation")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.style("top", 260 + "px")
					.style("left", 590 + "px")
					.style("width", 380 + "px")
					.html("Finally, let's zoom into the countries and look at what the future might hold");	
		})
		.transition().duration(1000).delay(2000)
		.style("opacity",1);
		
	//Move bar chart to the new location
	barChart
			.style("visibility","visible")
			.transition().duration(2000)
			.style("opacity",1)
			.attr("width", barDimWidth)
			.attr("height", barDimHeight)
			.attr("transform","translate(" + barX + "," + barY + ")");
	//Move the axes wrapper		
	barWrappingOther
			.style("visibility","visible")
			.transition().duration(2000)
			.style("opacity",1)
			.attr("width", barDimWidth)
			.attr("height", 20)
			.attr("transform","translate(" + barX + ", " + (barY + barDimHeight) +")");
	
	//Move and update the bar title
	barChart.selectAll(".barTitle")
			.style("font-size", "18px")
			.style("opacity",0)
			.transition().duration(1000)
			.attr("transform", "translate(" + ((barX+75) + (barDimWidth-(barX+75))/2) + "," + -15 + ")");
	
	//Create more room between the bars
	barChart.selectAll(".barWrapper")
		.on("mouseover", null)
		.on("mouseout", null)
		.transition().duration(2000).delay(2000)	
		.attr("transform", function(d, i) { return "translate(75," + (5 + (eval("d.rank_" + rVar + "-1")) * newBarHeight) + ")"; });

	//Update the 2010 bar widths	
	barChart.selectAll(".city_2010")
		.transition().duration(2000).delay(2000)	
		.attr("width", function(d) {return barScale(eval("d." + rVar + "_2010"));});
	
	//Update the 2000 bar widths
	barChart.selectAll(".city_2000")
		.transition().duration(2000).delay(2000)	
		.attr("width", function(d) {return barScale(eval("d." + rVar + "_2000"));});

	//Update the x axis
	barWrappingOther.select(".x.axis")
		.transition().duration(2000).delay(2000)
		.call(xAxis);

	//////////////////////////////////////////////////////
	/////////// Change to urban population % /////////////
	//////////////////////////////////////////////////////
	
	setTimeout(function() {	
	
		explanationText(varText = "Here we see the % of the total population that lives in urban areas with more than 100,000 people", 
						delay = delay, delayStep = 0);	

		//Set the new x-axis domain
		barScale.domain([0,0.7]);	
		//Set new x-axis
		xAxis
			.ticks(8)
			.scale(barScale)
			.tickFormat(numFormatPercent);
		//Update the x axis
		barWrappingOther.selectAll(".x.axis")
			.transition().duration(1000)
			.call(xAxis);
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
			.transition().duration(1000)
			.style("opacity", 1);
		
		//Remove background
		barChart.selectAll(".background").remove();
		
		barChart.selectAll(".barWrapper")
			.filter(function(d) {return d.country == "Singapore";})
			.transition().duration(1000)
			.style("opacity", 0)
			.remove();
	
		//Make dots of the 2000 bars
		barChart.selectAll(".city_2000")
			.transition().duration(1000)
			.style("fill-opacity", 1)
			.attr("rx",dotSize)
			.attr("ry",dotSize)
			.attr("width",dotSize)
			.attr("height",dotSize)
			.attr("transform", function (d) {
				return "translate(" + (barScale(d.pop_perc_2000) - dotSize/2) + "," + (barHeight/2 - dotSize/2) + ")";
			});
		
		//Make dots of the 2010 bars		
		barChart.selectAll(".city_2010")
			.transition().duration(1000)
			.style("fill-opacity", 1)
			.attr("rx",dotSize)
			.attr("ry",dotSize)
			.attr("width",dotSize)
			.attr("height",dotSize)
			.attr("transform", function (d) {
				return "translate(" + (barScale(d.pop_perc_2010) - dotSize/2) + "," + (barHeight/2 - dotSize/2) + ")";
			});
			
		//Create the lines between the 2000 and 2010 dots
		barChart.selectAll("line")
			.attr("x1", function(d) {return barScale(d.pop_perc_2000);})
			.attr("x2", function(d) {return barScale(d.pop_perc_2010);})
			.attr("y1", (barHeight/2))
			.attr("y2", (barHeight/2))
			.transition().duration(1000).delay(1000)
			.style("opacity", 1);

		//Create 50% line
		barWrappingOther.append("g")
			.append("line")
			.attr("class", "halfway-line")
			.attr("x1", (75+barScale(0.5)))
			.attr("x2", (75+barScale(0.5)))
			.attr("y1", 0)
			.attr("y2", (-barDimHeight + 20))
			.style("stroke-width", 1)
			.style("stroke","#AAAAAA")
			.style("stroke-dasharray", ("7, 4"))
			.style("opacity", 0);
		
		//Reshuffle in order of population %
		barChart.selectAll(".barWrapper")
			.style("visibility","visible")
			.transition().duration(1000).delay(2000)
			.attr("transform", function(d, i) { return "translate(75," + (5 + (d.rank_pop_perc - 1) * newBarHeight) + ")"; })

		//More urban growth expected	
		explanationText(varText = "<p>Even with the enormous shift of 200 million people moving towards cities within one decade, most countries still have far less than 50% of their total population living in a city</p>" +
								  "<p>Therefore, it is likely to assume that the next decades will see continuous urban growth</p>", 
						delay = delay, delayStep = 1);	
						
		//Show 50% line				
		barWrappingOther.select(".halfway-line")	
			.transition().duration(1000).delay(delay)
			.style("opacity", 1);
						
	}, delay*1);
	

	//////////////////////////////////////////////////////
	/////////////////// Change to GDP ////////////////////
	//////////////////////////////////////////////////////
	setTimeout(function() {	
	
		explanationText(varText = "<p>If combined with the change in income per capita, the relationship between urban and economic growth becomes visible</p>", 
					delay = delay, delayStep = 0);	
					
		explanationText(varText = "<p>While most countries have seen a more free migration towards cities, their GDP has grown between <span style='color: #858483;'>2000</span> and <span style='color: #DA6761;'>2010</span>.</p>" + 
								  "<p>One can only speculate about the possible economic growth if sustainable urbanization is understood and carefully planned</p>", 
					delay = delay, delayStep = 1);	
		
		//Remove the y-axis labels
		barChart.selectAll(".barLabels")
				.transition().duration(1000)
				.style("opacity", 0)
				.remove();
				
		//Remove 50% line
		barWrappingOther.select(".halfway-line")
			.transition().duration(1000)
			.style("opacity", 0)
			.remove();
			
		//Remove all countries with unknown GDP
		barChart.selectAll(".barWrapper")
			.filter(function(d) {return d.gdp_2000 == 0;})
			.transition().duration(1000)
			.style("opacity", 0)
			.remove();

		//Remove the y-component of the barWrapper transform		
		barChart.selectAll(".barWrapper")
			.transition().duration(1000).delay(1000)
			.attr("transform", "translate(75,0)");
			
		counter = 9;
		//Set the progress circles
		setCircleProgress(8);
			
		setTimeout(createScatter, 1000);
		
		//////////////////////////////////////////////////////
		///////////////////// Finish it //////////////////////
		//////////////////////////////////////////////////////
		
		//Make text disappear
		d3.select("#explanation")
			.transition().duration(1000).delay(delay*3)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
			});
			
		//Show the text & button on the right
		d3.select("#section")
			.transition().delay(delay*3)
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
		
	}, delay*4);
	

		
}//introUrbanScatter
