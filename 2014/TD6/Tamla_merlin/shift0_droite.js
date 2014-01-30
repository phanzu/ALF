//https://www.khanacademy.org/cs/decd_shift0_merlin/2493660708

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
         //on decale d'une case et on appel l'etat 
        //correspondant
        
        "0": ["", "right", "vide0"],
        "1" : ["", "right", "vide1"],
        //si on es place a -1
        "": ["", "right", "vide"]
    },
    "vide0": {//le dernier bit lu etait 0
       
        // on le fixe et on change l'etat selon le bit lu
        
        "0": ["0", "right", "vide0"],
        "1": ["0", "right", "vide1"],
        // si a la fin on change le sens et l'etat qui va avec
        "": ["", "left", "fin0"]
    },
    "vide1": {
        //le dernier bit lu etait 1
       
        // on le fixe et on change l'etat selon le bit lu
        
        "0": ["1", "right", "vide0"],
        "1": ["1", "right", "vide1"],
        
        // si a la fin on change le sens et l'etat qui va avec
        "": ["", "left", "fin1"]
    },
    "vide": {
         //on decale d'une case et on appel l'etat 
        //correspondant
        "0": ["", "right", "vide0"],
        "1": ["", "right", "vide1"],
        "": ["", "right", "vide"]
    },
    
    "fin0": {//le bit 0 est sauvegarde
    
    // on retourne au debut
        "0": ["0", "left", "fin0"],
        "1": ["1", "left", "fin0"],
        //on fixe 0 et on arrete
        "": ["0", "", "stop"]
    },
    "fin1": {//le bit 1 est sauvegarde
    
    // on retourne au debut
        "0": ["0", "left", "fin1"],
        "1": ["1", "left", "fin1"],
        //on fixe 1 et on arrete
        "": ["1", "", "fin"]
    },
  
    "stop": {}  // Don't do anything else.
};