
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
	        //on place le vide et decale d'une case et on appel l'etat 
	        //correspondant
	        
	        "0": ["", "right", "vide0"],
	        "1" : ["", "right", "vide1"],
	        //si on est place a -1 par rapport a a donnee
	        "": ["", "right", "vide"]
	    },
	    "vide0": {//le dernier bit lu etait 0
	       
	        // on le fixe et on change l'etat selon le bit lu
	        
	        "0": ["0", "right", "vide0"],
	        "1": ["0", "right", "vide1"],
	        "": ["0", "right", "vide"]
	    },
	    "vide1": {//le dernier bit lu etait 1
	       
	        // on le fixe et on change l'etat selon le bit lu
	        
	        "0": ["1", "right", "vide0"],
	        "1": ["1", "right", "vide1"],
	        "": ["1", "right", "vide"]
	    },
	    "vide": {
	        //on va dans l'etat corespondant  au bit lu
	        "0": ["", "right", "vide0"],
	        "1": ["", "right", "vide1"],
	     //si on est un bit vide apres le dernier bit
	     //alors on va se repositionner au depart
	        "": ["", "left", "fin"]
	    },
	    
	    "fin": {
	    // on se replace au debut
	        "0": ["0", "left", "fin"],
	        "1": ["1", "left", "fin"],
	        "": ["", "right", "stop"]
	    },
	    "stop": {}  // Don't do anything else.
	};