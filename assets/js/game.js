var playerName = window.prompt('What is your robot\'s name?');  /* I guess it's like Visual Basic class 20 years ago and this is "easier" than starting off 
                                                                doing it the right way. Also: "var" is kind of pointless here since we didn't turn on mandatory
                                                                variable declarations and it's not in a function so it's going to be a global anyway */
console.log(playerName);
function fight() {
    window.alert('The fight has begun!');
};