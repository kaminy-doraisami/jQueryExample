	function myFunction() {alert('hi');} 
	

$(function() {
	
	alert("this works");
   
	var canvas = $('#myCanvas').get(0);	
	function Coordinate (x,y) {
		this.x = Math.round(x);
		this.y = Math.round(y);
	}

/*
	function isNumber(n) {
 //   	return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
*/
	$('#myCanvas').click(function(event){
		
		console.log("Canvas clicked");
		validateAndWrite(event);	
		
	});
	
	$('#hideId').click(function(){
        $("#leftDivId").hide();
        $("#rightDivId").hide();       
        $("#bannerDivId").width(1000);             
	});
	
	function validateAndWrite(event) {
		
		var numberA = $('#numberAId').val();
		var numberB = $('#numberBId').val();    
		
		if (numberA === "" && numberB === "") {
			alert("Numbers are blank. Please enter numbers and click on the image");
			return false;
		}
		
		if (numberA === "") {
			alert("Number A is blank. Please enter a number.");
			return false;
		} 
		
		if(numberB === "") {
			alert("Number B is blank. Please enter a number");
			return false;
		}

		//TODO: explain the regex.
		/* Test if numbers are numeric */
		if (/\D/.test(numberA)) {
			alert(numberA + " is not a number. Please enter a valid number for A." );
			$('#numberAId').focus() ;
			return false; 
		}
	 
		if (/\D/.test(numberB)) {
			alert(numberB + " is not a number. Please enter a valid number for B." );
			$('#numberBId').focus() ;
			return false; 
		}
		console.log("Numbers validated. Calling writeOnCanvas() ");
		writeOnCanvas(event) ;
		
	}
	
	function writeOnCanvas(event) {
		
		var clickedAt = findCoordinate(event);
		
		var numberA = $('#numberAId').val();
		var numberB = $('#numberBId').val();  
		var operator = $('#operatorId').val();
		var myFontSize = $('#fontSizeId').val();
		
		var lengthOfLongerNum = Math.max(numberA.length,numberB.length);
		var line = getLine(lengthOfLongerNum);
		
		var delta = Math.abs(numberA.length-numberB.length);
		var zeroPadding = getZeroPadding(delta);
		
        var context = canvas.getContext("2d");
        context.font = myFontSize + "pt Calibri";
        context.textAlign="left";
		
		if (numberA.length > numberB.length) {
			context.fillText(numberA, clickedAt.x, clickedAt.y);
			console.log("Padding B with zeroes <>" + zeroPadding+numberB + "<>");
			context.fillText(zeroPadding+numberB, clickedAt.x, clickedAt.y+Number(myFontSize));		
		} else {
			console.log("Padding A with zeroes <>" + zeroPadding+numberA + "<>");
			context.fillText(zeroPadding+numberA, clickedAt.x, clickedAt.y);
			context.fillText(numberB, clickedAt.x, clickedAt.y+Number(myFontSize));					
		}
		context.fillText(line, clickedAt.x, clickedAt.y+(myFontSize*1.25));
		context.fillText(line, clickedAt.x, clickedAt.y+(myFontSize*2.5));
		context.fillText(operator,clickedAt.x+(lengthOfLongerNum*Number(myFontSize/1.5)), clickedAt.y+Number(myFontSize/2));	
	}
	
	function findCoordinate(event) {
		
		/* Get the rectangle coordinates of the canvas*/
		var rect = canvas.getBoundingClientRect();
		
		console.log("Bounding rectangle coordinates are L: " + rect.left 
			+ ", R: " + rect.right + ", T: " +rect.top +  ", B: " + rect.bottom);
		
		/* 
		   clientX and clientY will return coordinates wrt to the top of the page and not wrt the canvas.
		   Calculate the x,y coordinates of the mouse click event wrt the canvas.
		*/	
        var x = Math.round(event.clientX - rect.left);
        var y = Math.round(event.clientY - rect.top);
		
		console.log("Mouse click coordinates: (" + x + ", " + y + ")");
		
		return new Coordinate(x,y);		
		
	}
	
	function getLine(lengthOfLine) {
		
		var line = "";
		for (i=0; i < lengthOfLine; i++) {
			line = line + "_";
		};
		return line;
			
	}
	
	function getZeroPadding(lengthOfPadding) {
		
		var zeroPadding = "";
		for (i=0; i < lengthOfPadding; i++) {
			zeroPadding = zeroPadding + "0";
		}
		console.log("Padding is " + zeroPadding.length);
		return zeroPadding;
	}


});