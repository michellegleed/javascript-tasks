const scoreNode = document.querySelector('#score');
const asteroidsLeftNode = document.querySelector('#asteroids-left');
const gameOverDiv = document.querySelector('#game-over');
const nextLevelDiv = document.querySelector('#next-level');
const levelH1 = document.querySelector('#level-number');
const wrapper = document.querySelector('#wrapper');
const button = document.querySelector('#button');
const body = document.querySelector('body');
const header = document.querySelector('header');

const finalScoreNode = document.querySelector('#final-score');
const finalPercentNode = document.querySelector('#final-percent');

let gridHeight = window.innerHeight - header.offsetHeight;
let gridWidth = window.innerWidth - 48.0;

console.log("screen width: ", gridWidth);
console.log("screen height: ", gridHeight);


// STILL TO DO..
// - make start button work 
// - make speed buttons work 
// - make commet fly in on click (but only explode if on a dino)


let dinoGridRows = Math.floor(gridHeight / 75.0)
let dinoGridCols = Math.floor(gridWidth / 75.0)

console.log("dino grid rows = ", dinoGridRows);
console.log("dino grid cols = ", dinoGridCols);

let dinoImgs = [];
let dinoIndexes = [];
let lastIndex;
let score = 0;
let asteroidsLeft = dinoGridCols * dinoGridRows;
let currentLevel = 1;

createAsteroid = () => {
    asteroidLeftOffset = wrapper.width + 100;
    let asteroid = document.createElement("img");
    asteroid.id = "asteroid-img";
    asteroid.src = "img/comet.png";
    asteroid.height = 75;
    asteroid.width = 75;
    asteroid.style.position = "absolute";
    asteroid.style.top = "-100px";
    asteroid.style.left = asteroidLeftOffset + "px";
    body.appendChild(asteroid);
}

createAsteroid();

createGameOver = () => {
    // var wrapperDiv = document.createElement("DIV");
    // wrapperDiv.id = "game-over";
    // var p1 = document.createElement("P");
    // var p1Node = document.createTextNode(`Kills: ${score}`);
    // p1.appendChild(p1Node);
    // console.log("appending gameover to wrapper div");
    // wrapperDiv.appendChild(p1);

//     <div id="game-over">
//     <h1>Game Over</h1>
//     <p id="final-score">Kills: </p>
//     <p id="final-percent">%</p>
// </div>
    finalScoreNode.innerHTML = `Kills: ${score}`;
    finalPercentNode.innerHTML = `Percent: ${Math.round((score / (dinoGridCols * dinoGridRows)) * 100)}%`;
    gameOverDiv.style.display = "flex";

}

showDino = () => {
    if (lastIndex != null) {
        dinoImgs[lastIndex].classList.remove("active");
    }
    randomIndex = Math.floor(Math.random() * dinoIndexes.length);
    lastIndex = dinoIndexes[randomIndex];
    dinoImgs[lastIndex].classList.add("active");
}

whack = (index) => {
    if (index == lastIndex) {
        console.log(typeof(index));
        i = dinoIndexes.indexOf(lastIndex);
        dinoIndexes.splice(i, 1);
        console.log("dino hit at index ", index);
        console.log("i is ", i);
        dinoImgs[index].src = "img/explosion.png";
        updateScore();
        console.log(dinoIndexes);
    }
}

updateScore = () => {
    score++;
    scoreNode.innerHTML = `Kills: ${score}`;
    // if (score % 10 == 0) {
    //     console.log("score reached 10 - next level");
    //     window.clearInterval(interval);
    //     currentLevel++;
    //     levelH1.innerHTML = `Level ${currentLevel}`;
    //     asteroidsLeft = 20;
    //     start();
    //     levelH1.style.display = "none";
    // }
}

updateAsteroidsLeft = () => {
    asteroidsLeftNode.innerHTML = `Asteroids Left: ${asteroidsLeft}`;
}

let count = 0;

for (let i=0; i < dinoGridCols; i++) {
    for (let j=0; j < dinoGridRows; j++) {

        let dinode = document.createElement("img");
        dinode.className = "dino-img";
        dinode.src = "img/trex.png";
        dinode.height = 75;
        dinode.width = 75;
        dinode.id = count;

        dinode.addEventListener('click', function() {
            whack(dinode.id);
        }, {once:true});        

        dinoImgs.push(dinode);

        wrapper.appendChild(dinode);
        count++;
    }
}

for (let i=0; i<dinoImgs.length; i++) {
    dinoIndexes.push(i);
}

start = () => {
    button.value = "stop";
    button.innerHTML = "Stop";
    asteroidsLeftNode.innerHTML = `Asteroids Left: ${asteroidsLeft}`;
    // switch (currentLevel) {
    //     case 1: 
    //     interval = setInterval(showDino, 2000);
    //     break;
    //     case 2: 
    //     interval = setInterval(showDino, 1500);
    //     break;
    //     case 3: 
    //     interval = setInterval(showDino, 1000);
    //     break;
    //     case 4: 
    //     interval = setInterval(showDino, 1000);
    //     break;
    //     case 5: 
    //     break;
    // }
    interval = setInterval(showDino, 1200);
}

stop = () => {
    window.clearInterval(interval);
    button.value = "start";
    button.innerHTML = "Start";
}

toggleButton = () => {
    console.log("button toggled");
    if (button.value == "start") {
        start();
    } else {
        stop();
    }
}

throwAsteroid = (e) => {
    if (e.clientY > header.offsetHeight) {
        asteroidsLeft--;
        updateAsteroidsLeft();
        asteroidImg = document.querySelector("#asteroid-img");
        asteroidImg.classList.add("moving");
        console.log("x = ", e.clientX);
        console.log("y = ", e.clientY);
        
        asteroidImg.style.top = `${e.clientY - 30}px`;
        asteroidImg.style.left = `${e.clientX - 15}px`;
    }
}

window.addEventListener("click", function (e) {
    if (button.value == "stop" && asteroidsLeft > 0) {
        throwAsteroid(e);
    } else if (button.value == "stop") {
        createGameOver();
    }
});
