const scoreNode = document.querySelector('#score');
const wrapper = document.querySelector('#wrapper');
const stopButton = document.querySelector('#stop-button');

let gridHeight = window.innerHeight - 200.0;
let gridWidth = window.innerWidth - 48.0;

// console.log("screen width: ", gridWidth);
// console.log("screen height: ", gridHeight);


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
let time = 2000;

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
        // dinode.addEventListener('click', function handleClick() {
        //     whack(dinode.id);
        // }, false);

        dinoImgs.push(dinode);

        wrapper.appendChild(dinode);
        count++;
    }
}

for (let i=0; i<dinoImgs.length; i++) {
    dinoIndexes.push(i);
}

interval = setInterval(showDino, time);

stop = () => {
    window.clearInterval(interval);
    stopButton.innerHTML = "Start";
}




