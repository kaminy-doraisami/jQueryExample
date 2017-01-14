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
	
	function validateAndWrite(event) {
		
		var numberA = $('#numberAId').val();
		//TODO: explain the regex.
		if (/\D/.test(numberA)) {
			alert(numberA + " is not a number. Please enter a valid number for A." );
			$('#numberAId').focus() ;
			return false; 
		}
		
		var numberB = $('#numberBId').val();    
	 
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
		
        var context = canvas.getContext("2d");
        context.font = myFontSize + "pt Calibri";
        context.textAlign="right";
        context.fillText(numberA, clickedAt.x, clickedAt.y);
		context.fillText(numberB, clickedAt.x, clickedAt.y+Number(myFontSize));
		context.fillText("-----", clickedAt.x, clickedAt.y+(myFontSize*1.5));
		context.fillText("-----", clickedAt.x, clickedAt.y+(myFontSize*2.5));
		context.fillText(operator,clickedAt.x+Number(myFontSize), clickedAt.y+Number(myFontSize/2));	
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


});