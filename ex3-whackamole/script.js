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
const finalLevel = document.querySelector('#final-level');

let gridHeight = window.innerHeight - header.offsetHeight;
let gridWidth = window.innerWidth - 48.0;

console.log("screen width: ", gridWidth);
console.log("screen height: ", gridHeight);

gameOverDiv.style.height = gridHeight;
gameOverDiv.style.width = gridWidth;
nextLevelDiv.style.height = gridHeight;
nextLevelDiv.style.width = gridWidth;


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
let asteroidsLeft = 15;
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

gameOver = () => {
    // var wrapperDiv = document.createElement("DIV");
    // wrapperDiv.id = "game-over";

    // var h1 = document.createElement("H1");
    // var h1Node = document.createTextNode("Game Over");
    // h1.appendChild(h1Node);
    // wrapperDiv.appendChild(h1);
    
    // var p1 = document.createElement("P");
    // var p1Node = document.createTextNode(`Kills: ${score}`);
    // p1.appendChild(p1Node);
    // p1.id = "final-score";
    // wrapperDiv.appendChild(p1);
    
    // var p2 = document.createElement("P");
    // var p2Node = document.createTextNode(`Accuracy: ${Math.round(score / 25 * 100)}%`);
    // p2.appendChild(p2Node);
    // p2.id = "final-accuracy";
    // wrapperDiv.appendChild(p2);

    // console.log("appending gameover to wrapper div");
    // wrapper.appendChild(wrapperDiv);

//     <div id="game-over">
//     <h1>Game Over</h1>
//     <p id="final-score">Kills: </p>
//     <p id="final-percent">%</p>
// </div>

    stop();
    // gameOverDiv.style.height = wrapper.style.height;
    finalScoreNode.innerHTML = `Kills: ${score}`;
    finalPercentNode.innerHTML = `Accuracy: ${Math.round(score / (15 * currentLevel) * 100)}%`;
    finalLevel.innerHTML = `Level ${currentLevel}`;
    wrapper.style.display = "none";
    gameOverDiv.style.display = "flex";
    score = 0;
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
    wrapper.style.display = "unset";
    hideMessages();
    button.value = "stop";
    button.innerHTML = "Stop";
    asteroidsLeftNode.innerHTML = `Asteroids Left: ${asteroidsLeft}`;
    asteroidsLeft = 15;
    console.log("current level =", currentLevel);
    switch (currentLevel) {
        case 1: 
        interval = setInterval(showDino, 1500);
        break;
        case 2: 
        interval = setInterval(showDino, 1200);
        break;
        case 3: 
        interval = setInterval(showDino, 1000);
        break;
        case 4: 
        interval = setInterval(showDino, 800);
        break;
        case 5: 
        break;
    }
    // interval = setInterval(showDino, 1200);
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

checkAccuracy = () => {
    if (Math.round(score / (15 * currentLevel) * 100) > 75) {
        console.log("accuracy > 75% proceed to next level");
        currentLevel++;
        wrapper.style.display = "none";
        // nextLevelDiv.style.height = wrapper.style.height;
        nextLevelDiv.style.display = "flex";
        levelH1.innerHTML = `Level ${currentLevel}`;
        setTimeout(start, 3000);
    } 
    else {
        gameOver();
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
    if (asteroidsLeft == 0) {
        console.log("no asteroids left! checking accuracy");
        stop();
        checkAccuracy();
    }
}

hideMessages = () => {
    gameOverDiv.style.display = "none";
    nextLevelDiv.style.display = "none";
}



window.addEventListener("click", function (e) {
    if (button.value == "stop" && asteroidsLeft > 0) {
        throwAsteroid(e);
    }
    // } else if (button.value == "stop") {
       
    //     // GameOver();
    // }
});
