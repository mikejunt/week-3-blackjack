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
let playerscore: number = 0;
let dealerscore: number = 0;


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
    shuffle();
    deal(player, 2);
    console.log(player);
    deal(dealer, 2);
    console.log(dealer);
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
            case "0": { countscore = countscore + 10; break }
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": { countscore = countscore + parseInt(evaluatearray[i]); break }
            case "A": if (countscore < 11) {
                countscore = countscore + 11;
            }
            else {
                countscore++
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




startbutton.addEventListener("click", () => {
    startgame()
    convert(player, true);
    convert(dealer, false);
    console.log(`P: ${playerscore} D:${dealerscore}`);
})


hitbutton.addEventListener("click", () => {
    deal(player, 1);
    playerdisplay.innerText = `${player}`
})