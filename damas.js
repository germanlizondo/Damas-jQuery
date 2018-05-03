$(document).ready(function() {
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var channels = 2;
	var frameCount = audioCtx.sampleRate * 2.0;
	var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);
	//columnas
	for(i = 1; i<= 9; i++) {
       
       if(i % 2 == 0) x=1;
       else{x=0;}
      
        $("#tablero").append("<div id=row-"+i+" class='row'></div>");
		//filas
        for (y = 1; y<=8; y++) {
            if(y % 2 == x) {
				//casilla_id
			casilla = 'row-' + i + '-col-' + y;
	
            $("#row-" + i).append("<div class='casellablanca' data-row= "+i+" data-col="+y+" id=" + casilla + "></div>");
            if( i <= 3 ) {
						//ficha blanca
                ficha_id = 'f1-' + 'row-' + i + '-col-' + y;
                $("#"+ casilla).append("<div class='blanca' id="+ ficha_id +"></div>");
            }
            if( i >= 7) {
						//ficha negra
                ficha_id = 'f2-' + 'row-' + i + '-col-' + y;
                $("#"+ casilla).append("<div class='negra' id="+ ficha_id +"></div>");
            }

           
           
            var seleccionat = true;
            $("#"+ casilla).click(function() {
                if(seleccionat){
                    $(this).css('background-color', 'red');
                    seleccionat = false;
                } 
                        else{
                            $(this).css('background-color', 'white');
                            seleccionat = true;
                        }
                      }); 
                    
     

            }
            else{
                $("#row-" + i).append("<div class='casellanegra'></div>");
        }
        
        }  
         
	}


 

//start drag and drop, La ficha es draggable
	$(".blanca").draggable({
		start: function () {
			//animacio al iniciar el drag
			$(this).animate({ width: '60px', height: '60px', borderRadius: '60px' });

		},
		
		stop: function () {
			//animacio al acabar el drag
			$(this).animate({ width: '40px', height: '40px' });
		}
	});
	$(".negra").draggable({
		start: function () {
			
			//animacio al iniciar el drag
			$(this).animate({ width: '60px', height: '60px', borderRadius: '60px'});

		},
		drag: function () {


		},
		stop: function () {
	//animacio al acabar el drag
			$(this).animate({ width: '40px', height: '40px' });
		}
	});

	var num_blancas=12;
	var num_negras=12;
	var moviments=0;
	
    
    //Per cada casella del tauler
	for(i = 1; i<= 9; i++) {
		for(y = 1; y <= 8; y++) {
			
			// Drop del drag and drop
			col_id = 'row-' + i + '-col-' + y;
			$("#" + col_id).droppable({
				drop: function(event, ui) {

				
				
					var row = parseInt($(this).attr("data-row"));
					var col = parseInt($(this).attr("data-col"));
					var row_previus = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
					var col_previus = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
					$(ui.draggable).appendTo($(this));
					moviments++;		
					$( "#contador").html("<h3>Moviments:"+moviments+"</h3><br><h3>Blancas:"+num_blancas+"</h3><br><h3>Negras:"+num_negras+"</h3>" );		
					if(ui.draggable.hasClass("blanca")) {
						if((row - 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row - 1) + "-col-" + col_;
							num_negras--;
						
							console.log("Negras:"+num_negras);
							$("#" + div_id).children().fadeOut();

							//Marcador
							$( "#contador").html("<h3>Moviments:"+moviments+"</h3><br><h3>Blancas:"+num_blancas+"</h3><br><h3>Negras:"+num_negras+"</h3>" );		
							for (var channel = 0; channel < channels; channel++) {
								var nowBuffering = myArrayBuffer.getChannelData(channel);

								for (var i = 0; i < frameCount; i++) {
									nowBuffering[i] = Math.random() * 2 - 1;

								}

							}
							var source = audioCtx.createBufferSource();
							source.buffer = myArrayBuffer;
							source.connect(audioCtx.destination);
							source.start();
						//	request.send();

						}
					} else {
						if((row + 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row + 1) + "-col-" + col_;
							num_blancas--;
							
							console.log("Blancas:"+num_blancas);
							$("#" + div_id).children().fadeOut();

							//Marcador
							$( "#contador").html("<h3>Moviments:"+moviments+"</h3><br><h3>Blancas:"+num_blancas+"</h3><br><h3>Negras:"+num_negras+"</h3>" );		
							for (var channel = 0; channel < channels; channel++) {
								var nowBuffering = myArrayBuffer.getChannelData(channel);

								for (var i = 0; i < frameCount; i++) {
									nowBuffering[i] = Math.random() * 2 - 1;

								}

							}
							var source = audioCtx.createBufferSource();
							source.buffer = myArrayBuffer;
							source.connect(audioCtx.destination);
							source.start();
						//	request.send();
						}
					}
				
				}

			});
		}
	}

	

//Marcador
	$( "#contador").html("<h3>Moviments:"+moviments+"</h3><br><h3>Blancas:"+num_blancas+"</h3><br><h3>Negras:"+num_negras+"</h3>" );		

    
    

	
	
});