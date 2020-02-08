var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var spades = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
var diamonds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
var hearts = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
var clubs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
var deck = [];
var player = [];
var dealer = [];
var startbutton = document.getElementById("start");
var playerdisplay = document.getElementById("playerscore");
var dealerdisplay = document.getElementById("dealerscore");
var hitbutton = document.getElementById("hit");
var standbutton = document.getElementById("stand");
var playerscore = 0;
var dealerscore = 0;
var playerstand;
var softcount = 0;
var wintotal = 0;
var pushtotal = 0;
var losstotal = 0;
function shuffle() {
    var _a;
    deck = __spreadArrays(spades, diamonds, hearts, clubs);
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [deck[j], deck[i]], deck[i] = _a[0], deck[j] = _a[1];
    }
    return deck;
}
function deal(target, number) {
    if (number === void 0) { number = 1; }
    var cards = 0;
    do {
        target.push(deck.pop());
        cards++;
    } while (cards < number);
}
function startgame() {
    player = [];
    dealer = [];
    playerscore = 0;
    dealerscore = 0;
    softcount = 0;
    playerstand = false;
    shuffle();
    deal(player, 2);
    deal(dealer, 2);
    convert(player, true);
    convert(dealer, false);
    playerdisplay.innerText = "" + player;
    dealerdisplay.innerText = "" + dealer;
}
function convert(playername, isplayer) {
    var countscore = 0;
    var evaluatearray = playername.reduce(function (acc, element) {
        if (element === "A") {
            return __spreadArrays(acc, [element]);
        }
        return __spreadArrays([element], acc);
    }, []);
    for (var i = 0; i < evaluatearray.length; i++) {
        switch (evaluatearray[i]) {
            case "K":
            case "Q":
            case "J":
            case "0": {
                countscore = countscore + 10;
                softcount = softcount + 10;
                break;
            }
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
                countscore = countscore + parseInt(evaluatearray[i]);
                softcount = softcount + parseInt(evaluatearray[i]);
                break;
            }
            case "A":
                softcount++;
                if (countscore < 11) {
                    countscore = countscore + 11;
                }
                else {
                    countscore++;
                }
        }
    }
    if (isplayer === true) {
        playerscore = countscore;
    }
    else {
        dealerscore = countscore;
    }
}
function evaluate() {
    if (playerscore === 21 && playerscore === dealerscore) {
        push();
    }
    else if (playerscore === 21) {
        win();
    }
    else if (playerscore > 21) {
        loss();
    }
    else if (playerstand === true) {
        if (dealerscore === 21) {
            loss();
        }
        else if (dealerscore > 21 || playerscore > dealerscore) {
            win();
        }
        else if (playerscore < dealerscore) {
            loss();
        }
        else if (playerscore === dealerscore) {
            push();
        }
    }
}
function win() {
    wintotal++;
    console.log(wintotal + " wins.  " + losstotal + " losses.  " + pushtotal + " push.");
    if (playerscore === 21) {
        console.log("Blackjack!");
    }
    else if (dealerscore > 21) {
        console.log("Dealer Busted!");
    }
    else
        console.log("Won on score!");
}
function loss() {
    losstotal++;
    console.log(wintotal + " wins.  " + losstotal + " losses.  " + pushtotal + " push.");
    if (dealerscore === 21) {
        console.log("Dealer blackjack.");
    }
    else if (playerscore > 21) {
        console.log("Player busted.");
    }
    else
        console.log("Loss on score.");
}
function push() {
    pushtotal++;
    console.log(wintotal + " wins.  " + losstotal + " losses.  " + pushtotal + " push.");
    if (playerscore === 21) {
        console.log("Double blackjack?!");
    }
    else
        console.log("Score matched, push.");
}
startbutton.addEventListener("click", function () {
    startgame();
    convert(player, true);
    convert(dealer, false);
    console.log("P: " + playerscore + " D:" + dealerscore);
    evaluate();
});
hitbutton.addEventListener("click", function () {
    deal(player, 1);
    playerdisplay.innerText = "" + player;
    convert(player, true);
    if (playerscore > 20) {
        evaluate();
    }
});
standbutton.addEventListener("click", function () {
    playerstand = true;
    if (dealerscore < 17) {
        do {
            deal(dealer, 1);
            convert(dealer, false);
        } while (dealerscore < 17);
    }
    if (dealerscore === 17 && softcount < 7) {
        do {
            deal(dealer, 1);
            convert(dealer, false);
        } while (softcount < 7);
    }
    dealerdisplay.innerText = "" + dealer;
    evaluate();
});
