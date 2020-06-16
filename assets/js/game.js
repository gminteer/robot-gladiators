/* States:
    WIN - all robots defeated
        - fight all robots
        - defeat each robot
    LOSE - player has lost all health
*/
var player = {
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {
            this.money -= 7;
            this.health += 20;
        } else {
            window.alert('Not enough cash!');
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            this.money -=7;
            this.attack += 6;
            window.alert('Attack power now: ' + player.attack);
        } else {
            window.alert('Not enough cash!');
        }
    }
}
var enemy;

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

var fight = function(enemy) {
    // fight or skip?
    console.info(enemy);
    promptFight = 'blah';
    while((promptFight[0] != 'F') && (promptFight[0] != 'S')) {
        promptFight = window.prompt('Would you like to (F)IGHT or (S)KIP this battle? Enter "FIGHT"/"F" or "SKIP"/"S" to choose.');
        if(promptFight) {
            promptFight = promptFight.toUpperCase();
        } else {
            promptFight = 'blah';
        }
    }
    switch(promptFight[0]) {
        case 'F':
            while(enemy.health > 0 && player.health > 0) {
                // Subract player.attack from enemy.health, updating enemy.health w/ new value
                var damage = randomNumber(player.attack - 3, player.attack);
                enemy.health = Math.max(0, enemy.health - damage);

                // Console log
                console.log(enemy.anme + ' attacked for ' + damage + ' dmg by ' + player.name + ', new health: ' + enemy.health);

                // has it lost all its health?
                if(enemy.health <= 0) {
                    window.alert(enemy.name + ' has been defeated!');
                    break;
                } else {
                    window.alert(enemy.name + ' has ' + enemy.health + ' HP left.');
                }

                // The enemy robot swings back
                damage = randomNumber(enemy.attack - 3, enemy.attack);
                player.health = Math.max(0, player.health - damage);

                // More logging
                console.log(player.name + ' attacked for ' + damage + ' dmg by ' + enemy.name + ', new health: ' + player.health);

                // has it lost all its health?
                if(player.health <= 0) {
                    window.alert(player.name + ' has been defeated!');
                    break;
                } else {
                    window.alert(player.name + ' has ' + player.health + ' HP left.');
                }
            }
            break;
        case 'S':
            var confirmSkip = window.confirm('Are you sure you\'d like to skip the fight?');
            if(confirmSkip && (player.money >= 10)) {
                window.alert(player.name + ' has skipped this fight for $2.');
                player.money = Math.max(0, player.money - 10);
                console.log('player.money: ' + player.money);
            } else if(player.money < 2) {
                window.alert('Not enough cash!');
                fight(enemy.name);
            } else {
                fight(enemy.name); // I wonder how many times you'd have to pick "skip" then "no" before we get a stack overflow...
            }
            break;
    }
};

var shop = function () {
    var promptShop = 'blah';
    while(true) {
        promptShop = window.prompt('Cash left: ' + player.money + '. Would you like to (R)EFILL your health, (U)PGRADE your attack, or (L)EAVE the shop?');
        if(promptShop) {
            promptShop = promptShop.toUpperCase();
        } else {
            promptShop = 'blah';
        }
        switch(promptShop[0]) {
            case 'R': //refill
                player.refillHealth();
                break;
            case 'U': //upgrade
                player.upgradeAttack();
                break;
            case 'L': //leave
                if(window.confirm('Are you sure you want to leave?')) {
                    return;
                }
                break;
            }
        }
};

var endGame = function() {
    if(player.health > 0) {
        window.alert('Your robot lives! Final score: ' + player.money);
    } else {
        window.alert('Your robot has been turned into scrap!');
    }
    if(window.confirm('Play again?')) {
        return true;
    } else {
        window.alert('Thanks for playing!');
    }
    return false;
};

var startGame = function() {
    //playerData
    player.name = window.prompt('What is your robot\'s name?');
    player.reset();
    //enemyData
    enemy = [{
            name: "Roborto",
            attack: 12
        },
        {
            name: "Amy Android",
            attack: 13
        },
        {
            name: "Robo Trumble",
            attack: 14
        }];
    //fight the enemies
    for(var i = 0; i < enemy.length; i++) {
        // Announce the start of the round
        if(player.health > 0) {
            window.alert('Welcome to Robot Gladiators! Round: ' + (i + 1));
        } else {
            break;
        }
        var pickedEnemy = enemy[i];
        pickedEnemy.health = randomNumber(40, 60);
        fight(pickedEnemy);
        if(player.health > 0 && i < enemy.length - 1) {
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