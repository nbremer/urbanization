///////////////////////////////////////////////////////////////////////////
///////////////// Text surrounding the stepping circles ///////////////////
///////////////////////////////////////////////////////////////////////////	

function setStepper() {

	//////////////////////////////////////////////////////
	//////////////////////// Lines ///////////////////////
	//////////////////////////////////////////////////////
			
	var stepLines = svg.append("g").attr("class","lineWrapper");
	var boxWidth = 20,
		boxHeight = 38;
	var offsets_2 = document.getElementById('circle_2').getBoundingClientRect();	
	var offsets_4 = document.getElementById('circle_4').getBoundingClientRect();	
	var offsets_6 = document.getElementById('circle_6').getBoundingClientRect();	
	var offsets_8 = document.getElementById('circle_8').getBoundingClientRect();	
	
	//Map View
	/*stepLines.append("rect")
		.attr("class", "stepRect mapView")
		.attr("x", (offsets_2.left-4))
		.attr("y", (offsets_2.top-44))
		.attr("width", boxWidth)
		.attr("height", boxHeight);*/
		
	stepLines.append("line")
		.attr("class", "stepLine mapView")
		.attr("x1", (offsets_2.left + 5))
		.attr("x2", (offsets_2.left + 5))
		.attr("y1", (offsets_2.top - 23))
		.attr("y2", (offsets_2.top - 31));

	stepLines.append("text")
		.attr("class", "stepText mapView")
		.style("text-anchor", "middle")
		.attr("x", (offsets_2.left + 5))
		.attr("y", (offsets_2.top - 14))
		.text("map");

	//Slope View
	/*stepLines.append("rect")
		.attr("class", "stepRect slopeView")
		.attr("x", (offsets_4.left-4))
		.attr("y", (offsets_4.top-70))
		.attr("width", boxWidth)
		.attr("height", boxHeight);*/
		
	stepLines.append("line")
		.attr("class", "stepLine slopeView")
		.attr("x1", (offsets_4.left + 5))
		.attr("x2", (offsets_4.left + 5))
		.attr("y1", (offsets_4.top - 57))
		.attr("y2", (offsets_4.top - 49));

	stepLines.append("text")
		.attr("class", "stepText slopeView")
		.style("text-anchor", "middle")
		.attr("x", (offsets_4.left + 5))
		.attr("y", (offsets_4.top - 62))
		.text("slope");
		
	//Histogram View
	/*stepLines.append("rect")
		.attr("class", "stepRect histoView")
		.attr("x", (offsets_6.left-4))
		.attr("y", (offsets_6.top-44))
		.attr("width", boxWidth)
		.attr("height", boxHeight);*/
		
	stepLines.append("line")
		.attr("class", "stepLine histoView")
		.attr("x1", (offsets_6.left + 5))
		.attr("x2", (offsets_6.left + 5))
		.attr("y1", (offsets_6.top - 23))
		.attr("y2", (offsets_6.top - 31));

	stepLines.append("text")
		.attr("class", "stepText histoView")
		.style("text-anchor", "middle")
		.attr("x", (offsets_6.left + 5))
		.attr("y", (offsets_6.top - 14))
		.text("histogram");

	//Scatter View
	/*stepLines.append("rect")
		.attr("class", "stepRect scatterView")
		.attr("x", (offsets_8.left-4))
		.attr("y", (offsets_8.top-70))
		.attr("width", boxWidth)
		.attr("height", boxHeight);*/
		
	stepLines.append("line")
		.attr("class", "stepLine scatterView")
		.attr("x1", (offsets_8.left + 5))
		.attr("x2", (offsets_8.left + 5))
		.attr("y1", (offsets_8.top - 57))
		.attr("y2", (offsets_8.top - 49));

	stepLines.append("text")
		.attr("class", "stepText scatterView")
		.style("text-anchor", "middle")
		.attr("x", (offsets_8.left + 5))
		.attr("y", (offsets_8.top - 62))
		.text("scatter");

}//setStepper
