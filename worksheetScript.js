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
		
		var numberA = $('#numberAId').val();
		var numberB = $('#numberBId').val();  
		var operator = $('#operatorId').val();
		
		var rect = canvas.getBoundingClientRect();	
		console.log("The bounding rectangle coordinates are L: " + rect.left 
			+ ", R: " + rect.right + ", T: " +rect.top +  ", B: " + rect.bottom);
        var x = Math.round(event.clientX - rect.left);
        var y = Math.round(event.clientY - rect.top);
		console.log("The mouse click coordinates calculated according to canvas is " + x + " and " + y);

		var clickedAt = new Coordinate(x,y);
		
        var context = canvas.getContext("2d");
        context.font = "30pt Calibri";
        context.textAlign="right";
        context.fillText(numberA, clickedAt.x, clickedAt.y);
		context.fillText(numberB, clickedAt.x, clickedAt.y+30);
		context.fillText("-----", clickedAt.x, clickedAt.y+50);
		context.fillText("-----", clickedAt.x, clickedAt.y+75);
		context.fillText(operator,clickedAt.x+30, clickedAt.y+15);	
	}


});