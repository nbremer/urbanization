///////////////////////////////////////////////////////////////////////////
/////////////////////// Text at the introduction //////////////////////////
///////////////////////////////////////////////////////////////////////////	

function introText() {
	
	modus = "intro";
	
	//De-activate the back button
	d3.select("#clickerBack").classed("inactiveButton",true);	
	d3.select("#clickerBack").classed("activeButton",false);
	//Change text of front button
	d3.select("#clickerFront").html("Start");

	setTimeout(function() {counter = 1;}, 1000);

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////
	
	//Remove all elements of startBarChart (if present)
	startBarChart.selectAll("g").remove();
	
	//Set the progress circles
	setCircleProgress(0);

	//Reset the progress bar
	resetProgressBar();

	d3.select("#section")
		.style("opacity",0)
		.style("visibility","hidden");
		
	//Remove the bar chart to the right - if present
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();
	
	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");

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
	
	//////////////////////////////////////////////////////
	///////////////////////// Map ////////////////////////
	//////////////////////////////////////////////////////
	
	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.transition().duration(2000)
		.style("stroke-opacity", 1)
		.style("fill-opacity", 0.5);
		
	//Start explanation about the World Bank
	d3.select("#explanation")
		.style("visibility","visible")
		.style("top", 200 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		.html("<p>Societies are shifting from having a rural nature to a more and more urban nature. We face the opportunity to set the course of urbanization on a more sustainable and equitable path</p>" +
			  "<p>This visualization is based on data on urbanization in East Asia between <span style='color: #858483;'>2000</span> and <span style='color: #DA6761;'>2010</span> collected by the World Bank. It aims to provide you with a clear view on the magnitude of changes that can happen in only one decade and challenges you to think about the impact on the following years<p>")
		.transition().duration(1000)
		.style("opacity",1);

	//Show the intro explanation 
	d3.select("#explanationIntro")
	d3.select("#explanationIntro")
		.style("visibility","visible")
		.style("top", 475 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		.html("Press Start to be taken through the complete story, or press the circles that correspond to <br> map | slope | histogram | scatter <br> to jump straight to the intermediary views")	
		.style("opacity",1);
	
}//introText
