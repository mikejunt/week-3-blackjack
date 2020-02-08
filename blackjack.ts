// global variables
const spades: Array<object> = [{ Suit: "♠", Value: "A" }, { Suit: "♠", Value: "2" }, { Suit: "♠", Value: "3" }, { Suit: "♠", Value: "4" }, { Suit: "♠", Value: "5" }, { Suit: "♠", Value: "6" }, { Suit: "♠", Value: "7" }, { Suit: "♠", Value: "8" }, { Suit: "♠", Value: "9" }, { Suit: "♠", Value: "10" }, { Suit: "♠", Value: "J" }, { Suit: "♠", Value: "Q" }, { Suit: "♠", Value: "K" }];
const diamonds: Array<object> = [{ Suit: "♦", Value: "A" }, { Suit: "♦", Value: "2" }, { Suit: "♦", Value: "3" }, { Suit: "♦", Value: "4" }, { Suit: "♦", Value: "5" }, { Suit: "♦", Value: "6" }, { Suit: "♦", Value: "7" }, { Suit: "♦", Value: "8" }, { Suit: "♦", Value: "9" }, { Suit: "♦", Value: "10" }, { Suit: "♦", Value: "J" }, { Suit: "♦", Value: "Q" }, { Suit: "♦", Value: "K" }];
const hearts: Array<object> = [{ Suit: "♥", Value: "A" }, { Suit: "♥", Value: "2" }, { Suit: "♥", Value: "3" }, { Suit: "♥", Value: "4" }, { Suit: "♥", Value: "5" }, { Suit: "♥", Value: "6" }, { Suit: "♥", Value: "7" }, { Suit: "♥", Value: "8" }, { Suit: "♥", Value: "9" }, { Suit: "♥", Value: "10" }, { Suit: "♥", Value: "J" }, { Suit: "♥", Value: "Q" }, { Suit: "♥", Value: "K" }];
const clubs: Array<object> = [{ Suit: "♣", Value: "A" }, { Suit: "♣", Value: "2" }, { Suit: "♣", Value: "3" }, { Suit: "♣", Value: "4" }, { Suit: "♣", Value: "5" }, { Suit: "♣", Value: "6" }, { Suit: "♣", Value: "7" }, { Suit: "♣", Value: "8" }, { Suit: "♣", Value: "9" }, { Suit: "♣", Value: "10" }, { Suit: "♣", Value: "J" }, { Suit: "♣", Value: "Q" }, { Suit: "♣", Value: "K" }];
let deck: Array<object> = [];
let player: Array<object> = [];
let dealer: Array<object> = [];
let startbutton = document.getElementById("start");
let playerdisplay = document.getElementById("playerscore");
let dealerdisplay = document.getElementById("dealerscore");
let hitbutton = document.getElementById("hit");
let standbutton = document.getElementById("stand");
let playerhold = document.getElementById("playercardholder");
let dealerhold = document.getElementById("dealercardholder");
let playerscore: number = 0;
let dealerscore: number = 0;
let playerstand: boolean;
let softcount: number = 0;
let wintotal: number = 0;
let pushtotal: number = 0;
let losstotal: number = 0;

// functions
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
    dealerhold.innerHTML = ""
    document.querySelectorAll(".hide-target").forEach((element)=>element.classList.add("dealer-hide"))
    shuffle();
    deal(player, 2);
    deal(dealer, 2);
    makecard(playerhold,player, 2);
    makecard(dealerhold,dealer, 2)
    convert(player, true);
    convert(dealer, false);
    playerdisplay.innerText = `${playerscore}`
    dealerdisplay.innerText = `${dealerscore}`
}

function cardsort(a: object, b) {
    if (a["Value"] === "A") {
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
            case "10": { countscore = countscore + 10; softcount = softcount + 10; break }
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
    document.querySelectorAll(".hide-target").forEach((element)=>{element.classList.remove("dealer-hide")})
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

function makecard(target,party: Array<object>,quantity = 1) {
    for (let i = 1; i < quantity + 1; i++) {
        let cardtraits = party[party.length - i];
        let newcard = document.createElement("div");
        newcard.classList.add("card");
        newcard.innerHTML = `<div class="card-number float-left">${cardtraits["Value"]}</div><div class="suit-display">${cardtraits["Suit"]}</div><div class="card-number float-right">${cardtraits["Value"]}</div>`
        if (cardtraits["Suit"] === "♥" || cardtraits["Suit"] === "♦") { newcard.classList.add("red") }
        else newcard.classList.add("black");
        target.append(newcard);
    }
}

// event listeners that make the game work
startbutton.addEventListener("click", () => {
    startgame()
    convert(player, true);
    convert(dealer, false);
    evaluate()
})

hitbutton.addEventListener("click", () => {
    deal(player, 1);
    makecard(playerhold,player,1);
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
            convert(dealer, false);
            makecard(dealerhold,dealer,1)
        }
        while (dealerscore < 17)
    }
    if (dealerscore === 17 && softcount < 7) {
        do {
            deal(dealer, 1);
            convert(dealer, false)
            makecard(dealerhold,dealer,1)
        }
        while (softcount < 7)
    }
    dealerdisplay.innerText = `${dealerscore}`
    evaluate()
})