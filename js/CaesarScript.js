// ========== Caesar Solving Algorithm - Joshua Lowe, GitHub - https://github.com/lowejosh/ ========== //
// Global Variables
let hits = 0;
let littleHits = 0;
let shiftAmount = 13;

function solve() {
    // Grab the ciphertext
    let input = document.getElementById("ciphertext").value.toLowerCase();

    // Variables
    let bestScore = 0;
    let bestKeySoFar; 

    // Hits
    let trigraphs = "the and tha ent ion tio for nce has tis oft men".split(' ');
    let digraphs = "th he an in er on re ed nd ha at en es of nt ea ti to io le is ou ar as de rt ve ss ee tt ff ll mm oo ck".split(' ');
    let highFreq = "e t a o i n s r h".split(' ');
    let lowFreq = "z q j x k v b y w".split(' ');

    // Brute for shift the ciphertext and regex all hits and keep a score
    let shiftedText;
    for (let i = 0; i < 26; i++) {
        shiftedText = shiftText(input, i);
        let hits = 0;

        // Check trigraphs
        for (let ii = 0; ii < trigraphs.length; ii++) {
            let re = new RegExp(trigraphs[ii],"g");
            // If there are trigraph matches, increment hits by 2 for each one
            while (re.exec(shiftedText) !== null) {
                hits+=20;
            }
        }
        
        // Check digraphs
        for (let ii = 0; ii < digraphs.length; ii++) {
            let re = new RegExp(digraphs[ii],"g");
            // If there are digraph matches, increment hits by 1 for each one
            while (re.exec(shiftedText) !== null) {
                hits+=10;
            }
        }

        // Check high frequency letters
        for (let ii = 0; ii < highFreq.length; ii++) {
            let re = new RegExp(highFreq[ii],"g");
            // If there are matches, increment hits by 0.2 for each one
            while (re.exec(shiftedText) !== null) {
                hits+=2;
            }
        }

        // Check low frequency letters
        for (let ii = 0; ii < lowFreq.length; ii++) {
            let re = new RegExp(lowFreq[ii],"g");
            // If there are matches, decrement hits by 0.2 for each one
            while (re.exec(shiftedText) !== null) {
                hits-=2;
            }
        }
        
        // If this shift has the most hits so far, save the key
        if (hits > bestScore) {
            bestScore = hits;
            bestKeySoFar = i;
        }
    }

     // Update the HTML
    document.getElementById("plaintext").value = shiftText(input, bestKeySoFar);
    if (!document.getElementById("ciphertext").value.match(/[a-z]/i)) {
        document.getElementById("shift").innerHTML = "";
    } else {
        document.getElementById("shift").innerHTML = "Key: " + (26 - bestKeySoFar);
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

// Flip card
function flip() {
//    document.getElementById("plaintext2").value = document.getElementById("plaintext").value;
    document.getElementById("card").style.transform = "rotateY(180deg)";
    document.getElementById("imgFlipBack").style.transform = "rotateY(180deg)";
    shift();
}

// Flip card back
function flipBack() {
//    document.getElementById("ciphertext").value = document.getElementById("ciphertext2").value;
    document.getElementById("card").style.transform = "rotateY(0deg)";
    document.getElementById("imgFlip").style.transform = "rotateY(0deg)";
    solve();
}

// Shift to create a cipher
function shift() {
    // Grab the plaintext
    let input = document.getElementById("plaintext2").value.toLowerCase();

    // Code the ciphertext
    let ciphertext = shiftText(input, shiftAmount); 

    // Update the HTML
    document.getElementById("ciphertext2").value = ciphertext;
    document.getElementById("shiftAmount").innerHTML = shiftAmount;
}

// Increment the shift
function incShift() {
    console.log("REACHED");
    if (shiftAmount < 26) {
        shiftAmount++;
        shift();
    }
}

// Decrement the shift
function decShift() {
    if (shiftAmount > 1) {
        shiftAmount--;
        shift();
    }
}

// Start the placeholder decoding
solve();