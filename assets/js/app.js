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

function log(msg) {
    console.log(msg);
}
