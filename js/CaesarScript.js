// === Global Vars ===
const trigraphs = "the and tha ent ion tio for nce has tis oft men you".split(' ');
const digraphs = "th he an in er on re ed nd ha at en es of nt ea ti to io le is ou ar as de rt ve ss ee tt ff ll mm oo ck ce".split(' ');
const highFreq = "e t a o i n s r h".split(' ');
const lowFreq = "z q j x k v b y w".split(' ');

// ========== Caesar Solving Algorithm - Joshua Lowe, GitHub - https://github.com/lowejosh/ ========== //
let csrHits = 0;
let csrShiftAmount = 13;

function solve() {
    // Grab the csrCipherText
    let input = document.getElementById("csrCipherText").value.toLowerCase();

    // Variables
    let bestScore = 0;
    let bestKeySoFar; 

    // Brute for shift the ciphertext and regex all hits and keep a score
    let shiftedText;
    for (let i = 0; i < 26; i++) {
        shiftedText = shiftText(input, i);
        let csrHits = 0;

        // Check and calculate hits
        csrHits+=checkHits(shiftedText, trigraphs, 20);
        csrHits+=checkHits(shiftedText, digraphs, 10);
        csrHits+=checkHits(shiftedText, highFreq, 2);
        csrHits+=checkHits(shiftedText, lowFreq, -2);
        
        // If this shift has the most hits so far, save the key
        if (csrHits > bestScore) {
            bestScore = csrHits;
            bestKeySoFar = i;
        }
    }

     // Update the HTML
    document.getElementById("csrPlaintext").value = shiftText(input, bestKeySoFar);
    if (!document.getElementById("csrCipherText").value.match(/[a-z]/i)) {
        document.getElementById("shift").innerHTML = "";
    } else {
        document.getElementById("shift").innerHTML = "Key " + (26 - bestKeySoFar);
    }
}

// Shifts the input across the alphabet for a given key
function shiftText(input, key) {
    let shiftedText = "";
    // For ever character
    for (let i = 0; i < input.length; i++) {
        // If it is a letter
        if (input[i].match(/[a-z]/i)) {
            // Shift the letter using it's character code
            shiftedText+=String.fromCharCode(97 + ((input.charCodeAt(i) + key - 97) % 26)); 
        } else {
            shiftedText+=input[i];
        }
    }
    return shiftedText;
}

// Shift to create a cipher
function shift() {
    // Grab the csrPlaintext
    let input = document.getElementById("csrPlaintext2").value.toLowerCase();

    // Code the csrCipherText
    let csrCipherText = shiftText(input, csrShiftAmount); 

    // Update the HTML
    document.getElementById("csrCipherText2").value = csrCipherText;
    document.getElementById("csrShiftAmount").innerHTML = "Key " + csrShiftAmount;
}

// Start the placeholder decoding
solve();

// ========== HELPER FUNCTIONS ========== //

// Checks the given text for hits from a given array of hit registers and counts the score
function checkHits(input, hitReg, score) {
    let hits = 0;
    for (let i = 0; i < hitReg.length; i++) {
        let re = new RegExp(hitReg[i],"g");
        // If there are matches, decrement hits
        while (re.exec(input) !== null) {
            hits+=score;
        }
    }
    return hits;
}

// Increment the shift
function incShift() {
    csrShiftAmount++;
    if (csrShiftAmount <= 26) {
        shift();
    } else {
        csrShiftAmount = 1;
        shift();
    }
}

// Decrement the shift
function decShift() {
    csrShiftAmount--;
    if (csrShiftAmount >= 1) {
        shift();
    } else {
        csrShiftAmount = 26;
        shift();
    }
}

// Flip card
function flip() {
    document.getElementById("card").style.transform = "rotateY(180deg)";
    document.getElementById("imgFlipBack").style.transform = "rotateY(180deg)";
    shift();
}

// Flip card back
function flipBack() {
    document.getElementById("card").style.transform = "rotateY(0deg)";
    document.getElementById("imgFlip").style.transform = "rotateY(0deg)";
    solve();
}
