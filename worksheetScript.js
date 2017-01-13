	function myFunction() {alert('hi');} 
	

$(function() {
	
	alert("this works");
   
	var canvas = $('#myCanvas').get(0);	
	var coordinate = {
		x : 0,
		y : 0
	}

/*
	function isNumber(n) {
 //   	return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
*/
	
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
		
		addContent(event) ;
		
	}
	
	function addContent(event) {
		
		var numberA = $('#numberAId').val();
		var numberB = $('#numberBId').val();  
		var operator = $('#operatorId').val();
		
		var rect = canvas.getBoundingClientRect();	

        coordinate.x = Math.round(event.clientX - rect.left);
        coordinate.y = Math.round(event.clientY - rect.top);
        var context = canvas.getContext("2d");
        context.font = "30pt Calibri";
        context.textAlign="right";
        context.fillText(numberA, coordinate.x, coordinate.y);
		context.fillText(numberB, coordinate.x, coordinate.y+30);
		context.fillText("-----", coordinate.x, coordinate.y+50);
		context.fillText("-----", coordinate.x, coordinate.y+75);
		context.fillText(operator, coordinate.x+30, coordinate.y+15);	
	}

	$('#doneId').click( function() {
		
		console.log("Add to Image button clicked");
		
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
	 	
	});
	
	$('#myCanvas').click(function(event){
		
		validateAndWrite(event);
	
		
	});


});