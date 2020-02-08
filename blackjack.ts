const spades: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const diamonds: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const hearts: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const clubs: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
let deck: Array<string> = [];
let player: Array<string> = [];
let dealer: Array<string> = [];
let startbutton = document.getElementById("start");
let playerdisplay = document.getElementById("playerscore");
let dealerdisplay = document.getElementById("dealerscore");
let hitbutton = document.getElementById("hit");
let standbutton = document.getElementById("stand");
let playerscore: number = 0;
let dealerscore: number = 0;
let playerstand: boolean;
let softcount: number = 0;
let wintotal: number = 0;
let tietotal: number = 0;
let losstotal: number = 0;


function shuffle() {
    deck = [...spades, ...diamonds, ...hearts, ...clubs];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck)
    return deck
}

function deal(target: Array<string>, number = 1) {
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
    shuffle();
    deal(player, 2);
    deal(dealer, 2);
    convert(player, true);
    convert(dealer, false);
    playerdisplay.innerText = `${player}`
    dealerdisplay.innerText = `${dealer}`
}

function convert(playername: Array<string>, isplayer: boolean) {
    let countscore = 0;
    const evaluatearray = playername.reduce((acc, element) => {
        if (element === "A") {
            return [...acc, element];
        }
        return [element, ...acc]
    }, []);
    console.log(evaluatearray)
    for (let i = 0; i < evaluatearray.length; i++) {
        switch (evaluatearray[i]) {
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
                countscore = countscore + parseInt(evaluatearray[i]);
                softcount = softcount + parseInt(evaluatearray[i]);
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
    console.log(countscore)
    if (isplayer === true) {
        playerscore = countscore;
    }
    else {
        dealerscore = countscore;
    }
}

function evaluate() {
    if (playerscore === 21 && playerscore === dealerscore) {
        console.log("Tie: Double Blackjack.")
    }
    else if (playerscore === 21) {
        console.log("Blackjack.  Win process.")
    }
    else if (playerscore > 21) {
        console.log("Player busted, over 21. Loss.")
    }
    else if (playerstand === true) {
        if (dealerscore === 21) {
            console.log("Player lost: Dealer has Blackjack")
        }
        else if (dealerscore > 21) {
            console.log("Dealer over 21.  Win Process.")
        }
        else if (playerscore > dealerscore) {
            console.log("Player wins on score, both under 21.")
        }
        else if (playerscore < dealerscore) {
            console.log("Player loses on score, both under 21")
        }
        else if (playerscore === dealerscore) {
            console.log("Push.  Tie display.")
        }
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
    playerdisplay.innerText = `${player}`
    convert(player, true);
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
    dealerdisplay.innerText = `${dealer}`
    evaluate()
})