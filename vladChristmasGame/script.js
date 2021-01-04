// let con = document.querySelector("#body");
// con.addEventListener("mousemove", ((e)=>{
//     var X = e.pageX; // положения по оси X
//     var Y = e.pageY; // положения по оси Y
//     console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
// }));

//FIXME
var sources = {
    christmasTree: 'christmasTreeSmall.png',

    christmasBallBlue: 'christmasBallBlue.png',
    christmasBallBlue_black: 'christmasBallBlue-black.png',
    christmasBallBlue_glow: 'christmasBallBlue-glow.png',

    christmasBallRed: 'christmasBallRed.png',
    christmasBallRed_black: 'christmasBallRed-black.png',
    christmasBallRed_glow: 'christmasBallRed-glow.png',

    elf: 'Elf.png',
    elf_black: 'Elf-black.png',
    elf_glow: 'Elf-glow.png',

    giftGreen: 'giftGreen.png',
    giftGreen_black: 'giftGreen-black.png',
    giftGreen_glow: 'giftGreen-glow.png',

    giftPink: 'giftPink.png',
    giftPink_black: 'giftPink-black.png',
    giftPink_glow: 'giftPink-glow.png',

    giftWhite: 'giftWhite.png',
    giftWhite_black: 'giftWhite-black.png',
    giftWhite_glow: 'giftWhite-glow.png',

    redStar: 'redStar.png',
    redStar_black: 'redStar-black.png',
    redStar_glow: 'redStar-glow.png',

    santaClausSleep: 'santaClausSleep.png',
    santaClausSleep_black: 'santaClausSleep-black.png',
    santaClausSleep_glow: 'santaClausSleep-glow.png',

    squirrel: 'squirrel.png',
    squirrel_black: 'squirrel-black.png',
    squirrel_glow: 'squirrel-glow.png',

    wreath: 'wreath.png',
    wreath_black: 'wreath-black.png',
    wreath_glow: 'wreath-glow.png',


};

loadImages(sources, initStage);

var width = window.innerWidth;
var height = window.innerHeight;

function loadImages(sources, callback) {
    const assetDir = 'assets/';
    let images = {};
    let loadedImages = 0;
    let numImages = 0;
    for (let src in sources) {
        numImages++;
    }
    for (let src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + sources[src];
    }
}
function isNearOutline(animal, outline) {
    var a = animal;
    var o = outline;
    var ax = a.x();
    var ay = a.y();

    if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
        return true;
    } else {
        return false;
    }
}
function drawBackground(background, christmasTreeImg, text) {
    var context = background.getContext();
    context.drawImage(christmasTreeImg, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'white');
    context.fillText(text, background.getStage().width() / 2, 40);
}

function initStage(images) {
    //FIXME
    var stage = new Konva.Stage({
        container: 'container',
        width: 1067,
        height: 705,
    });
    var background = new Konva.Layer();
    var animalLayer = new Konva.Layer();
    var animalShapes = [];
    var score = 0;

    // image positions
    //FIXME
    var animals = {
        christmasBallBlue: {
            x: 1000,
            y: 25,
        },
        christmasBallRed: {
            x: 1000,
            y: 90,
        },
        elf: {
            x: 985,
            y: 255,
        },

        giftGreen: {
            x: 850,
            y: 550,
        },
        giftPink: {
            x: 800,
            y: 260,
        },
        giftWhite: {
            x: 980,
            y: 550,
        },

        redStar: {
            x: 735,
            y: 530,
        },

        santaClausSleep: {
            x: 730,
            y: 380,
        },

        squirrel: {
            x: 740,
            y: 115,
        },

        wreath: {
            x: 850,
            y: 104,
        },
    };

    //FIXME
    var outlines = {
        christmasBallBlue_black: {
            x: 550,
            y: 365,
        },
        christmasBallRed_black: {
            x: 360,
            y: 390,
        },

        elf_black: {
            x: 640,
            y: 550,
        },

        giftGreen_black: {
            x: 460,
            y: 620,
        },
        giftPink_black: {
            x: 380,
            y: 635,
        },
        giftWhite_black: {
            x: 540,
            y: 600,
        },

        redStar_black: {
            x: 442,
            y: 110,
        },

        santaClausSleep_black: {
            x: 50,
            y: 600,
        },

        squirrel_black: {
            x: 300,
            y: 580,
        },

        wreath_black: {
            x: 275,
            y: 63,
        },
    };

    // create draggable animals
    for (var key in animals) {
        // anonymous function to induce scope
        (function () {
            var privKey = key;
            var anim = animals[key];

            var animal = new Konva.Image({
                image: images[key],
                x: anim.x,
                y: anim.y,
                draggable: true,
            });

            animal.on('dragstart', function () {
                this.moveToTop();
                animalLayer.draw();
            });
            /*
             * check if animal is in the right spot and
             * snap into place if it is
             */
            animal.on('dragend', function () {
                var outline = outlines[privKey + '_black'];
                if (!animal.inRightPlace && isNearOutline(animal, outline)) {
                    animal.position({
                        x: outline.x,
                        y: outline.y,
                    });
                    animalLayer.draw();
                    animal.inRightPlace = true;

                    //FIXME
                    if (++score >= 10) {
                        var text = 'You win! Enjoy your booty!';
                        drawBackground(background, images.christmasTree, text);
                    }

                    // disable drag and drop
                    setTimeout(function () {
                        animal.draggable(false);
                    }, 50);
                }
            });
            // make animal glow on mouseover
            animal.on('mouseover', function () {
                animal.image(images[privKey + '_glow']);
                animalLayer.draw();
                document.body.style.cursor = 'pointer';
            });
            // return animal on mouseout
            animal.on('mouseout', function () {
                animal.image(images[privKey]);
                animalLayer.draw();
                document.body.style.cursor = 'default';
            });

            animal.on('dragmove', function () {
                document.body.style.cursor = 'pointer';
            });

            animalLayer.add(animal);
            animalShapes.push(animal);
        })();
    }

    // create animal outlines
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

            animalLayer.add(outline);
        })();
    }

    stage.add(background);
    stage.add(animalLayer);

    drawBackground(
        background,
        images.christmasTree,
        'Ahoy! Put the animals on the room!'
    );
}