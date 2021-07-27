
const start = document.getElementById("start");
let isStrted = false;
let current;
let clickTrack;
let count1 = 0;
let count2 =0;
const status = document.getElementById("status");

// there are 8 winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// terminal space contains score board and start and reset buttons.
function terminal(event){
    // event deligation used to track the clicked target id.
    // start the game entry point
    let element = event.target.id;
    if(element == "start" && !isStrted){
        current = "player1";
        isStrted= true; 
        status.innerHTML = "Game Started";
        clickTrack = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        document.querySelectorAll('.cell').forEach(startingWindow);
    }
    // set value of game to initial conditions.
    if(element == "reset"){
        isStrted = false;
        status.innerHTML = "";
        clickTrack = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        document.querySelectorAll('.cell').forEach(startingWindow);
        count1=0;
        count2=0;
        status.innerHTML = "Click Start to begin";
        document.getElementById("p1").innerHTML = count1;
        document.getElementById("p2").innerHTML = count2;
    }    
}

// initially all cell contains empty string
function startingWindow(cell){
    cell.innerHTML = "" ;
}

// player change after each valid turn
function togglePlayer(){
    current = (current==="player1") ? "player2":"player1";
}



function playTrack(event){
    // if(start.disabled) return;
    if(!isStrted) return;
    let click = event.target.id;
    if(click === "playground") return;
    const temp = document.getElementById(click);

    // for valid click
    if(temp.textContent === "O" || temp.textContent==="X") return;

    // console.log(click);
    // if click is valid perform execution
    document.getElementById("audio").play();
    if(current == "player1"){
        document.getElementById(click).innerText = "X";
    }
    else{
        document.getElementById(click).innerText = "O";
    }    
    track(click);
    result();    
    togglePlayer();
}

// upadating array for tracking clicks
function track(click){
    let assign = (current==="player1") ? 1:-1;
    switch (click) {
        case "zero":
            clickTrack[0]=assign;
            break;
        case "one":
            clickTrack[1]=assign;
            break;
        case "two":
            clickTrack[2]=assign;
            break;
        case "three":
            clickTrack[3]=assign;
            break;
        case "four":
            clickTrack[4]=assign;
            break;
        case "five":
            clickTrack[5]=assign;
            break;
        case "six":
            clickTrack[6]=assign;
            break;
        case "seven":
            clickTrack[7]=assign;
            break;
        case "eight":
            clickTrack[8]=assign;
            break;
        default:
            break;
    }
}

// result evaluation
function result(){
    let roundStatus = false;
    for (let i = 0; i <= 7; i++) {
        const win = winningConditions[i];        
        let sum = clickTrack[win[0]] + clickTrack[win[1]] + clickTrack[win[2]];   
        if (sum == 3 || sum == -3) {
            roundStatus = true;
            break;
        }        
    }
    if(roundStatus){
        status.innerHTML = current + " " + "won";
        counter();          
        isStrted= false;
        return;                      
    }
    if(!clickTrack.includes(0)){
        status.innerHTML = "Game Draw";
        isStrted= false;
    }
}

// update the counter
function counter(){
    if(current == "player1") {
        count1++;
        document.getElementById("p1").innerHTML = count1;
    }
    else{
        count2++;
        document.getElementById("p2").innerHTML = count2;
    }
 }

