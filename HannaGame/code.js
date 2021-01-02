var StartTimer = 0;

function buttoninit(){

    location.reload();
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

}


/*function stopTimer() {
    var minutesLabel = document.getElementById("minutes").value;
    var secondsLabel = document.getElementById("seconds").value;
    var StartTimer = setInterval(setTime, 1000);

    function setTime()
        {
            totalSeconds+0;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
  
}*/



$(function(){
    var allThings = 0;
    var sec = 0;
    var stop = false;
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");

//Stop timer--------------------------------------------------------    
    
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

