
 
 start
  = justDoIt

justDoIt
  = "justDoIt(){\n" expr ":D" "\n}"

expr
 = "What's up, man?" text {return "That's cool, man!";}

text "Mytext"
 = [a-zA-Z]+ {return "";}

/*multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }*/


