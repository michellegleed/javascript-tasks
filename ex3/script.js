const p1ChoiceNode = document.querySelector('#p1-choice');
const p2ChoiceNode = document.querySelector('#p2-choice');
const p1ScoreNode = document.querySelector('#p1-score');
const p2ScoreNode = document.querySelector('#p2-score');

document.addEventListener('keydown', getKey);

let p1Choice = "";
let p2Choice = "";

let p1Score = 0;
let p2Score = 0;

resetChoices = () => {
    p1Choice = "";
    p2Choice = "";
}

updateScoreNodes = () => {
    p1ScoreNode.innerHTML = `Score: ${p1Score}`;
    p2ScoreNode.innerHTML = `Score: ${p2Score}`;
}

determineWinner = () => {
    if (p1Choice == p2Choice) {
        console.log("no winner")
    }

    else if (p1Choice == "scissors") {
        switch (p2Choice) {
            case "rock": 
                p2Score++;
                console.log("player 2 wins");
                break;
            case "paper": 
                p1Score++;
                console.log("player 1 wins");
                break;
        }
    }   

    else if (p1Choice == "rock") {
        switch (p2Choice) {
            case "scissors": 
                p1Score++;
                console.log("player 1 wins");
                break;
            case "paper": 
                p2Score++;
                console.log("player 2 wins");
                break;
        }
    }   

    else if (p1Choice == "paper") {
        switch (p2Choice) {
            case "scissors": 
                p2Score++;
                console.log("player 2 wins");
                break;
            case "rock": 
                p1Score++;
                console.log("player 1 wins");
                break;
        }
    }
    updateScoreNodes();
    resetChoices();
}

updatePlayerChoice = (player, choice) => {
    if (player == 1) {
        p1Choice = choice;
        p1ChoiceNode.innerHTML = `Chose: ${choice}`;
    }
    else if (player == 2) {
        p2Choice = choice;
        p2ChoiceNode.innerHTML = `Chose: ${choice}`;
    }
    if (p1Choice.length > 0 && p2Choice.length > 0) {
        determineWinner();
    }
}

function getKey(e) {
    switch(e.key) {
        case "q": 
            updatePlayerChoice(1, "rock");
            break;    
        case "a": 
            updatePlayerChoice(1, "paper");
            break;        
        case "z": 
            updatePlayerChoice(1, "scissors");
            break;
            
        case "p": 
            updatePlayerChoice(2, "rock");
            break;    
        case "l": 
            updatePlayerChoice(2, "paper");
            break;        
        case "m": 
            updatePlayerChoice(2, "scissors");
            break;

        default: 
            break;
    } 
}


