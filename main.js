var money = 300; //300
var day = 0; //0
var customers = 0;
var roomsAvail = 0;
var bestScore = 0;
const roomCost = [900,400,400,400,400,150,150,150,150,150,150];
const roomPay = [450,200,200,200,200,75,75,75,75,75,75];
var roomState = [0,0,0,0,0,0,0,0,0,0,0]
var door = new Array();
door[0] = document.getElementById("door0");
door[1] = document.getElementById("door1");
door[2] = document.getElementById("door2");
door[3] = document.getElementById("door3");
door[4] = document.getElementById("door4");
door[5] = document.getElementById("door5");
door[6] = document.getElementById("door6");
door[7] = document.getElementById("door7");
door[8] = document.getElementById("door8");
door[9] = document.getElementById("door9");
door[10] = document.getElementById("door10");

var room = new Array();
room[0] = document.getElementById("room0");
room[1] = document.getElementById("room1");
room[2] = document.getElementById("room2");
room[3] = document.getElementById("room3");
room[4] = document.getElementById("room4");
room[5] = document.getElementById("room5");
room[6] = document.getElementById("room6");
room[7] = document.getElementById("room7");
room[8] = document.getElementById("room8");
room[9] = document.getElementById("room9");
room[10] = document.getElementById("room10");

var person = new Array();
person[0] = document.getElementById("person0");
person[1] = document.getElementById("person1");
person[2] = document.getElementById("person2");
person[3] = document.getElementById("person3");
person[4] = document.getElementById("person4");
person[5] = document.getElementById("person5");
person[6] = document.getElementById("person6");
person[7] = document.getElementById("person7");
person[8] = document.getElementById("person8");
person[9] = document.getElementById("person9");
person[10] = document.getElementById("person10");

var floor = new Array();
floor[0] = document.getElementById("floor0");
floor[1] = document.getElementById("floor1");
floor[2] = document.getElementById("floor2");
floor[3] = document.getElementById("floor3");
floor[4] = document.getElementById("floor4");

var elevatorOn = 0;
var elevatorStop = false;

var ar = 0;
var ap = 0;

var personX = [-50,-50,-50,-50,-50,-50,-50,-50,-50,-50,-50]
var personY = [325,325,325,325,325,325,325,325,325,325,325]

const doorY = [4,3,3,2,2,1,1,1,1,0,0]
const doorX = [166,75,250,75,250,31,117,203,289,203,289]

let eleSound = new Audio("elevator.mp3");
let cashSound = new Audio("cash.mp3");
let coinSound = new Audio("coin.mp3");
let doorSound = new Audio("door.mp3");
let sawSound = new Audio("saw.mp3");
let jazzSound = new Audio("jazz.mp3");
let mehSound = new Audio("meh.mp3");
//jazzSound.loop = true;

let btnOpen = document.getElementById("openDay");

let boolOver = false;

const popup = document.getElementById("popup");

updateScoreboard();
//start();

function updateScoreboard(){
    document.getElementById("moneyTime").innerHTML = "$" + money + " - Day " + day;
    //let moneyTime = document.getElementById("moneyTime");
    //let moneyStr = "$" + money + " - Day " + day;
   // moneyTime.innerHTML = moneyStr;
}

function start(){
    door[0].innerHTML = "$" + roomCost[0];
    door[1].innerHTML = "$" + roomCost[1];
    door[2].innerHTML = "$" + roomCost[2];
    door[3].innerHTML = "$" + roomCost[3];
    door[4].innerHTML = "$" + roomCost[4];
    door[5].innerHTML = "$" + roomCost[5];
    door[6].innerHTML = "$" + roomCost[6];
    door[7].innerHTML = "$" + roomCost[7];
    door[8].innerHTML = "$" + roomCost[8];
    door[9].innerHTML = "$" + roomCost[9];
    door[10].innerHTML = "$" + roomCost[10];
    roomState = [0,0,0,0,0,0,0,0,0,0,0]
    money = 300; //300
    day = 0; //0
    updateScoreboard();
    popup.style.display = "none";
    roomsAvail = 0;
}

function doorClick(doorNum){
    let stateOfRoom = roomState[doorNum];
    if (stateOfRoom === 0 && roomCost[doorNum] <= money) {
        sawSound.play();
        money -= roomCost[doorNum];
        roomState[doorNum] = 1;
        roomsAvail++;
        door[doorNum].innerHTML = "";
        door[doorNum].style.backgroundColor = "yellow";
        room[doorNum].style.backgroundImage = "url('wall.jpg')";
        updateScoreboard();
    }
    else if (stateOfRoom === 3) {
        coinSound.play();
        money += roomPay[doorNum];
        roomState[doorNum] = 1;
        door[doorNum].innerHTML = "";
        door[doorNum].style.backgroundColor = "yellow";        
        updateScoreboard();
    }
}

function openDay(){
    btnOpen.style.display = "none";
    //jazzSound.play();
    day++;
    console.log(day);
    do {
        customers = Math.floor(Math.random() * (roomsAvail + 1)) + 2;
        console.log(customers);
    } while (customers > 11);
    //customers = 5;
    console.log(customers);
    //find first active room
    ar = roomState.indexOf(1);
    //start movement of first customer if there is active room
    if (ar > -1){
        personMove();
    }
    else {
        leftOvers();
    }
    updateScoreboard();
}

function personMove(){
    personX[ap] = -50;
    personY[ap] = 325;
    person[ap].style.left = personX[ap] + "px";
    person[ap].style.top = personY[ap] + "px";
    person[ap].style.display = "inline";
    moving = setInterval(movement,300);
}

function movement(){
    personX[ap] += 25;
    person[ap].style.left = personX[ap] + "px";
    if (personX[ap] >= 75){
        jazzSound.play();
    }
    if (doorY[ar] === 0 && personX[ap] >= doorX[ar]){
        clearInterval(moving);
        person[ap].style.display = "none";
        elevatorOn = 0;
        closeDoor();
    }
    else if (personX[ap] >= 350){
        clearInterval(moving);
        elevatorOn = 0;
        elevating = setInterval(elevatorUp,1000);
    }
}

function elevatorUp(){
    if (elevatorOn === 0 && doorY[ar] > 0){
        //eleSound.play();
        floor[0].style.backgroundColor = "white";
        floor[0].style.backgroundImage = "none";
    }
    else if (elevatorOn === 1  && doorY[ar] >= 1){
        floor[0].style.backgroundColor = "black";
        floor[0].style.backgroundImage = "url('elevator.jpg')";
        floor[1].style.backgroundColor = "white";
        floor[1].style.backgroundImage = "none";
        personY[ap] -= 75;
        person[ap].style.top = personY[ap] + "px";
    }
    else if (elevatorOn === 2  && doorY[ar] >= 2){
        floor[1].style.backgroundColor = "black";
        floor[1].style.backgroundImage = "url('elevator.jpg')";
        floor[2].style.backgroundColor = "white";
        floor[2].style.backgroundImage = "none";
        personY[ap] -= 75;
        person[ap].style.top = personY[ap] + "px";
    }
    else if (elevatorOn === 3  && doorY[ar] >= 3){
        floor[2].style.backgroundColor = "black";
        floor[2].style.backgroundImage = "url('elevator.jpg')";
        floor[3].style.backgroundColor = "white";
        floor[3].style.backgroundImage = "none";
        personY[ap] -= 75;
        person[ap].style.top = personY[ap] + "px";
    }
    else if (elevatorOn === 4  && doorY[ar] >= 4){
        floor[3].style.backgroundColor = "black";
        floor[3].style.backgroundImage = "url('elevator.jpg')";
        floor[4].style.backgroundColor = "white";
        floor[4].style.backgroundImage = "none";
        personY[ap] -= 75;
        person[ap].style.top = personY[ap] + "px";
    }
    else if (elevatorStop === true){
        if (doorY[ar] > 0){
            eleSound.play();
        }
        let stopFloor = doorY[ar];
        floor[stopFloor].style.backgroundColor = "black";
        floor[stopFloor].style.backgroundImage = "url('elevator.jpg')";
        clearInterval(elevating);
        //elevatorOn--;
        elevatorOn = 0;
        elevatorStop = false;
        lefting = setInterval(moveLeft,300);
    }
    elevatorOn++;
    if (elevatorOn === doorY[ar] || doorY[ar] === 0){
        elevatorStop = true;
    }
}

function moveLeft(){
    personX[ap] -= 25;
    person[ap].style.left = personX[ap] + "px";
    if (personX[ap] <= doorX[ar]){
        clearInterval(lefting);
        person[ap].style.display = "none";
        closeDoor();
    }
}

function closeDoor(){
       roomState[ar] = 2; //occupied
       door[ar].style.backgroundColor = "#8b4513"; 
       door[ar].style.backgroundImage = "url('door.jpg')";
       jazzSound.pause();
       doorSound.play();
       if (ap < 11){
        nextCustomer();
       }
}

function nextCustomer(){
    ap++;
    ar = roomState.indexOf(1);
    //start movement of second customer and so on if there is active room
    console.log("ar " + ar + " ap " + ap);
    if (ar > -1 && ap < customers){
        personMove();
    }
    else if (ar <= -1 && ap < customers){
        console.log("leftOvers");
        leftOvers();
    }
    else {
        dayOver();
        updateScoreboard();
    }
    //personMove();
    //openDay();
}

function dayOver(){
    //now put money in all the doors and turn them from state 2 to state 3
    let roomUsed = roomState.indexOf(2)
    if (roomUsed > -1){
        do {
            roomState[roomUsed] = 3;
            door[roomUsed].style.backgroundColor = "#118C4F";
            door[roomUsed].style.backgroundImage = "none";
            door[roomUsed].innerHTML = "$" + roomPay[roomUsed];
            roomUsed = roomState.indexOf(2);
        } while (roomUsed > -1);
    }
    cashSound.play();
    ap = 0;
    btnOpen.style.display = "inline";
    if (day >= 10){
        gameOver();
    }
}

function leftOvers(){
    personX[ap] = -50;
    personY[ap] = 325;
    person[ap].style.left = personX[ap] + "px";
    person[ap].style.top = personY[ap] + "px";
    person[ap].style.display = "inline";
    movingOver = setInterval(moveOvers,300);
}

function moveOvers(){
    if (personX[ap] <= 75 && !boolOver){
        personX[ap] += 25;
        person[ap].style.left = personX[ap] + "px";
    }
    else if (personX[ap] > 75 && !boolOver){
        boolOver = true;
        mehSound.play();
    }
    else if (personX[ap] >= -50 && boolOver){
        personX[ap] -= 25;
        person[ap].style.left = personX[ap] + "px";
    }
    else if (personX[ap] < -50 && boolOver){
        boolOver = false;
        clearInterval(movingOver);
        nextCustomer();
    }    
}

function gameOver(){
    //first collect all the money from the last day from all the doors in a loop
    let roomUsed2 = roomState.indexOf(3)
    if (roomUsed2 > -1){
        do {
            roomState[roomUsed2] = 0;
            money += roomPay[roomUsed2];
            roomUsed2 = roomState.indexOf(3);
        } while (roomUsed2 > -1);
    }
    if (money > bestScore){
        bestScore = money;
    }
    popup.style.display = "inline";
    popup.innerHTML = "<span style='position:absolute;top:170px;width:400px;left:0px;'>Score:$" + money + "<br>Best Score:$" + bestScore + "</span>" +
    "<button onclick='start()' id='play'>Play</button>";
    //reset rooms and reset doors
    for (var i=0; i < 11; i++){
        door[i].style.backgroundColor = "orange";
        room[i].style.backgroundImage = "url('ply.jpg')";
    }
}