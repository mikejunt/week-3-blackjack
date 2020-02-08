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
var playerscore = 0;
var dealerscore = 0;
function shuffle() {
    var _a;
    deck = __spreadArrays(spades, diamonds, hearts, clubs);
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [deck[j], deck[i]], deck[i] = _a[0], deck[j] = _a[1];
    }
    console.log(deck);
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
    shuffle();
    deal(player, 2);
    console.log(player);
    deal(dealer, 2);
    console.log(dealer);
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
    console.log(evaluatearray);
    for (var i = 0; i < evaluatearray.length; i++) {
        switch (evaluatearray[i]) {
            case "K":
            case "Q":
            case "J":
            case "0": {
                countscore = countscore + 10;
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
                break;
            }
            case "A": if (countscore < 11) {
                countscore = countscore + 11;
            }
            else {
                countscore++;
            }
        }
    }
    console.log(countscore);
    if (isplayer === true) {
        playerscore = countscore;
    }
    else {
        dealerscore = countscore;
    }
}
startbutton.addEventListener("click", function () {
    startgame();
    convert(player, true);
    convert(dealer, false);
    console.log("P: " + playerscore + " D:" + dealerscore);
});
hitbutton.addEventListener("click", function () {
    deal(player, 1);
    playerdisplay.innerText = "" + player;
});
