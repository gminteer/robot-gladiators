/* States:
    WIN - all robots defeated
        - fight all robots
        - defeat each robot
    LOSE - player has lost all health
*/
var playerName;
var playerHealth;
var playerAttack;
var playerMoney;
var enemyHealth;
var enemyAttack;

var fight = function(enemyName) {
    // fight or skip?
    var promptFight = 'blah';
    while((promptFight[0] != 'F') && (promptFight[0] != 'S')) {
        promptFight = window.prompt('Would you like to (F)IGHT or (S)KIP this battle? Enter "FIGHT"/"F" or "SKIP"/"S" to choose.').toUpperCase();
    }
    switch(promptFight[0]) {
        case 'F':
            while(enemyHealth > 0 && playerHealth > 0) {
                // Subract playerAttack from enemyHealth, updating enemyHealth w/ new value
                enemyHealth -= playerAttack;

                // has it lost all its health?
                if(enemyHealth <= 0) {
                    window.alert(enemyName + ' has been defeated!');
                    break;
                } else {
                    window.alert(enemyName + ' has ' + enemyHealth + ' HP left.');
                }

                // Console log
                console.log(enemyName + ' attacked by ' + playerName + ', new health: ' + enemyHealth);

                // The enemy robot swings back
                playerHealth -= enemyAttack;

                // More logging
                console.log(playerName + ' attacked by ' + enemyName + ', new health: ' + playerHealth);

                // has it lost all its health?
                if(playerHealth <= 0) {
                    window.alert(playerName + ' has been defeated!');
                    break;
                } else {
                    window.alert(playerName + ' has ' + playerHealth + ' HP left.');
                }
            }
            break;
        case 'S':
            var confirmSkip = window.confirm('Are you sure you\'d like to skip the fight?');
            if(confirmSkip && (playerMoney >= 2)) {
                window.alert(playerName + ' has skipped this fight for $2.');
                playerMoney -= 2;
                console.log('playerMoney: ' + playerMoney);
            } else if(playerMoney < 2) {
                window.alert('Not enough cash!');
                fight(enemyName);
            } else {
                fight(enemyName); // I wonder how many times you'd have to pick "skip" then "no" before we get a stack overflow...
            }
            break;
    }
};

var shop = function () {
    var promptShop = 'blah';
    while(true) {
        promptShop = window.prompt('Cash left: ' + playerMoney + '. Would you like to (R)EFILL your health, (U)PGRADE your attack, or (L)EAVE the shop?').toUpperCase();
        switch(promptShop[0]) {
            case 'R': //refill
                if((playerMoney >= 7) && (playerHealth < 100)) {
                    playerMoney -= 7;
                    playerHealth = Math.max(playerHealth + 20, 100);
                } else if(playerMoney < 2) {
                    window.alert('Not enough cash!');
                } else if(playerHealth >= 100) {
                    window.alert('Already at max health!');
                }
                break;
            case 'U': //upgrade
                if(playerMoney >= 7) {
                    playerMoney -=7;
                    playerAttack += 6;
                    window.alert('Attack power now: ' + playerAttack);
                } else {
                    window.alert('Not enough cash!');
                }
                break;
            case 'L': //leave
                if(window.confirm('Are you sure you want to leave?')) {
                    break;
                }
                break;
            }
        }
};

var endGame = function() {
    if(playerHealth > 0) {
        window.alert('Your robot lives! Final score: ' + playerMoney);
    }
    if(window.confirm('Play again?')) {
        return true;
    }
    return false;
};

var startGame = function() {
    //playerData
    playerName = window.prompt('What is your robot\'s name?');
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    //enemyData
    var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
    enemyHealth = 50;
    enemyAttack = 12;
    //fight the enemies
    for(var i = 0; i < enemyNames.length; i++) {
        // Announce the start of the round
        if(playerHealth > 0) {
            window.alert('Welcome to Robot Gladiators! Round: ' + (i + 1));
        } else {
            break;
        }
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        fight(pickedEnemyName);
        if(playerHealth > 0 && i < enemyNames.length - 1) {
            if(window.confirm('Visit shop?')) {
                shop();
            }
        }
    }
};

gameLoop = true;
while(gameLoop) {
    startGame();
    gameLoop = endGame();
}