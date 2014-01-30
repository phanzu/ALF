//https://www.khanacademy.org/cs/dec_g_1_merlin/2490841348

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
    "start": {
        // on se place a la fin
        "0": ["0", "right", "start"],
        "1" : ["1", "right", "start"],
        // puis on lit dans l'autre sens
        //et on change l'etat
        "": ["", "left", "vide"]
    },
    "vide": {//on place le vide dans le dernier bit
             //car on decale sur un seul bit
             
        // si 0 on change d'etat pour decg0
        "0": ["", "left", "decg0"],
        // si 1 on change d'etat pour decg1
        "1": ["", "left", "decg1"],
        // si non stop et on change le sens
        "": ["", "right", "stop"]
    },
    
    "decg1": {//signifie que le dernier bit lu etait 1
    
    //on le fixe quoi qu'il arrive 
    //puis on change l'etat selon le bit rencontre
        "0": ["1", "left", "decg0"],
        "1": ["1", "left", "decg1"],
        "": ["1", "", "stop"]
    },
    "decg0": {//signifie que le dernier bit lu etait 0
    
    //on le fixe quoi qu'il arrive 
    //puis on change l'etat selon le bit rencontre
        "0": ["0", "left", "decg0"],
        "1": ["0", "left", "decg1"],
        "": ["0", "", "stop"]
    },
    
    "stop": {}  // Don't do anything else.
};