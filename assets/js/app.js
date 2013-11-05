$(document).ready(function() {
    if(initGame() === false) {
        $('#newGame').prop('disabled', true);
    } else {
        $('#newGame').on('click', function(e) {
            newGame();
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
    // TODO: Clear local storage here?

    getShoe(2);
    stringifiedShoe = localStorage.getItem('shoe');
    log(stringifiedShoe);
    theShoe = JSON.parse(stringifiedShoe);
    log(theShoe);
}
function getShoe(decks) {
    var shoe = [];

    for (i = 0; i < decks; i++) {
        shoe.push(getDeck());
    }
    stringifiedShoe = JSON.stringify(shoe);
    localStorage.setItem('shoe', stringifiedShoe);
}
function getDeck() {
    var deck =[],
        suits = ['S', 'H', 'D', 'C'],
        faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
        card = {};

    for (var i = 0, len = suits.length; i < len; i++) {
        for (var j = 0, len2 = faces.length; j < len2; j++) {
            card = {};
            card.suit = suits[i];
            card.face = faces[j];
            deck.push(card);
        }
    }
    log(deck);
    return deck;
}


function log(msg) {
    console.log(msg);
}

