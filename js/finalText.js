///////////////////////////////////////////////////////////////////////////
/////////////////////// Text at the introduction //////////////////////////
///////////////////////////////////////////////////////////////////////////	

function finalText() {
	
	modus = "final";

	//De-activate the continue button
	d3.select("#clickerFront").classed("activeButton",false);	
	d3.select("#clickerFront").classed("inactiveButton",true);	
	d3.select("#clickerFront").html("Finish");	

	setTimeout(function() {counter = 10;}, 1000);

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////
	
	//Remove all elements of startBarChart (if present)
	startBarChart.selectAll("g").remove();
	
	//Set the progress circles
	setCircleProgress(9);

	//Reset the progress bar
	resetProgressBar();

	d3.select("#section")
		.style("opacity",0)
		.style("visibility","hidden");
		
	//Remove the bar chart to the right - if present
	barChart.selectAll("g")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			barChart.selectAll("g")
				.remove();
		});
	barWrappingOther.selectAll("g")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			barWrappingOther.selectAll("g")
				.remove();
		});
	
	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");
	d3.select("#callOutCountryWrapper").style("visibility","hidden");

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
		.style("top", 175 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		.html("<p>Urbanization is a key process in ending extreme poverty and boosting shared prosperity. In the coming decades, urban areas will be where millions of East Asians will have the chance to leave extreme poverty behind and thrive</p>" +
			  "<p>However, urban expansion, if not well planned, can also exacerbate inequality in access to services, employment, and housing. " +
			  "It is for this reason we face a rising need to invest in research to define the success factors for well planned urbanisation</p>" + 
			  "<p>The choices that are made now may influence the lives of millions in the future: help build the 'new urban society'!</p>")
		.transition().duration(2000).delay(1000)
		.style("opacity",1);

	//Show the intro explanation 
	d3.select("#explanationIntro")
		.style("opacity",0)
		.style("visibility","visible")
		.style("top", 525 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		.html("Press the circles that correspond to <br> map | slope | histogram | scatter <br> in the bottom to jump back to the intermediary views")	
		.transition().duration(2000).delay(1000)
		.style("opacity",1);
	
}//finalText
