var width = window.innerWidth;
      var height = window.innerHeight;

      function loadImages(sources, callback) {
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
              callback(images);
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

      function initStage(images) {
        var stage = new Konva.Stage({
          container: 'container',
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

        // create draggable lands
        for (var key in lands) {
          // anonymous function to induce scope
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

        // create land outlines
        for (var key in outlines) {
          // anonymous function to induce scope
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

        stage.add(background);
        stage.add(landLayer);

        drawBackground(
          background,
          images.background_map,
          'Vitaj! Polož všetky územia na island!'
        );
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
      loadImages(sources, initStage);