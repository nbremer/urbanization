///////////////////////////////////////////////////////////////////////////
//////////////////////////// Slopegraph Intro /////////////////////////////
///////////////////////////////////////////////////////////////////////////	


function introSlope() {
	
	setTimeout(function() {counter = 4;}, 1000);
	
	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Reset the progress bar
	resetProgressBar();

	//Set the progress circles
	setCircleProgress(3);
	
	//Remove the text & button on the right
	d3.select("#section")
		.transition().duration(500)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","hidden");
		});
	
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

	//Remove previous slope elements
	slopes.selectAll(".slopes").remove();
	text2000.selectAll("text").remove();
	text2010.selectAll("text").remove();
	slopeTitles.selectAll("text").remove();

	//Remove color setting from dot-plot
	cities2010.selectAll(".city_2010")
		.style("fill", null)
		.style("fill-opacity", 0.8);
		
	//Remove dot histogram axis
	dotWrapper.selectAll("g").remove();
	dotWrapper.selectAll("text").remove();
	
	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////
	
	var delay = 5000;

	//Start the progress bar
	runProgressBar(delay*4.75);	
	
	//////////////////////////////////////////////////////
	//////////////////// Introduction ////////////////////
	//////////////////////////////////////////////////////

	//Create the slopegraph
	setTimeout(function () {rVar = "pop"; initiateSlopeGraph();}, delay*0.1);
	rVar = "pop"; 
	d3.select("#popButton").classed("active",true);
	d3.select("#landButton").classed("active",false);
	d3.select("#densButton").classed("active",false);
	
	d3.select("#explanation")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.style("top", 300 + "px")
					.style("left", 600 + "px")
					.style("width", 350 + "px")
					.html("<p>We can take a closer look at the absolute changes of these cities</p> <p>Here we see the urban population in <span style='color: #858483;'>2000</span> on the left and in <span style='color: #DA6761;'>2010</span> on the right</p>");	
		})
		.transition().duration(1000)
		.style("opacity",1);
		
	//Deactivate the mouse over events
	setTimeout(function() {setMouseSlope("remove");}, (delay*0.25));
	
	//////////////////////////////////////////////////////
	///////////////// Pearl River Delta //////////////////
	//////////////////////////////////////////////////////
	explanationText(varText = "Again it becomes apparent how fast the Pearl River Delta has grown during this decade", delay = delay, delayStep = 1.5);	

	//Show only one slope
	//setTimeout(function() {oneSlope(1, delay);}, (delay*2));
	
	//////////////////////////////////////////////////////
	///////////////// Population Density /////////////////
	//////////////////////////////////////////////////////

	explanationText(varText = "Or we can look at population density", delay = delay, delayStep =2.3);	

	//Change to a density slopegraph
	setTimeout(totalDensitySlopeGraph, delay*2.4);
	//Deactivate the mouse over events
	setTimeout(function() {
		setMouseSlope("remove"); 
		
		totalDensityBarGraph();
		d3.select("#popButton").classed("active",false);	
		d3.select("#densButton").classed("active",true);
	
	}, (delay*2.4));
	
	//////////////////////////////////////////////////////
	////////////////////// Indonesia /////////////////////
	//////////////////////////////////////////////////////

	//explanationText(varText = "Practically all cities in Indonesia saw an increase in their average urban population density", delay = delay, delayStep = 3.5);	
	setTimeout(function() {oneCountrySlope("Indonesia", delay)},(delay*3.25))
	explanationText(varText = "<p>Urban population density in Indonesia jumped from 7400 people per sq. km in <span style='color: #858483;'>2000</span> to 9400 in <span style='color: #DA6761;'>2010</span>, an increase of almost 30%!</p>" +
							  "<p>This is most likely due to constraints in investment in urban infrastructure and housing</p>", 
							  delay = delay, delayStep = 2.75);	
		
	//////////////////////////////////////////////////////
	/////////////// How many down and up /////////////////
	//////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////
	///////////////////// Finish it //////////////////////
	//////////////////////////////////////////////////////
	
	//Make text disappear
	d3.select("#explanation")
			.transition().duration(1000).delay(delay*4.75)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
			});
			
	
	//Show the text & button on the right
	/*
	d3.select("#section")
		.transition().delay(delay*4.75)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");
		})
		.transition().duration(1500)
		.style("opacity",1);
	*/
	
	//Show the text & button on the right
	d3.select("#section")
		.transition().delay(delay*4.75)
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
	
	setTimeout(function() {
		counter = 5;
		//Set the progress circles
		setCircleProgress(4);
		//Set mouse over again
		setMouseSlope("initiate");
		//Draw full slopegraph again
		totalDensitySlopeGraph();
		//Show bar chart again
		initiateBarChart();
	}, delay*4.8);
	
		
}//introSlope

//Activate or deactivate the mouse events
function setMouseSlope(setting) {
	
	var overSlope = (setting == "remove" ? null : showOne);
	var outSlope = (setting == "remove" ? null : showAll);
	
	cities2000.selectAll(".city_2000")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);
		
	cities2010.selectAll(".city_2010")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);
	
	slopes.selectAll(".slopes")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);
		
	text2000.selectAll("text")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);
		
	text2010.selectAll("text")
		.on("mouseover", overSlope)
		.on("mouseout", outSlope);	
}//setMouseSlope

function oneSlope(rank, delay) {
		//Show only one slope
	cities2000.selectAll(".city_2000")
		.transition().duration(1000)
		.style("fill-opacity", function(d) {
			if (d.rank_pop != rank) return 0;});
		
	cities2010.selectAll(".city_2010")
		.transition().duration(1000)
		.style("fill-opacity", function(d) {
			if (d.rank_pop != rank) return 0;});
	
	slopes.selectAll(".slopes")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.rank_pop != rank) return 0;
			else return 0.4});
		
	text2000.selectAll("text")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.rank_pop != rank) return 0;
			else return 0.7;});
		
	text2010.selectAll("text")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.rank_pop != rank) return 0;
			else return 0.7;});
			
	//Show all slopes again
	cities2000.selectAll(".city_2000")
		.transition().duration(1000).delay(delay*1.25)
		.style("fill-opacity", 0.8);
		
	cities2010.selectAll(".city_2010")
		.transition().duration(1000).delay(delay*1.25)
		.style("fill-opacity", 0.8);
	
	slopes.selectAll(".slopes")
		.transition().duration(1000).delay(delay*1.25)
		.style("opacity", 0.4);
		
	text2000.selectAll("text")
		.transition().duration(1000).delay(delay*1.25)
		.style("opacity", function(d) {
			if (d.rank_pop <= 10) return 0.7;
			else return 0;});
		
	text2010.selectAll("text")
		.transition().duration(1000).delay(delay*1.25)
		.style("opacity", function(d) {
			if (d.rank_pop <= 10) return 0.7;
			else return 0;});
	
}//oneSlope

function oneCountrySlope(country, delay) {
	//Show one specific country
	cities2000.selectAll(".city_2000")
		.transition().duration(1000)
		.style("fill-opacity", function(d) {
			if (d.country != country) return 0;});
		
	cities2010.selectAll(".city_2010")
		.transition().duration(1000)
		.style("fill-opacity", function(d) {
			if (d.country != country) return 0;});
		
	slopes.selectAll(".slopes")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.country != country) return 0;
			else return 0.4;});
		
	text2000.selectAll("text")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.country != country) return 0;
			else return 0.7;});
		
	text2010.selectAll("text")
		.transition().duration(1000)
		.style("opacity", function(d) {
			if (d.country != country) return 0;
			else return 0.7;});
	
}//oneCountrySlope