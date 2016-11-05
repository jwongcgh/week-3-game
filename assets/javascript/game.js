
    var alreadyUsed = []; // stores used letters
    var userEntry; // stores user input
    var userGuess; // also stores user input
    var trials = 0; // tracks number of user guesses
    var wordArr = ["hello", "divine", "industrial", "answer", "guess", "question", "primal", "computer", "fellow", "organic", "zucchini", "tentacle", "mountain", "variable", "notable", "double", "abdomen", "technique", "gamble", "material"]
    var punches = 0;
    var punches1;
    var punches2;
    var lives = 7;
    var butt = ["butt1", "butt2", "butt3", "butt4", "butt5", "butt6", "butt7"]
    var wins = 0;
    var wordCount = 0;
    var nextWord = true;
    var store = false;
    var compWord;

    // ********** start game by pressing enter/return key **********

    // will listen but trigger only when nextWord value is true
    // nextWord = true allows retrieving a new word
    // nextWord = true only at start of game or when new word is required
    document.addEventListener("keyup", function(event) {
        if (event.which == 13) {
            console.log("let's Play!");
            if (nextWord) {
                retrieveWord();
                nextWord = false;
            }
            document.getElementById("notification").innerHTML = "Let's Play";
            document.getElementById('notification').style.paddingTop = "18px";
            document.getElementById('clip').src = "assets/images/stage.mp4";
            document.getElementById('fillIt').style.fontSize = "4em";
            document.getElementById('fillIt').style.paddingTop = "28px";
            letsPlay();
        }
    });


    // ********** retrieve new word from wordArr **********

    function retrieveWord() {
        // after function is accessed, nextWord turns false
        nextWord = false;
        // console.log("inside retrieveWord");
        // console.log("word array before retrieve= " + wordArr);
        // resetting variables to empty
        alreadyUsed = [""];
        fillWord = [];
        punches = 0;
        emptyWord = [];
        
		document.getElementById("used").innerHTML = alreadyUsed;
		
        // reset live counts & shows all buttons
        for (l = 0; l < 7; l++) {
            var element = document.getElementById(butt[l]);
            element.style.display = "initial";
        }

        // ********** random word from 20**********
        // prevent random immediate repeat
        do {
            var random = Math.floor(Math.random() * 100 / 5);
        }
        while (compWord == wordArr[random])


        // fills empty array with the amount of lines needed for the word at index 0
        for (i = 0; i < wordArr[random].length; i++) {
            fillWord.push("_");
        }

        compWord = wordArr[random];
        console.log("compWord = " + compWord);

        // converting array into string for display, and display in DOM
        emptyWord = fillWord.join(" ");
        document.getElementById("notification").innerHTML = "Guess the word. Enter a letter";
        document.getElementById("fillIt").innerHTML = emptyWord; // $$$

        // count words played
        wordCount++;
        // console.log("words played= " + wordCount)

        return;
        // }
    } // end function retrieve word

    // *************************** lets play **********************************

    function letsPlay() {
        document.addEventListener("keyup", function(event) {
            // after retrieveWord, nextWord = false thus need opposite to listen to keystrokes
            if (!nextWord) {
                if (event.which >= 65 && event.which <= 90) {
                    userEntry = event.which;
                    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
                    matchLet();
                }
            } // end nextWord check
        }); // end event listener
    }

    // ********** checking for duplicates ********** 

    function duplicated() {
        var store = false;
        // searchs for userGuess inside alreadyUsed array
        for (j = 0; j <= alreadyUsed.length; j++) {
            if (userGuess == alreadyUsed[j]) {
                store = true;
                break;
            }
        }

        // if duplicate store is true and wont affect number of punches
        // otherwise it pushes userGuess letter into alreadyUsed array
        if (store) {
            punches1 = true;
        } else {
            punches1 = false;
            alreadyUsed.push(userGuess);
            document.getElementById("used").innerHTML = alreadyUsed;
            // console.log("storing letter: " + alreadyUsed);
        }
    } // end duplicated

    // ********** matching letters to word ********** 

    function matchLet() {
        // check for duplicate entries
        duplicated();
        
        var match;
        // match testting
        for (i = 0; i < compWord.length; i++) {
            if (userGuess == compWord.charAt(i)) {
                fillWord[i] = userGuess;
                match = 1;
                // punch should not count because it is a match
                punches2 = false;
                // turning array into string separating characters by espace & update in DOM
                emptyWord = fillWord.join(" ");
                document.getElementById("fillIt").innerHTML = emptyWord;
            } // end of if statement
        } // end of for loop

        // could have used if-else but wanted to try switch-case
        switch (match) {
            case 1:
                document.getElementById("notification").innerHTML = "You got it! Choose another letter";
                document.getElementById('notification').style.paddingTop = "18px";
                emptyWord = fillWord.join("");
                if (emptyWord == compWord) {
                    document.getElementById('notification').style.paddingTop = "6px";
                    document.getElementById("notification").innerHTML = "Congrats! You are Safe";
                    var newDiv = document.createElement("div");
                    newDiv.innerHTML = "Press Enter/Return to Continue";
                    notification.appendChild(newDiv);
                    wins++;
                    document.getElementById("wins").innerHTML = wins;
                    nextWord = true;
                } // end of if statement
                return nextWord;
                break;

            default:
                document.getElementById("notification").innerHTML = "No match, try again";
                document.getElementById('notification').style.paddingTop = "18px";
                match = 0;
                punches2 = true;
        }

        // punches count
        if (!punches1 && punches2 && !nextWord) {
            punches++;
            // remove lives aka buttons accordingly
            var b = punches - 1;
            killButt(b);
        }

        if (punches > 6) {
            document.getElementById("notification").innerHTML = "You didn't make it";
            document.getElementById('notification').style.paddingTop = "18px";
            document.getElementById('clip').src = "assets/images/hanged.mp4";
            losses = wordCount - wins;
            document.getElementById("losses").innerHTML = losses;
            nextWord = true;
            return nextWord;
        }

    } // end of function matchLet

    // ********** kill buttons ********** 

    function killButt(b) {
        var element = document.getElementById(butt[b]);
        element.style.display = "none";
    }

