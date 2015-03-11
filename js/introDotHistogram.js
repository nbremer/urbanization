///////////////////////////////////////////////////////////////////////////
/////////////////////// Introduce Dot Histogram ///////////////////////////
///////////////////////////////////////////////////////////////////////////	


function introDotHistogram() {

	modus = "Dot";
	firstDot = true;
	
	setTimeout(function() {counter = 6;}, 1000);

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Reset the progress bar
	resetProgressBar();
	
	//Set the progress circles
	setCircleProgress(5);

	//Remove the text & button on the right
	d3.select("#section")
		.style("opacity",0)
		.style("visibility","hidden");
	
	
	//Remove the bar chart to the right - if present
	barChart.selectAll("g")
		.transition().duration(500)
		.style("opacity",0)
		.call(endall, function() {
			barChart.selectAll("g")
				.remove();
		});
	barWrappingOther.selectAll("g")
		.transition().duration(500)
		.style("opacity",0)
		.call(endall, function() {
			barWrappingOther.selectAll("g")
				.remove();
		});
	
	//Remove all slope elements with transition
	slopes.selectAll(".slopes")
		.transition().duration(500)
		.style("opacity", 0)
		.call(endall, function() {
				slopes.selectAll(".slopes").remove();
		});

	text2000.selectAll("text")
		.transition().duration(500)
		.style("opacity", 0)
		.call(endall, function() {
				text2000.selectAll("text").remove();
		});

	text2010.selectAll("text")
		.transition().duration(500)
		.style("opacity", 0)
		.call(endall, function() {
				text2010.selectAll("text").remove();
		});

	slopeTitles.selectAll("text")
		.transition().duration(500)
		.style("opacity", 0)
		.call(endall, function() {
				slopeTitles.selectAll("text").remove();
		});		
		
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////
	
	var delay = 5000;

	//Start the progress bar
	runProgressBar(delay*7);	
	
	//////////////////////////////////////////////////////
	//////////////////// Introduction ////////////////////
	//////////////////////////////////////////////////////

	setMouseDot("remove");
	//Create the slopegraph
	setTimeout(function () {rVar = "pop"; dotHistogram();}, delay*0.1);
	//Deactivate the mouse over events
	setTimeout(function() {setMouseDot("remove");}, (delay*0.5));
	
	d3.select("#explanation")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.style("top", 300 + "px")
					.style("left", 600 + "px")
					.style("width", 350 + "px")
					.html("<p>Looking at the urban population growth we find that many cities have seen an enormous growth in their population between <span style='color: #858483;'>2000</span> and <span style='color: #DA6761;'>2010</span></p>");	
		})
		.transition().duration(1000)
		.style("opacity",1);

		
	/*
	var cityType = d3.scale.ordinal()
			.range(["#63A69F","#F2836B","#cb181d"])
			.domain(["Contained","Spillover","Fragmented"]);
	cities2010.selectAll(".city_2010")
		.style("fill", function(d) {return cityType(d.boundary);})
		.style("fill-opacity", 1);
		
	var countryType = d3.scale.ordinal()
			.range(["#fcbba1","#fb6a4a","#cb181d","#67000d"])
			.domain(["low-income","lower-middle-income","upper-middle-income","high-income"]);
	cities2010.selectAll(".city_2010")
		.style("fill", function(d) {return countryType(d.type_country);})
		.style("fill-opacity", 1);
	*/

	//////////////////////////////////////////////////////
	/////////////////// Density decline //////////////////
	//////////////////////////////////////////////////////
	
	explanationText(varText = "<p>The urban population density has seen both large increase and decline</p>" + 
							  "<p>However, 94% of the cities that saw a density decline are in China. This could be caused by the phenomenon of 'Ghost cities' and rising incomes</p> ", 
							  delay = delay, delayStep = 1.75);	
	setTimeout(function () {rVar = "density"; totalDensityDotHisto();}, delay*1.75);
	//Deactivate the mouse over events
	setTimeout(function() {setMouseDot("remove");}, (delay*2));
	setTimeout(function () {
		cities2010.selectAll(".city_2010")
			.on("mouseover", null)
			.on("mouseout", null)
			.transition().duration(1000)
			.style("fill-opacity", function(d) {
				if (d.country == "China" & d.density_growth < 0) return 1;
				else return 0.2;
			});
	}, delay*2.5)
	d3.select("#popButton").classed("active",false);
	d3.select("#landButton").classed("active",false);
	d3.select("#densButton").classed("active",true);

	//////////////////////////////////////////////////////
	////////////////// Density low income ////////////////
	//////////////////////////////////////////////////////
	
	explanationText(varText = "Practically the entire area of highest density growth comes from low & low-middle income countries (World Bank 2014) with populations that usually migrate freely", 
					delay = delay, delayStep = 4);		
	setTimeout(function () {
		cities2010.selectAll(".city_2010")
			.transition().duration(1000)
			.style("fill-opacity", function(d) {
				if (d.type_country == "low-income" | d.type_country == "lower-middle-income") return 1;
				else return 0.2;
			});
	}, delay*4)

	//////////////////////////////////////////////////////
	////////////////// Density challenge /////////////////
	//////////////////////////////////////////////////////
	
	explanationText(varText = "<p>Creating the right kind of density and distribution of housing, work locations, transport and parks is a major challenge for these cities</p>", 
					delay = delay, delayStep = 5.5);			
	
	//////////////////////////////////////////////////////
	///////////////////// Finish it //////////////////////
	//////////////////////////////////////////////////////
	
	//Make text disappear
	d3.select("#explanation")
		.transition().duration(1000).delay(delay*7)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanation")
				.style("visibility","hidden");
		});
		
	setTimeout(function() {
		//Set cities back to full opacity
		//Resert mouseover event
		cities2010.selectAll(".city_2010")
			.on("mouseover", showOneDot)
			.on("mouseout", showAllDot)
			.transition().duration(2000)
			.style("fill-opacity", 1);
			
		//Show the text & button on the right
		d3.select("#section")
			.transition()
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
			
		counter = 7;
		//Set the progress circles
		setCircleProgress(6);

		//Show bar chart again
		initiateBarChart();
	}, delay*7);
	
		
}//function introDotHistogram


//Activate or deactivate the mouse events
function setMouseDot(setting) {
	
	var overSlope = (setting == "remove" ? null : showOneDot);
	var outSlope = (setting == "remove" ? null : showAllDot);
		
	cities2010.selectAll(".city_2010")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);
}//setMouseDot
