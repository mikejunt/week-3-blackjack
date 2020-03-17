var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// global variables
(function () {
    var spades = [{ Suit: "♠", Value: "A" }, { Suit: "♠", Value: "2" }, { Suit: "♠", Value: "3" }, { Suit: "♠", Value: "4" }, { Suit: "♠", Value: "5" }, { Suit: "♠", Value: "6" }, { Suit: "♠", Value: "7" }, { Suit: "♠", Value: "8" }, { Suit: "♠", Value: "9" }, { Suit: "♠", Value: "10" }, { Suit: "♠", Value: "J" }, { Suit: "♠", Value: "Q" }, { Suit: "♠", Value: "K" }];
    var diamonds = [{ Suit: "♦", Value: "A" }, { Suit: "♦", Value: "2" }, { Suit: "♦", Value: "3" }, { Suit: "♦", Value: "4" }, { Suit: "♦", Value: "5" }, { Suit: "♦", Value: "6" }, { Suit: "♦", Value: "7" }, { Suit: "♦", Value: "8" }, { Suit: "♦", Value: "9" }, { Suit: "♦", Value: "10" }, { Suit: "♦", Value: "J" }, { Suit: "♦", Value: "Q" }, { Suit: "♦", Value: "K" }];
    var hearts = [{ Suit: "♥", Value: "A" }, { Suit: "♥", Value: "2" }, { Suit: "♥", Value: "3" }, { Suit: "♥", Value: "4" }, { Suit: "♥", Value: "5" }, { Suit: "♥", Value: "6" }, { Suit: "♥", Value: "7" }, { Suit: "♥", Value: "8" }, { Suit: "♥", Value: "9" }, { Suit: "♥", Value: "10" }, { Suit: "♥", Value: "J" }, { Suit: "♥", Value: "Q" }, { Suit: "♥", Value: "K" }];
    var clubs = [{ Suit: "♣", Value: "A" }, { Suit: "♣", Value: "2" }, { Suit: "♣", Value: "3" }, { Suit: "♣", Value: "4" }, { Suit: "♣", Value: "5" }, { Suit: "♣", Value: "6" }, { Suit: "♣", Value: "7" }, { Suit: "♣", Value: "8" }, { Suit: "♣", Value: "9" }, { Suit: "♣", Value: "10" }, { Suit: "♣", Value: "J" }, { Suit: "♣", Value: "Q" }, { Suit: "♣", Value: "K" }];
    var deck = [];
    var player = [];
    var dealer = [];
    var startbutton = document.getElementById("start");
    var playerdisplay = document.getElementById("playerscore");
    var dealerdisplay = document.getElementById("dealerscore");
    var hitbutton = document.getElementById("hit");
    var standbutton = document.getElementById("stand");
    var playerhold = document.getElementById("playercardholder");
    var dealerhold = document.getElementById("dealercardholder");
    var resulttext = document.getElementById("result-display");
    var playerscore = 0;
    var dealerscore = 0;
    var playerstand;
    var softcount = 0;
    var wintotal = 0;
    var pushtotal = 0;
    var losstotal = 0;
    var inprogress = false;
    // functions
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
        playerhold.innerHTML = "";
        dealerhold.innerHTML = "";
        resulttext.innerText = "";
        document.querySelectorAll(".hide-target").forEach(function (element) { return element.classList.add("dealer-hide"); });
        document.querySelectorAll(".reset-target").forEach(function (element) { return element.classList.remove("bg-win"); });
        document.querySelectorAll(".reset-target").forEach(function (element) { return element.classList.remove("bg-loss"); });
        shuffle();
        deal(player, 2);
        deal(dealer, 2);
        makecard(playerhold, player, 2);
        makecard(dealerhold, dealer, 2);
        convert(player, true);
        convert(dealer, false);
        playerdisplay.innerText = "" + playerscore;
        dealerdisplay.innerText = "" + dealerscore;
    }
    function cardsort(a, b) {
        if (a["Value"] === "A") {
            return -1;
        }
        return 0;
    }
    function convert(playername, isplayer) {
        var countscore = 0;
        softcount = 0;
        var evaluatearray = playername.sort(function (a, b) {
            if (a["Value"] != "A") {
                return -1;
            }
            else
                return 0;
        });
        for (var i = 0; i < evaluatearray.length; i++) {
            switch (evaluatearray[i]["Value"]) {
                case "K":
                case "Q":
                case "J":
                case "10": {
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
                    countscore = countscore + parseInt(evaluatearray[i]["Value"]);
                    softcount = softcount + parseInt(evaluatearray[i]["Value"]);
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
        inprogress = false;
        document.getElementById("wintext").innerText = "" + wintotal;
        document.querySelectorAll(".hide-target").forEach(function (element) { element.classList.remove("dealer-hide"); });
        document.getElementById("playerscore").classList.add("bg-win");
        document.getElementById("dealerscore").classList.add("bg-loss");
        if (playerscore === 21) {
            resulttext.innerText = "Blackjack!";
        }
        else if (dealerscore > 21) {
            resulttext.innerText = "Dealer busted.";
        }
        else
            resulttext.innerText = playerscore + " got there.";
    }
    function loss() {
        losstotal++;
        inprogress = false;
        document.querySelectorAll(".hide-target").forEach(function (element) { element.classList.remove("dealer-hide"); });
        document.getElementById("losstext").innerText = "" + losstotal;
        document.getElementById("dealerscore").classList.add("bg-win");
        document.getElementById("playerscore").classList.add("bg-loss");
        if (dealerscore === 21) {
            resulttext.innerText = "Dealer's blackjack.";
        }
        else if (playerscore > 21) {
            resulttext.innerText = "You busted.";
        }
        else
            resulttext.innerText = playerscore + " wasn't enough.";
    }
    function push() {
        pushtotal++;
        inprogress = false;
        document.querySelectorAll(".hide-target").forEach(function (element) { element.classList.remove("dealer-hide"); });
        document.getElementById("pushtext").innerText = "" + pushtotal;
        if (playerscore === 21) {
            resulttext.innerText = "Blackjack? Push.";
        }
        else
            resulttext.innerText = "It's a push.";
    }
    function makecard(target, party, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var _loop_1 = function (i) {
            var cardtraits = party[party.length - i];
            var newcard = document.createElement("div");
            newcard.classList.add("card");
            newcard.classList.add("card-trans-setup");
            newcard.innerHTML = "<div class=\"card-number float-left\">" + cardtraits["Value"] + "</div><div class=\"card-number float-left\">" + cardtraits["Suit"] + "</div><div class=\"suit-display\">" + cardtraits["Suit"] + "</div><div class=\"card-number float-right\">" + cardtraits["Suit"] + "</div><div class=\"card-number float-right\">" + cardtraits["Value"] + "</div>";
            if (cardtraits["Suit"] === "♥" || cardtraits["Suit"] === "♦") {
                newcard.classList.add("red");
            }
            else
                newcard.classList.add("black");
            target.append(newcard);
            var timer = (200 * i) + 50;
            window.setTimeout(function () {
                newcard.classList.add("card-mover");
            }, timer);
        };
        for (var i = 1; i < quantity + 1; i++) {
            _loop_1(i);
        }
    }
    // event listeners that make the game work
    startbutton.addEventListener("click", function () {
        if (inprogress === false) {
            inprogress = true;
            startgame();
            convert(player, true);
            convert(dealer, false);
            evaluate();
        }
    });
    hitbutton.addEventListener("click", function () {
        if (inprogress === true) {
            deal(player, 1);
            makecard(playerhold, player, 1);
            window.setTimeout(function () {
                convert(player, true);
                playerdisplay.innerText = "" + playerscore;
                if (playerscore > 20) {
                    evaluate();
                }
            }, 1200);
        }
    });
    standbutton.addEventListener("click", function () {
        if (inprogress === true) {
            playerstand = true;
            if (dealerscore < 17) {
                do {
                    deal(dealer, 1);
                    convert(dealer, false);
                    makecard(dealerhold, dealer, 1);
                } while (dealerscore < 17);
            }
            if (dealerscore === 17 && softcount < 8) {
                do {
                    deal(dealer, 1);
                    convert(dealer, false);
                    makecard(dealerhold, dealer, 1);
                } while (softcount < 8);
            }
            window.setTimeout(function () {
                dealerdisplay.innerText = "" + dealerscore;
                evaluate();
            }, 1200);
        }
    });
})();
