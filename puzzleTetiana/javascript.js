"use strict";
const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};
const getOffset = (el) => {
    const offset = el.getBoundingClientRect();
    return {
        top: offset.top - window.scrollY,
        left: offset.left - window.scrollX
    };
};
// const randomIntArrayInRange = (min, max, n = 1) => Array.from({length: n}, () => Math.floor(Math.random() * (max - min + 1)) + min);

// Де його можна розмістити, що є ціллю в цьому прикладі
class Droppable {
    constructor(el) {
        this.droppableEl = el;
    }

    // Його можна розмістити, коли елемент перетягування перетинає точку розміщення,
    // а відстань перетину менше половини ширини та висоти точки розміщення
    isDroppable(draggableEl) {
        const draggableOffset = getOffset(draggableEl);
        const droppableOffset = getOffset(this.droppableEl);
        const [draggableWidth, draggableHeight] = [
            draggableEl.offsetWidth,
            draggableEl.offsetHeight
        ];
        const [droppableWidth, droppableHeight] = [
            this.droppableEl.offsetWidth,
            this.droppableEl.offsetHeight
        ];
        return !(
            droppableOffset.left > draggableOffset.left + draggableWidth - draggableWidth / 2
            || droppableOffset.left + droppableWidth < draggableOffset.left + draggableWidth / 2
            || droppableOffset.top > draggableOffset.top + draggableHeight - draggableHeight / 2
            || droppableOffset.top + droppableHeight < draggableOffset.top + draggableHeight / 2);
    }
}

// Перетягується, що можна перетягнути в цьому прикладі
class Draggable {
    constructor(el) {
        this.draggableEl = el;
        this.draggie = new Draggabilly(el);
        this.originPos = Object.assign({}, this.draggie.position);
    }
}

let draggableBlocks = document.querySelectorAll(".block.draggable");
let targetBlocks = document.querySelectorAll(".block_abs.target");
const targetBlock = document.querySelector("#tar");
let block_game = document.querySelectorAll(".game");
let startBtn = document.querySelector("#start");
let demoBtn = document.querySelector("#demo");
const scoreNumber = document.querySelector(".score-number");
const timeLeftNumber = document.querySelector(".time-left-number");
const finalScoreDialog = document.querySelector("#final-score-dialog");
const DemoPic = document.querySelector("#demoPic");
const deMo = document.querySelector(".listen_demo");
// const finalScore = document.querySelector(".final-score");
const youWin = document.querySelector(".you-win");
const youLose = document.querySelector(".you-lose");
let draggables = Array.from(draggableBlocks).map((block) => new Draggable(block));
let droppables = Array.from(targetBlocks).map((block) => new Droppable(block));
let score = 0;
let win = false;
const SCOREINC = 10;
const WINSCORE = SCOREINC * targetBlocks.length;
const TIME = 30;
const INTERVAL = 600;
let timer;
let timeLeft = TIME;
// Дозволити перетягування
const enableBlocks = () => {
    draggables.forEach((draggable) => {
        draggable.draggableEl.removeAttribute("disabled");
    });
};
// Ніякого перетягування// когда ты уже перетащил и забирать элемент обратно нельзя
const disableBlocks = () => {
    draggables.forEach((draggable) => {
        draggable.draggableEl.setAttribute("disabled", "");
    });
};
// Порушити порядок цілей
// const shuffleTargets = () => {
//     const cardIndexes = Array.from(Array(targetBlocks.length).keys());
//     const shufferedIndexs = shuffle(cardIndexes);
//     targetBlocks.forEach((item, i) => item.style.setProperty("--order", shufferedIndexs[i]));
// };
// Цільовий набір випадкових розмірів і форм (фактична ситуація полягає в тому, що різні картинки)
// const setRandomSizes = (elements) => {
//     item.style.setProperty("--width");
//     item.style.setProperty("--border-radius");
//     // elements.forEach((item, i) => {
//     //     item.style.setProperty("--width", `${randomBlockWidths[i]}px`);
//     //     item.style.setProperty("--border-radius", `${randomBlockBorderRadiuses[i]}px`);
//     // });
// };
// Встановіть розмір точки перетягування
// const setRandomBlockSizes = () => {
//     setRandomSizes(draggableBlocks);
//     setRandomSizes(targetBlocks);
// };
// Покладіть перетягнутий предмет назад
const moveBack = (draggable) => {
    const draggableEl = draggable.draggableEl;
    draggableEl.classList.add("animated");
    draggableEl.style.left = `${draggable.originPos.x}`;
    draggableEl.style.top = `${draggable.originPos.y}`;
    draggableEl.addEventListener("transitionend", () => {
        draggableEl.classList.remove("animated");
    });
};
// Drop drag(Перетягніть перетягування)
const dropDown = (draggable, droppable) => {
    const draggableEl = draggable.draggableEl;
    draggableEl.setAttribute("transparent", "");
    const droppableEl = droppable.droppableEl;
    droppableEl.classList.add("dropped");
    droppableEl.firstChild.src = droppableEl.firstChild.src.replace("_siluet", "")
};
// Відстежуйте події перетягування
const listenDragEvent = () => {
    // [drag1, drag2, drag3, ...]
    draggables.forEach((draggable) => {
        const draggie = draggable.draggie;
        draggie.on("dragEnd", function () {
            const draggableElement = this.element;
            console.log(this.element)
            // Знайдіть відповідний цільовий елемент нашого елемента перетягування
            const dragId = parseInt(draggableElement.dataset.id);
            const correspondingDroppable = droppables[dragId - 1];
            // Якщо його можна поставити, поставте його та додайте точки,
            // інакше поверніть перетягнутий об'єкт на початкове місце
            if (correspondingDroppable.isDroppable(draggableElement)) {
                dropDown(draggable, correspondingDroppable);
                score += SCOREINC;
                console.log(score)
                // scoreNumber.textContent = `${score}`;
                winGameJudge();

            } else {
                moveBack(draggable);
                console.log("moveBack")
            }
        });
    });
};
// Відновіть усі перетягування та скинуті об'єкти
const recoverBlocks = () => {
    draggables.forEach((draggable) => {
        moveBack(draggable);
        const draggableEl = draggable.draggableEl;
        draggableEl.classList.remove("animated");
        draggableEl.removeAttribute("transparent");
    });
    droppables.forEach((droppable) => {
        const droppableEl = droppable.droppableEl;
        droppableEl.classList.remove("dropped");
    });
};
// Очистити всі дані
const cleanData = () => {
    recoverBlocks();
    // shuffleTargets();
    score = 0;
    timeLeft = TIME;
    win = false;
    // scoreNumber.textContent = `${score}`;
    timeLeftNumber.textContent = `${timeLeft}`;
    youWin.setAttribute("hidden", "");
    youLose.setAttribute("hidden", "");
};
// Почніть гру
const startGame = () => {
    enableBlocks();
    timer = setInterval(() => {
        timeLeft--;
        timeLeftNumber.textContent = `${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
};
// Кінець гри
const endGame = () => {
    disableBlocks();
    showFinalScore();
    // startBtn.removeAttribute("transparent");
    // startBtn.disabled = false
};
// Якщо необхідний рахунок досягнуто (всі місця розміщення завершені), гра виграна
const winGameJudge = () => {
    if (score === WINSCORE) {
        win = true;
        endGame();
    }
};
// Показати спливаюче підсумковий бал
const showFinalScore = () => {
    clearInterval(timer);
    if (win) {
        youWin.removeAttribute("hidden");
    } else {
        youLose.removeAttribute("hidden");
    }
    // finalScore.textContent = `${score}`;
    finalScoreDialog.removeAttribute("hidden");
};
// Закрийте спливаюче вікно остаточного балу
const closeFinalScore = () => {
    finalScoreDialog.setAttribute("hidden", "");
    cleanData();
};
const listenGameStart = () => {
    startBtn.addEventListener("click", () => {
        // startBtn.setAttribute("transparent", "");
        // startBtn.disabled = true
        startGame();
    });
};


const listenDemo = () => {

    demoBtn.addEventListener("click", () => {
        draggables.forEach((draggable) => {
            const draggableEl = draggable.draggableEl;
            draggableEl.setAttribute('style', 'display:none');
        });
        droppables.forEach((droppable) => {
            const droppableEl = droppable.droppableEl;
            droppableEl.setAttribute('style', 'display:none');
        });
        targetBlock.setAttribute('style', 'display:none');
        DemoPic.removeAttribute("hidden");
        deMo.removeAttribute("hidden");

        startBtn.addEventListener("click", () => {
            draggables.forEach((draggable) => {
                const draggableEl = draggable.draggableEl;
                draggableEl.removeAttribute('style', 'display:none');
            });
            droppables.forEach((droppable) => {
                const droppableEl = droppable.droppableEl;
                droppableEl.removeAttribute('style', 'display:none');
            });
            targetBlock.removeAttribute('style', 'display:none');
            DemoPic.setAttribute("hidden", "");
            deMo.setAttribute("hidden", "");
            startGame();
        });
    });
};


const main = () => {
    // setRandomBlockSizes();
    disableBlocks();
    cleanData();
    listenDragEvent();
    listenGameStart();
    listenDemo();
};
main();
