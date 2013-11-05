$(document).ready(function() {
    log('ready function is running');
    if(initGame() === false) {
        $('#newGame').prop('disabled', true);
    } else {
        $('#newGame').on('click', function(e) {
            newGame();
        });
    }
});
function initGame() {
    log('initGame() function is running, checking dependencies');
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
    log('displayStatusMessage(msg) function is running');
    $('#status').text(msg);
}

function newGame() {
    log('newGame() function is running');
    // TODO: Clear local storage here?

    getShoe(2);
    dealHands();
    displayDealerHand(false);
    displayPlayerHand();

    // Show 'hit' and 'stand' buttons
    $('#btn-hit').fadeIn();
    $('#btn-stand').fadeIn();

    stringifiedShoe = localStorage.getItem('shoe');
    // log(stringifiedShoe);
    log('newGame() got the shoe from local storage');
    theShoe = JSON.parse(stringifiedShoe);
    // log(theShoe);
    log('newGame() parsed the stringified shoe into an object');
}

function getShoe(decks) {
    log('getShoe(decks) function is running where decks is: ' + decks);
    var shoe = [];

    log('localStorage in the beginning of getShoe() is:');
    console.dir(localStorage);

    for (i = 0; i < decks; i++) {
        shoe.push(getDeck());
    }
    log('shoe length: ' + shoe.length);
    stringifiedShoe = JSON.stringify(shoe);
    localStorage.setItem('shoe', stringifiedShoe);
}
function getDeck() {
    log('getDeck() function is running');
    var deck = [],
        suits = ['S', 'H', 'D', 'C'],
        faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
        card = {},
        shuffledDeck = [];

    for (var i = 0, len = suits.length; i < len; i++) {
        for (var j = 0, len2 = faces.length; j < len2; j++) {
            card = {};
            card.suit = suits[i];
            card.face = faces[j];
            deck.push(card);
        }
    }
    // TODO: investigate why this returns shuffled deck before it's shuffled
    log('getDeck() makes this deck:');
    log(deck);
    shuffledDeck = shuffleDeck(deck);
    log('getDeck() just shuffled the deck like this:');
    log(shuffledDeck);
    return shuffledDeck;
}


function log(msg) {
    console.log(msg);
}
function shuffleDeck(o) {
    log('shuffleDeck(o) function is running with object: ' + o);
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function dealCard() {
    log('dealCard() function is running');
    var shoeArray = [],
        shoeArrayStringified,
        cardFace,
        cardSuit,
        cardImage,
        cardRegEx,
        cardFaces,
        cardFileFaces,
        cardFaceIndex,
        cardFileFace,
        cardValues,
        cardObj;

    // TODO: figure out why they get the same card

    // Get the deck(s) out of localStorage in string form
    shoeArrayStringified = localStorage.getItem('shoe');

    // JSONify it
    shoeArray = JSON.parse(shoeArrayStringified);

    // Get the first item
    card = shoeArray[0].splice(0, 1);

    // Make card an object instead of a one-element array
    card = card[0];
    log('dealCard() says card is: ' + card);
    log(card);
    cardFace = card.face;
    cardSuit = card.suit;

    // If card is a single-digit number, pad a zero for filename
    //cardRegEx = cardFace.match(/^[0-9]$/);
    //if (cardRegEx !== null) {
        //cardFace = '0'+ cardFace;
    //}
    
    // Prepare to substitute filename values for the card faces
    cardFaces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    cardFileFaces = ['01','02','03','04','05','06','07','08','09','10','11','12','13'];
    cardValues = [1,2,3,4,5,6,7,8,9,10,10,10,10];
    
    cardFaceIndex = cardFaces.indexOf(cardFace);
    cardFileFace = cardFileFaces[cardFaceIndex];

    // Example file name: h02.png
    cardImage = cardSuit.toLowerCase() + cardFileFace + '.png';
    log(cardImage);

    shoeArrayStringified = JSON.stringify(shoeArray);
    localStorage.setItem('shoe', shoeArrayStringified);

    // This it the object to return
    cardObj = {};
    cardObj.image = cardImage;
    cardObj.value = cardValues[cardFaceIndex];
    log(cardObj);

    return cardObj;
}

function dealHands() {
    log('dealHands() function is running');
    var dealerHand = [],
        playerHand = [],
        dealerHandStringified,
        playerHandStringified;

    // Deal two cards each
    dealerHand.push(dealCard('dealer'));
    dealerHand.push(dealCard('dealer'));
    playerHand.push(dealCard('player'));
    playerHand.push(dealCard('player'));

    dealerHandStringified = JSON.stringify(dealerHand);
    playerHandStringified = JSON.stringify(playerHand);

    localStorage.setItem('dealerHand', dealerHandStringified);
    localStorage.setItem('playerHand', playerHandStringified);
}

function displayDealerHand(reveal) {
    log('displayDealerHand(reveal) function is running with arg of: ' + reveal);
    var dealerHandStringified, dealerHand, hand;

    dealerHandStringified = localStorage.getItem('dealerHand');
    dealerHand = JSON.parse(dealerHandStringified);

    if (reveal === true) {
        hand = {};
        hand.cards = dealerHand;
    } else {
        hand = {};
        hand.cards = dealerHand[0];
        hand.back = true;
    }

    var template = $('#tpl-hand').html();
    var html = Mustache.render(template, hand);

    $('#dealer-hand').html(html);
}

function displayPlayerHand() {
    log('displayPlayerHand() function is running');
    var playerHandStringified, playerHand, hand;

    playerHandStringified = localStorage.getItem('playerHand');
    playerHand = JSON.parse(playerHandStringified);
    hand = playerHand;

    var template = $('#tpl-hand').html();
    var html = Mustache.render(template, hand);

    $('#player-hand').html(html);
}

function displayStatusMessage(msg) {
    log('displayStatusMessage(msg) function is running where msg is: ' + msg);
    $('#status').text(msg);
}

