/* States:
    WIN - all robots defeated
        - fight all robots
        - defeat each robot
    LOSE - player has lost all health
*/

var playerName = window.prompt('What is your robot\'s name?');  /* I guess it's like Visual Basic class 20 years ago and this is "easier" than starting off 
                                                                doing it the right way. Also: "var" is kind of pointless here since we didn't turn on mandatory
                                                                variable declarations and it's not in a function so it's going to be a global anyway. It's also
                                                                at the top of the file so hoisting isn't going to change anything. */
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    // Announce the start of the round
    window.alert('Welcome to Robot Gladiators!');
    
    // fight or skip?
    var promptFight;
    while((promptFight != 'FIGHT') && (promptFight != 'SKIP')) {
        promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.').toUpperCase();
    }
    if(promptFight == 'FIGHT') {
        // Subract playerAttack from enemyHealth, updating enemyHealth w/ new value
        enemyHealth -= playerAttack;

        // has it lost all its health?
        if(enemyHealth <= 0) {
            window.alert(enemyName + ' has been defeated!');
        } else {
            window.alert(enemyName + ' has ' + enemyHealth + ' HP left.');
        };

        // Console log
        console.log(enemyName + ' attacked by ' + playerName + ', new health: ' + enemyHealth);

        // The enemy robot swings back
        playerHealth -= enemyAttack;

        // More logging
        console.log(playerName + ' attacked by ' + enemyName + ', new health: ' + playerHealth);

        // has it lost all its health?
        if(playerHealth <= 0) {
            window.alert(playerName + ' has been defeated!');
        } else {
            window.alert(playerName + ' has ' + playerHealth + ' HP left.');
        };
    } else if(promptFight == 'SKIP') {
        var confirmSkip = window.confirm('Are you sure you\'d like to skip the fight?');
        if(confirmSkip) {
            window.alert(playerName + ' has skipped this fight.');
            playerMoney -= 2;
        } else {
            fight(); // I wonder how many times you'd have to pick "skip" then "no" before we get a stack overflow...
        }
    };
};
for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
};