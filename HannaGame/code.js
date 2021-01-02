var StartTimer = 0;

function buttoninit(){

    location.reload();
};


function Demo() {

    $("#lamp1_element").css("opacity", "0");
   $("#lamp2_element").css("opacity", "0");
   $("#lamp3_element").css("opacity", "0");
   $("#lamp4_element").css("opacity", "0");
   $("#lamp5_element").css("opacity", "0");
   $("#lamp6_element").css("opacity", "0");
   $("#lamp7_element").css("opacity", "0");
   $("#lamp8_element").css("opacity", "0");
   $("#lamp9_element").css("opacity", "0");

  document.getElementById("lamp1_element").setAttribute("class","animation_1");
  setTimeout(function(){
    $("#lamp1_placeholder").css("opacity", "1");},2100);

   document.getElementById("lamp2_element").setAttribute("class","animation_2");
   setTimeout(function(){
    $("#lamp2_placeholder").css("opacity", "1");},1800);

   document.getElementById("lamp3_element").setAttribute("class","animation_3");
   setTimeout(function(){
    $("#lamp3_placeholder").css("opacity", "1");},1100);

   document.getElementById("lamp4_element").setAttribute("class","animation_4");
   setTimeout(function(){
    $("#lamp4_placeholder").css("opacity", "1");},900);

   document.getElementById("lamp5_element").setAttribute("class","animation_5");
   setTimeout(function(){
    $("#lamp5_placeholder").css("opacity", "1");},2000);

   document.getElementById("lamp6_element").setAttribute("class","animation_6");
   setTimeout(function(){
    $("#lamp6_placeholder").css("opacity", "1");},2000);

   document.getElementById("lamp7_element").setAttribute("class","animation_7");
   setTimeout(function(){
    $("#lamp7_placeholder").css("opacity", "1");},2000);

   document.getElementById("lamp8_element").setAttribute("class","animation_8");
   setTimeout(function(){
    $("#lamp8_placeholder").css("opacity", "1");},1100);

    document.getElementById("lamp9_element").setAttribute("class","animation_9");
   setTimeout(function(){
   $("#lamp9_placeholder").css("opacity", "1");},2000);



   setTimeout(function(){
    ReDemo();
   },3000);
};



function ReDemo(){
   document.getElementById("lamp1_element").classList.remove("animation_1");
   document.getElementById("lamp2_element").classList.remove("animation_2");
   document.getElementById("lamp3_element").classList.remove("animation_3");
   document.getElementById("lamp4_element").classList.remove("animation_4");
   document.getElementById("lamp5_element").classList.remove("animation_5");
   document.getElementById("lamp6_element").classList.remove("animation_6");
   document.getElementById("lamp7_element").classList.remove("animation_7");
   document.getElementById("lamp8_element").classList.remove("animation_8");
   document.getElementById("lamp9_element").classList.remove("animation_9");

  
   $("#lamp1_placeholder").css("opacity", "0");
   $("#lamp2_placeholder").css("opacity", "0");
   $("#lamp3_placeholder").css("opacity", "0");
   $("#lamp4_placeholder").css("opacity", "0");
   $("#lamp5_placeholder").css("opacity", "0");
   $("#lamp6_placeholder").css("opacity", "0");
   $("#lamp7_placeholder").css("opacity", "0");
   $("#lamp8_placeholder").css("opacity", "0");
   $("#lamp9_placeholder").css("opacity", "0");


   $("#lamp1_element").css("opacity", "1");
   $("#lamp2_element").css("opacity", "1");
   $("#lamp3_element").css("opacity", "1");
   $("#lamp4_element").css("opacity", "1");
   $("#lamp5_element").css("opacity", "1");
   $("#lamp6_element").css("opacity", "1");
   $("#lamp7_element").css("opacity", "1");
   $("#lamp8_element").css("opacity", "1");
   $("#lamp9_element").css("opacity", "1");
  
};


function timer(){
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
$("#start").css("display", "none");
$(".part1").css("display", "grid");
$(".part2").css("display", "grid");

StartTimer = setInterval(setTime, 1000);
var totalSeconds = 0;

        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
   
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
};



$(function(){
    var allThings = 0;
	var sec = 0;
	var stop = false;

    
    $( init );

    function init(){
        allThings = 0;
        $('#done').hide();
        
		Draggable.create("#lamp1_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp1_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp1_placeholder").css("opacity", "1");
                    allThings=allThings+1;
                    console.log(allThings);
                }
                if(allThings === 9){
					this.stop = true;
					clearInterval(StartTimer);
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
		
		Draggable.create("#lamp2_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp2_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp2_placeholder").css("opacity", "1");
                   allThings=allThings+1;
                    console.log(allThings);
                }
              if(allThings === 9){
				  this.stop = true;
				  clearInterval(StartTimer);
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '100px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
		
       Draggable.create("#lamp3_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp3_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp3_placeholder").css("opacity", "1");
                   allThings=allThings+1;
                    console.log(allThings);
                }
               if(allThings === 9){
				   this.stop = true;
				   clearInterval(StartTimer);
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
		Draggable.create("#lamp4_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp4_placeholder"))
                {
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp4_placeholder").css("opacity", "1");
                   allThings=allThings+1;
                    console.log(allThings);
                }
                if(allThings === 9)
                {
					this.stop = true;
					clearInterval(StartTimer);
                    $('#done').show();
                    $('#done').animate(
                    {
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
		Draggable.create("#lamp5_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp5_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp5_placeholder").css("opacity", "1");
                  allThings=allThings+1;
                    console.log(allThings);
                }
                 if(allThings === 9){
                 	clearInterval(StartTimer);
					 this.stop = true;
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
        Draggable.create("#lamp6_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp6_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp6_placeholder").css("opacity", "1");
                 allThings=allThings+1;
                    console.log(allThings);
                }
               if(allThings === 9){
               	clearInterval(StartTimer);
				   this.stop = true;
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
     Draggable.create("#lamp7_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp7_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp7_placeholder").css("opacity", "1");
                 allThings=allThings+1;
                    console.log(allThings);
                }
                if(allThings === 9){
					this.stop = true;
					clearInterval(StartTimer);
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
	 
		 Draggable.create("#lamp8_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp8_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp8_placeholder").css("opacity", "1");
                 allThings=allThings+1;
                    console.log(allThings);
                }
                 if(allThings === 9){
                 	clearInterval(StartTimer);
					 this.stop = true;
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
		 Draggable.create("#lamp9_element", {
            onDragEnd: function(){
                if(this.hitTest("#lamp9_placeholder")){
                    TweenLite.to(this.target, 0.1, {opacity:0});
                    $("#lamp9_placeholder").css("opacity", "1");
                    allThings=allThings+1;
                    console.log(allThings);
                }
               if(allThings === 9){
               		clearInterval(StartTimer);
				   this.stop = true;
                    $('#done').show();
                    $('#done').animate({
                        left: '50%',
                        top: '50%',
                        width: '400px',
                        height: '100px',
                        opacity: 1
                    });
                };
            }
        });
     }; 
    
    
    
});


