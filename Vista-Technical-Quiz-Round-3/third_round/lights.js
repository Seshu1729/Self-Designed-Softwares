			function greenLight()
			{
				setTimeout(function(){
					ws=new WebSocket("ws://10.42.0.66:8888/ws");
				
					ws.onopen=function(event){ ws.send("QG") };
				} ,0);
				
			}
			function redLight()
			{
				setTimeout(function(){
				ws=new WebSocket("ws://10.42.0.66:8888/ws");
				
				ws.onopen=function(event){ ws.send("QR") };
				} ,0);
			}
