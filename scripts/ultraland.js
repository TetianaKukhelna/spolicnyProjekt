$(document).ready(function(){
  var gameStillOn = true;
  var width = window.innerWidth;
  var height = window.innerHeight;

  function loadImages(sources, callback, demo) {
    var assetDir = 'img/ultraland/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].onload = function () {
        if (++loadedImages >= numImages) {
          callback(images, demo);
        }
      };
      images[src].src = assetDir + sources[src];
    }
  }

  function isNearOutline(land, outline) {
    var a = land;
    var o = outline;
    var ax = a.x();
    var ay = a.y();

    if (ax > o.x - 30 && ax < o.x + 30 && ay > o.y - 30 && ay < o.y + 30) {
      return true;
    } else {
      return false;
    }
  }

  function drawBackground(background, background_mapImg, text) {
    var context = background.getContext();
    context.drawImage(background_mapImg, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'white');
    context.fillText(text, background.getStage().width() / 2, 40);
  }

  function getNewPosition(land, outline){ //TU UPRAVIT
    if(land.attrs.x < outline.x){
      land.attrs.x += 10;
    }else{
      land.attrs.x -= 10;
    }

    if(land.attrs.y < outline.y){
      land.attrs.y += 10;
    }else{
      land.attrs.y -= 10;
    }
    return land;
  }

  function isNotPositionIn(land, outline){
    if(land.attrs.x - 25 <= outline.x && outline.x <= land.attrs.x + 25 && land.attrs.y - 25 <= outline.y && outline.y <= land.attrs.y + 25){
      land.attrs.x = outline.x;
      land.attrs.y = outline.y;
      return false;
    }
    return true;
  }

  function initStage(images, demo) {
    var stage = new Konva.Stage({
      container: 'ultraland',
      width: 1200,
      height: 600,
    });
    var background = new Konva.Layer();
    var landLayer = new Konva.Layer();
    var landShapes = [];
    var score = 0;

    // image positions
    var lands = {
      landA: {
        x: 5,
        y: 50,
      },
      landB: {
        x: 15,
        y: 40,
      },
      landC: {
        x: 10,
        y: 30,
      },
      landD: {
        x: 5,
        y: 60,
      },
      landE: {
        x: 5,
        y: 50,
      },
      landF: {
        x: 10,
        y: 40,
      },
      landG: {
        x: 15,
        y: 60,
      },
      landH: {
        x: 5,
        y: 50,
      },
      landI: {
        x: 10,
        y: 60,
      },
    };

    var outlines = {
      landA_black: {
        x: 126,
        y: 228,
      },
      landB_black: {
        x: 345,
        y: 178,
      },
      landC_black: {
        x: 487,
        y: 85,
      },
      landD_black: {
        x: 535,
        y: 193,
      },
      landE_black: {
        x: 570,
        y: 55,
      },
      landF_black: {
        x: 633,
        y: 143,
      },
      landG_black: {
        x: 663,
        y: 271,
      },
      landH_black: {
        x: 871,
        y: 173,
      },
      landI_black: {
        x: 818,
        y: 291,
      },
    };

    if(!demo){

      // create land outlines
      for (var key in outlines) {
        
        (function () {
          var imageObj = images[key];
          var out = outlines[key];

          var outline = new Konva.Image({
            image: imageObj,
            x: out.x,
            y: out.y,
          });

          landLayer.add(outline);
        })();
      }

      // create draggable lands
      for (var key in lands) {

        (function () {
          var privKey = key;
          var anim = lands[key];

          var land = new Konva.Image({
            image: images[key],
            x: anim.x,
            y: anim.y,
            draggable: true,
          });

          land.on('dragstart', function () {
            this.moveToTop();
            landLayer.draw();
          });
          /*
           * check if land is in the right spot and
           * snap into place if it is
           */
          land.on('dragend', function () {
            var outline = outlines[privKey + '_black'];
            if (!land.inRightPlace && isNearOutline(land, outline)) {
              land.position({
                x: outline.x,
                y: outline.y,
              });
              landLayer.draw();
              land.inRightPlace = true;

              if (++score >= 9) {
                var text = 'Vyhral si!';
                gameStillOn = false;
                drawBackground(background, images.background_map, text);
              }

              // disable drag and drop
              setTimeout(function () {
                land.draggable(false);
              }, 50);
            }
          });
          // make land glow on mouseover
          land.on('mouseover', function () {
            land.image(images[privKey + '_glow']);
            landLayer.draw();
            document.body.style.cursor = 'pointer';
          });
          // return land on mouseout
          land.on('mouseout', function () {
            land.image(images[privKey]);
            landLayer.draw();
            document.body.style.cursor = 'default';
          });

          land.on('dragmove', function () {
            document.body.style.cursor = 'pointer';
          });

          landLayer.add(land);
          landShapes.push(land);
        })();
      }

      stage.add(background);
      stage.add(landLayer);
      drawBackground(background,images.background_map,'Vitaj! Polož všetky územia na island!');
    }
    else if(demo){
      // create land outlines
      for (var key in outlines) {

        (function () {
          var imageObj = images[key];
          var out = outlines[key];

          var outline = new Konva.Image({
            image: imageObj,
            x: out.x,
            y: out.y,
          });

          landLayer.add(outline);
        })();
      }

      // create lands
      for (var key in lands) {

        (function () {
          var privKey = key;
          var anim = lands[key];
          var land = new Konva.Image({
            image: images[key],
            x: anim.x,
            y: anim.y,
            draggable: false,
          });

          if(key == "landA"){
            while(isNotPositionIn(land, outlines.landA_black)){
              land = getNewPosition(land, outlines.landA_black);
            }
          }
          else if(key == "landB"){
            while(isNotPositionIn(land, outlines.landB_black)){
              land = getNewPosition(land, outlines.landB_black);
            }
          }
          else if(key == "landC"){
            while(isNotPositionIn(land, outlines.landC_black)){
              land = getNewPosition(land, outlines.landC_black);
            }
          }
          else if(key == "landD"){
            while(isNotPositionIn(land, outlines.landD_black)){
              land = getNewPosition(land, outlines.landD_black);
            }
          }
          else if(key == "landE"){
            while(isNotPositionIn(land, outlines.landE_black)){
              land = getNewPosition(land, outlines.landE_black);
            }
          }
          else if(key == "landF"){
            while(isNotPositionIn(land, outlines.landF_black)){
              land = getNewPosition(land, outlines.landF_black);
            }
          }
          else if(key == "landG"){
            while(isNotPositionIn(land, outlines.landG_black)){
              land = getNewPosition(land, outlines.landG_black);
            }
          }
          else if(key == "landH"){
            while(isNotPositionIn(land, outlines.landH_black)){
              land = getNewPosition(land, outlines.landH_black);
            }
          }
          else if(key == "landI"){
            while(isNotPositionIn(land, outlines.landI_black)){
              land = getNewPosition(land, outlines.landI_black);
            }
          }
          /////////////
          landLayer.add(land);
          landShapes.push(land);
        })();
      }

      stage.add(background);
      stage.add(landLayer);
      drawBackground(background,images.background_map,'Ukážkové demo.');
    }

    
  }

  var sources = {

    background_map: 'bg.png',

    landA:        "islandA.png",   
    landA_black:     "islandA_bg.png",
    landA_glow:   "islandA_glow.png",

    landB:        "islandB.png",   
    landB_black:     "islandB_bg.png",
    landB_glow:   "islandB_glow.png",

    landC:        "islandC.png",   
    landC_black:     "islandC_bg.png",
    landC_glow:   "islandC_glow.png",

    landD:        "islandD.png",   
    landD_black:     "islandD_bg.png",
    landD_glow:   "islandD_glow.png",

    landE:        "islandE.png",   
    landE_black:     "islandE_bg.png",
    landE_glow:   "islandE_glow.png",

    landF:        "islandF.png",   
    landF_black:     "islandF_bg.png",
    landF_glow:   "islandF_glow.png",

    landG:        "islandG.png",   
    landG_black:     "islandG_bg.png",
    landG_glow:   "islandG_glow.png",

    landH:        "islandH.png",   
    landH_black:     "islandH_bg.png",
    landH_glow:   "islandH_glow.png",

    landI:        "islandI.png",   
    landI_black:     "islandI_bg.png",
    landI_glow:   "islandI_glow.png",

  };

  var timer = document.getElementById("timer");
  var date = new Date();
  var start;

  function refreshTimer(){
    
    setTimeout(function(){
      if(gameStillOn){
        date = new Date();
        var end = date.getTime();
        
        var tmp = end - start;
        tmp /= 1000; 
        var hours = tmp / (60*60);
        var mins = (tmp % (60*60)) / 60;
        var secs = tmp % (60);
        timer.innerHTML = "Timer: " + parseInt(hours) + "h " + parseInt(mins) + "m " + parseInt(secs) + "s";

        refreshTimer();
      }
    }, 1000);
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


  $("#start").on("click", function(){
    loadImages(sources, initStage, false);
    date = new Date();
    start = date.getTime();
    gameStillOn = true;
    refreshTimer();
  });

  $("#demo").on("click", function(){
    loadImages(sources, initStage, true);
    gameStillOn = false;
    refreshTimer();
  });
});