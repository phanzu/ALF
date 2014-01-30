/**THIS IS THE BIT COUNTER DEMANDED FOR TP6 IT SHOULD BE RUN      *AS IS ALTHOUGH IT SHOULD WORK WITH A 1 AS INITIAL VALUE
 * THIS IS MEANT TO BE RUN WITH THE KHAN ACADEMY TURING MACHINE APP : https://www.khanacademy.org/cs/turing-machine/938201372
 * 
 * 
 * A Turing machine (TM) is a very simple kind of computer,
 * but despite its simplicity it can do anything
 * that the computer you are reading this on can
 * (it will probably be slower, but it will work).
 * A TM consists of:
 *     -A tape (the thing on the top with numbers on it).
 *      The tape is divided into infinitely many cells
 *      (the boxes that the numbers are in).
 *      Each cell contains a letter in the tape's alphabet
 *      (the alphabet consists of a blank symbol--here it's
 *      an empty box ("" in the source code) and any number
 *      of other symbols (here, those are "1" and "0").
 *     -A head (the yellow cell), which is the cell that the
 *      TM is currently looking at.
 *     -A list of states (the left part of the table).
 *      There are a finite number of states, and the
 *      TM starts in the "start" state.
 *     -A list of instructions (the right part of the table).
 *      If the TM is told to write 0, go right, and go to
 *      the "add" state, then it will overwrite the current
 *      slot on the tape with 0, move the head one cell to
 *      the right, and go to the state "add".
 * At each step of execution, the TM looks at the current
 * state, and what is currently on the tape.
 * For example, at the beginning, we're in state "start" and
 * we see a "1" on the tape.  Then, we look on the right half
 * of the table and see that we need to write down a "1",
 * move right, and stay in the start state.
 * This repeats until we get to the "stop" state, at which
 * point the machine is done running.
 * (It's possible for the machine to never get to the stop
 * state, in which case the TM runs forever.)
 * For more details about TMs, see
 * http://en.wikipedia.org/wiki/Turing_machine
 */

// Input to this machine: a binary number.
// Output: that binary number plus one.
var addOneMachine = {};
/** The states in the machine. If the machine is at state
 * "start", it looks in the rules for start to see
 * what character to write, what direction to move in,
 * and what state to go to next.
 * Change this to make the machine do whatever you want.
 */
addOneMachine.stateTransition = {
    "start": { // Move to the right side of the number
        // If we're in state "start" and see "0", then
        // write "0", move to the right, and go to state
        // "start"
        "0": ["0", "right", "start"],
        "1" : ["0", "right", "start"],
        // If we're in state "start" and see "" (empty box),
        // then write "", move to the left, and go to state
        // "add"
        "": ["", "left", "b"]
    },
    "b": {
        // 0 + 1 = 1. We're done adding because there's no
        // carry
        "0": ["1", "right", "start"],
        // 1 + 1 = 10 in binary. So, we need to write down
        // "0" and carry the 1.
        "1": ["0", "left", "b"],
        // We had to carry all the way to the left side of
        // the number. Finish carrying.
        "": ["1", "right", "start"]
    },
    
};
// The list of symbols that can be on the tape.
// Change this to be whatever you want.
addOneMachine.alphabet = ["0", "1", ""];
// The starting value of the tape.
// Change to the input you want to give to the Turing Machine
addOneMachine.startTape = "0";
// Variables representing the Turing Machine before it runs
/////////////////////////////////////////////////////////////
// Be careful when changing anything below this line!
addOneMachine.position = 0;
addOneMachine.state = "start";
addOneMachine.negArr = [];
addOneMachine.posArr = [];
// Variables controlling the graphics of the turing machine
addOneMachine.boxWidth = 25;
addOneMachine.boxHeight = 30;
addOneMachine.startHeight = 0;
addOneMachine.numberHeight = addOneMachine.startHeight + 50;
addOneMachine.center = 0;
/**
 * Returns true if the given character is in the given
 * Turing Machine's alphabet and false otherwise.
 */
var isValidChar = function(c, turingMachine){
    for(var l in turingMachine.alphabet){
        if (turingMachine.alphabet[l] === str(c)){
            return true;
        }
    }
    return false;
};

/**
 * Given a string representing the desired tape state,
 * and a Turing Machine, set the Turing Machine's tape
 * to the state represented in the string.
 */
var setTape = function(tape, turingMachine){
    turingMachine.negArr = [];
    turingMachine.posArr = [];
    var i = 0;
    for (var c in tape){
        if (isValidChar(tape[c], turingMachine)){
            turingMachine.posArr[i] = tape[c];
        } else{
            turingMachine.posArr[i] = "";
        }
        i += 1;
    }
    return turingMachine;
};

/**
 * Draw the given number to the screen at the given point.
 * If the numbers are too long, shift every other one down
 * to make it easier to read.
 */
var drawNum = function(num, x, y) {
    fill(0, 0, 0);  // Black text
    textSize(12);
    // Move numbers down if they'd collide with other numbers
    if (str(num).length >= 3 && num % 2 !== 0) {
        text(num, x, y + 10);
    } else {
        text(num, x, y);
    }
};

/**
 * Draw a helpful number line to label the tape boxes,
 * given an offset from zero and a Turing Machine
 */
var numberLine = function(offset, turingMachine) {
    var y = turingMachine.numberHeight;
    // The x pixel of the first number at least 0
    var x = width/2 + (offset * turingMachine.boxWidth);
    var i = 0;
    while (x < width){
        drawNum(i, x + 8, y);
        x += turingMachine.boxWidth;
        i += 1;
    }
    
    x = width/2 + ((offset - 1) * turingMachine.boxWidth);
    i = -1;
    while (x > 0 - turingMachine.boxWidth) {
        drawNum(i, x + 3 , y);
        x -= turingMachine.boxWidth;
        i -= 1;
    }
};

/**
 * Draw a single box on the TM tape,
 * at position (x, turingMachine.startHeight)
 * with contents given by contents, on the turing machine 
 * given by turingMachine.
 * If highlight is true, make the box background yellow.
 */
var drawBox = function(x, contents, turingMachine, highlight){
     // Should we highlight the box?
     if (highlight){
         fill(255, 255, 0);
     } else{
          fill(255, 255, 255);
     }
     // Draw the box itself.
     rect(x,
        turingMachine.startHeight,
        turingMachine.boxWidth,
        turingMachine.boxHeight);
     // Draw the box's contents.
     fill(0, 0, 0);
     textSize(18);
     text(contents, x + 8, turingMachine.startHeight + 21);
};

/**
 * Given a turing machine, draw its tape.
 * center is the number that's in
 * the middle of the screen
 */
var drawTape = function(turingMachine, newCenter) {
    background(255, 255, 255); // clear screen

    // makes the code easier to read
    var boxWidth = turingMachine.boxWidth;
    var startHeight = turingMachine.startHeight;
    var numberHeight = turingMachine.numberHeight;
    
    // Only move tape if we're a few away from the center
    var center = turingMachine.center;
    if (abs(newCenter - turingMachine.center) > 5){
        center = newCenter;
        turingMachine.center = newCenter;
    }
    
    // Divider between tape and the state table
    if (center <= -3 || center >= 94){
        line(0, numberHeight + 15, 400, numberHeight + 15); 
    } else{
        line(0, numberHeight + 5, 400, numberHeight +  5);
    }
    
    // If we want the center to be -3, we should move
    // the tape 3 to the right.
    var offset = -center;
    // the pixel location of box 0.
    var zeroPosition = width/2 + (offset * boxWidth);
    for (var i = 0; i < turingMachine.posArr.length; i += 1){
        drawBox(
            zeroPosition + (i * boxWidth),
            turingMachine.posArr[i],
            turingMachine,
            i === turingMachine.position);
    }
    
    // Draw in extra boxes to the far right of the screen
    // to make it look like the tape is infinite
    while (i * boxWidth < width - zeroPosition){
        drawBox(
            zeroPosition + (i * boxWidth),
            "",
            turingMachine,
            i === turingMachine.position);
        i += 1;
    }
    
    // Draw the left part of the tape.
    for (var j = 0; j < turingMachine.negArr.length; j += 1) {
        drawBox(
            zeroPosition - ((j + 1) * boxWidth),
            turingMachine.negArr[j],
            turingMachine,
            j + 1 === -turingMachine.position);   
    }
    // fill in with empty boxes until the far
    // left of the screen.
    while ((j - 1) * boxWidth < zeroPosition) {
        drawBox(
            zeroPosition - ((j + 1) * boxWidth),
            "",
            turingMachine,
            j + 1 === -turingMachine.position);
        j += 1; 
    }
    // Draw the number line.
    numberLine(offset, turingMachine);
};

/**
 * Given a Turing Machine and a direction to move,
 * move one space in that direction.
 */
var move = function(turingMachine, direction){
    if (direction === "right") {
        turingMachine.position += 1;
    } else if (direction === "left") {
        turingMachine.position -= 1;
    }
    return turingMachine;
};

/**
 * Given a Turing Machine, get the value for the tape
 * at the position the Turing Machine is currently on.
 */
var getTapeValue = function(turingMachine){
    var pos = turingMachine.position;
    if (pos >= 0){
        if (turingMachine.posArr[pos] === undefined){
            // Spaces we don't know about are blank.
            return "";
        }
        return turingMachine.posArr[pos];
    } else{
        if (turingMachine.negArr[(-pos) - 1] === undefined){
            // Spaces we don't know about are blank.
            return "";   
        }
        return turingMachine.negArr[(-pos) - 1];
    }
};

/**
 * Write the given value to the Turing Machine's tape
 * at the current position.
 */
var setTapeValue = function(turingMachine, val){
    if (!isValidChar(val, turingMachine)){
        debug("Tried to set invalid character " + val + "!");
        // If this character isn't valid,
        // just set a blank character
        val = "";
    }
    var pos = turingMachine.position;
    if (pos >= 0){
        turingMachine.posArr[pos] = val;
    } else{
        turingMachine.negArr[(-pos) - 1] = val;
    }
    return turingMachine;
};

/**
 * Given a Turing Machine, run the next step in its execution.
 */
var nextStep = function(turingMachine){
    var tapeValue = getTapeValue(turingMachine);
    var state = turingMachine.state;
    var next = turingMachine.stateTransition[state][tapeValue];
    turingMachine = setTapeValue(turingMachine, next[0]);

    turingMachine = move(turingMachine, next[1]);
    drawTape(turingMachine, turingMachine.position);
    turingMachine.state = next[2];
    return turingMachine;
};

/**
 * Draw the table of states, and highlight the current one
 * in red.
 */
var table = function(){
    fill(0, 0, 0);  // Black text
    // Write the table headers
    text("State:", 10, 100);
    text("Symbol:", 60, 100);
    text("Write:", 160, 100);
    text("Direction:", 210, 100);
    text("Next state:", 290, 100);
    // Line to separate the headers from the contents
    line(0, 105, width, 105);
    // The starting height of text for contents of the table
    var yText = 120;
    // Draw a line to separate the current state with the
    // action we should take
    line(130, 90, 130, 400);
    
    for(var s in addOneMachine.stateTransition) {
        var next = addOneMachine.stateTransition[s];
        if (s !== "stop") {
            for (var c in addOneMachine.alphabet){
                var char = addOneMachine.alphabet[c];
                if (addOneMachine.state === s &&
                        char === getTapeValue(addOneMachine,
                                addOneMachine.position)){
                    fill(255, 0, 0);
                }
                text(s, 10, yText); // State
                text(char, 60 + 15, yText); // Number
        
                var moves = next[char];
                text(moves[0], 160 + 15, yText); // Write
                text(moves[1], 210, yText); // Direction
                text(moves[2], 290, yText); // Next state  
            
                fill(0, 0, 0);
                yText += 20;
            }
        } else{
            if (addOneMachine.state === s){
                fill(255, 0, 0);
            }
            text(s, 10, yText); // State
            yText += 20;
        }
    }
};

var mousePressed = function() {
    if (addOneMachine.state !== "stop"){
        addOneMachine = nextStep(addOneMachine);
    } else{
        drawTape(addOneMachine, 0);
    }
    table();
};

addOneMachine = setTape(addOneMachine.startTape, addOneMachine);
drawTape(addOneMachine, 0);
textSize(20);
fill(0, 0, 0);
text("Click to run! (one click per step)", 50, 75);
textSize(12);
table();