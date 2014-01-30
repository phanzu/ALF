
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
        // pui on li dans l'autre sens
        //et on passe a l'etat0
        "": ["", "left", "etat0"]
    },
    "etat0": {//on considere comme derniere lecture le bit 0
        
        // si 0 on ecrit 0 et on reste dans le meme etat
        "0": ["0", "left", "etat0"],
        // si 1 on ecrit 0 et on change l'etat
        "1": ["0", "left", "etat1"],
        // si non on change le sens de lecture et on
        // passe a l'etat fin0
        "": ["", "right", "fin0"]
    },
    
    "etat1": {//on considere comme derniere lecture le bit 1
    
        // si 0 on ecrit 1 et on change l'etat
        "0": ["1", "left", "etat0"],
        // si 1 on ecrit 0 et on reste dans le meme etat
        "1": ["1", "left", "etat1"],
         // si non on change le sens de lecture et on
        // passe a l'etat fin1
        "": ["", "right", "fin1"]
    },
    "fin0": {
    // on se replace a la fin et on passe a l'etat
    //intermediaire fin00
        "0": ["0", "right", "fin0"],
        "1": ["1", "right", "fin0"],
        "": ["", "left", "fin00"]
    },
    "fin1": {
    // on se replace a la fin et on passe a l'etat
    //intermediaire fin11
        "0": ["0", "right", "fin1"],
        "1": ["1", "right", "fin1"],
        "": ["", "left", "fin11"]
    },
    "fin00": {
    // on fixe le bit 0 puis on passe a l'etat final
        "0": ["0", "left", "fin"],
        "1": ["0", "left", "fin"],
        "": ["", "", ""]
    },
    "fin11": {
    // on fixe le bit 1 puis on passe a l'etat final
        "0": ["1", "left", "fin"],
        "1": ["1", "left", "fin"],
        "": ["", "", ""]
    },
    "fin": {
    // on se replace au debut
        "0": ["0", "left", "fin"],
        "1": ["1", "left", "fin"],
        "": ["", "right", "stop"]
    },
    "stop": {}  // Don't do anything else.
};