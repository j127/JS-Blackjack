$(document).ready(function() {
    if(initGame() === false) {
        $('#newGame').prop('disabled', true);
    } else {
        $('#newGame').on('click', function(e) {

        });
    }
});
function initGame() {
    var initErrors = [], errorMessage = '';

    if(Modernizr.localstorage) {
        log('Modernizer found');
    } else {
        initErrors.push('Local storage not available.');
    }
    if(window.Mustache) {
        log('Mustache found');
    } else {
        initErrors.push('Mustache not available.');
        log('Mustache not found');
    }

    if(initErrors.length > 0) {
        var errorString = initErrors.join(', ');
        errorMessage = 'Houston, we have a problem! (' + initErrors + ')';
        log(errorMessage);
        displayStatusMessage(errorMessage);
        return false;
    } else {
        errorMessage = 'Ready to play? Click "New Game" to start!';
        displayStatusMessage(errorMessage);
        return true;
    }


    
}

function displayStatusMessage(msg) {
    $('#status').text(msg);
}

function newGame() {
    getShoe();
}
function getShoe() {
    
}
function getDeck() {
    var deck =[],
        suits = ['S', 'H', 'D', 'C'],
        faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
        card = {};

    for (var i = 0, len = suits.length; i < len; i++) {
        for (var j = 0, len2 = faces.length; j < len2; j++) {
            //log('j:');
            //log(j);
            //log('i:');
            //log(i);
            card.suit = suits[i];
            card.face = faces[j];
            //log(card);
            deck.push(card);
        }
    }
    log(deck);
}


function log(msg) {
    console.log(msg);
}

