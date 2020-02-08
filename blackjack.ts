const spades: Array<object> = [{Suit: "S", Value: "A"}, {Suit: "S", Value: "2"},{Suit: "S", Value: "3"}, {Suit: "S", Value: "4"},{Suit: "S", Value: "5"}, {Suit: "S", Value: "6"},{Suit: "S", Value: "7"}, {Suit: "S", Value: "8"},{Suit: "S", Value: "9"}, {Suit: "S", Value: "0"},{Suit: "S", Value: "J"}, {Suit: "S", Value: "Q"},{Suit: "S", Value: "K"}];
const diamonds: Array<object> = [{Suit: "D", Value: "A"}, {Suit: "D", Value: "2"},{Suit: "D", Value: "3"}, {Suit: "D", Value: "4"},{Suit: "D", Value: "5"}, {Suit: "D", Value: "6"},{Suit: "D", Value: "7"}, {Suit: "D", Value: "8"},{Suit: "D", Value: "9"}, {Suit: "D", Value: "0"},{Suit: "D", Value: "J"}, {Suit: "D", Value: "Q"},{Suit: "D", Value: "K"}];
const hearts: Array<object> = [{Suit: "H", Value: "A"}, {Suit: "H", Value: "2"},{Suit: "H", Value: "3"}, {Suit: "H", Value: "4"},{Suit: "H", Value: "5"}, {Suit: "H", Value: "6"},{Suit: "H", Value: "7"}, {Suit: "H", Value: "8"},{Suit: "H", Value: "9"}, {Suit: "H", Value: "0"},{Suit: "H", Value: "J"}, {Suit: "H", Value: "Q"},{Suit: "H", Value: "K"}];
const clubs: Array<object> = [{Suit: "C", Value: "A"}, {Suit: "C", Value: "2"},{Suit: "C", Value: "3"}, {Suit: "C", Value: "4"},{Suit: "C", Value: "5"}, {Suit: "C", Value: "6"},{Suit: "C", Value: "7"}, {Suit: "C", Value: "8"},{Suit: "C", Value: "9"}, {Suit: "C", Value: "0"},{Suit: "C", Value: "J"}, {Suit: "C", Value: "Q"},{Suit: "C", Value: "K"}];
let deck: Array<object> = [];
let player: Array<object> = [];
let dealer: Array<object> = [];
let startbutton = document.getElementById("start");
let playerdisplay = document.getElementById("playerscore");
let dealerdisplay = document.getElementById("dealerscore");
let hitbutton = document.getElementById("hit");
let standbutton = document.getElementById("stand");
let playerhold = document.getElementById("playercardholder")
let playerscore: number = 0;
let dealerscore: number = 0;
let playerstand: boolean;
let softcount: number = 0;
let wintotal: number = 0;
let pushtotal: number = 0;
let losstotal: number = 0;



function shuffle() {
    deck = [...spades, ...diamonds, ...hearts, ...clubs];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck
}

function deal(target: Array<object>, number = 1) {
    let cards: number = 0;
    do {
        target.push(deck.pop());
        cards++
    }
    while (cards < number)
}

function startgame() {
    player = [];
    dealer = [];
    playerscore = 0;
    dealerscore = 0;
    softcount = 0;
    playerstand = false;
    playerhold.innerHTML = ""
    shuffle();
    deal(player, 2);
    deal(dealer, 2);
    makecard(playerhold, 2)
    convert(player, true);
    convert(dealer, false);
    playerdisplay.innerText = `${playerscore}`
    dealerdisplay.innerText = `${dealerscore}`
}

function cardsort(a: object, b ) {
    if ( a["Value"] === "A"){
      return 1;
    }
    return 0;
  }

function convert(playername: Array<object>, isplayer: boolean) {
    let countscore = 0;
    const evaluatearray: Array<object> = playername.sort(cardsort)
    for (let i = 0; i < evaluatearray.length; i++) {
        switch (evaluatearray[i]["Value"]) {
            case "K":
            case "Q":
            case "J":
            case "0": { countscore = countscore + 10; softcount = softcount + 10; break }
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
                break
            }
            case "A": softcount++;
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
        win()
    }
    else if (playerscore > 21) {
        loss()
    }
    else if (playerstand === true) {
        if (dealerscore === 21) {
            loss()
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
    console.log(`${wintotal} wins.  ${losstotal} losses.  ${pushtotal} push.`)
    if (playerscore === 21) {
        console.log("Blackjack!")
    }
    else if (dealerscore > 21) {
        console.log("Dealer Busted!")
    }
    else console.log("Won on score!")
}

function loss() {
    losstotal++;
    console.log(`${wintotal} wins.  ${losstotal} losses.  ${pushtotal} push.`)
    if (dealerscore === 21) {
        console.log("Dealer blackjack.")
    }
    else if (playerscore > 21) {
        console.log("Player busted.")
    }
    else console.log("Loss on score.")
}

function push() {
    pushtotal++;
    console.log(`${wintotal} wins.  ${losstotal} losses.  ${pushtotal} push.`)
    if (playerscore === 21) {
        console.log("Double blackjack?!")
    }
    else console.log("Score matched, push.")
}

function makecard(target,quantity=1) {
   for (let i=1; i<quantity+1;i++) {
       let cardtraits=player[player.length-i];
       let newcard = document.createElement("div");
       newcard.classList.add("card");
       newcard.innerHTML = `${cardtraits["Value"]} - ${cardtraits["Suit"]}`
       target.append(newcard);
   }
}

startbutton.addEventListener("click", () => {
    startgame()
    convert(player, true);
    convert(dealer, false);
    console.log(`P: ${playerscore} D:${dealerscore}`);
    evaluate()
})

hitbutton.addEventListener("click", () => {
    deal(player, 1);
    makecard(playerhold,1);
    convert(player, true);
    playerdisplay.innerText = `${playerscore}`
    if (playerscore > 20) {
        evaluate()
    }
})

standbutton.addEventListener("click", () => {
    playerstand = true;
    if (dealerscore < 17) {
        do {
            deal(dealer, 1);
            convert(dealer, false)
        }
        while (dealerscore < 17)
    }
    if (dealerscore === 17 && softcount < 7) {
        do {
            deal(dealer, 1);
            convert(dealer, false)
        }
        while (softcount < 7)
    }
    dealerdisplay.innerText = `${dealerscore}`
    evaluate()
})