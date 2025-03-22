document.getElementById('diff').addEventListener('change', loadWords);
let currWordIndex = 0;
let currentTime = 0;
let userWordArray = [];
let sentenceArray = [];
let wordsArray2 = [];
let typedText = "";
let speed = document.getElementById('speed');
let accuracy = document.getElementById('accuracy'); 
let timer = document.getElementById('timer');
let timerInterval;
let timeFlag = false;
function stopTimer() {
    clearInterval(timerInterval);
}
function updateTime() {
    currentTime++;
    timer.textContent = currentTime + " seconds";
}

function loadWords() {
    const difficulty = document.getElementById('diff').value;

    // Fetch the corresponding words from the .txt file
    fetch(`words/${difficulty}.txt`)
        .then(response => response.text())
        .then(data => {
            let randIndex;
            sentenceArray = (data.split('\n').filter(word => word.trim() !== ''));
            randIndex = Math.floor(Math.random() * sentenceArray.length);
            sentenceArray = sentenceArray.slice(randIndex, randIndex + 1);
            console.log("Word array, " + sentenceArray);
            //wordsArray = ["something really big"]
            wordsArray2 = sentenceArray[0].split(" ");
            console.log("words array 2", wordsArray2);
            displayWords(sentenceArray);
        })
        .catch(error => {
            console.error('Error loading words:', error);
        });
}

function displayWords(wordsArray) {
    const wordsContainer = document.getElementById('words-container');
    const userWordsContainer = document.getElementById('user-words-container');
    wordsContainer.textContent = wordsArray.join(' ');
    document.getElementById('user-words-container').textContent = '';
    
    userWordsContainer.style.height = `${wordsContainer.offsetHeight - 19}px`;
}

// document.getElementById('user-words-container').addEventListener('input', checkTyping);

// Prevent pressing Enter in user-words-container
document.getElementById('user-words-container').addEventListener('keydown', function(event) {
    const userWordsContainer = document.getElementById('user-words-container');
    const wordsContainer = document.getElementById('words-container');

    // Prevent 'Enter' key press
    if (event.key === 'Enter') {
        event.preventDefault(); 
    }

    // Check if user has typed the entire text and prevent further typing
    if (userWordsContainer.textContent.length >= wordsContainer.textContent.length && event.key !== 'Backspace') {
        event.preventDefault();
    } else {
        if (userWordsContainer.textContent.length == wordsContainer.textContent.length - 1)
            event.preventDefault(); // Prevent further typing if the entire text is already typed
        checkTyping(event); // Call the checkTyping function to check the typing progress
    }
});


function checkTyping(event) {
    if (!timeFlag) {
        timeFlag = true;
        timerInterval = setInterval(updateTime, 1000);
    }
    const userWordsContainer = document.getElementById('user-words-container');
    const wordsContainer = document.getElementById('words-container');
    
    // Set the height of words-container to match user-words-container
    // wordsContainer.style.height = `${userWordsContainer.offsetHeight + 19}px`;

    //let typedText = userWordsContainer.textContent.trim();
    let originalText = wordsContainer.textContent.trim();
    
    if (currWordIndex != (wordsArray2.length-1)) {
        if (event.key == ' ') {
            let currentTypedWord = typedText.trim();
            console.log(currentTypedWord);
            // Add word to userWordArray and increment the index
            userWordArray.push(currentTypedWord);
            console.log("userWordArray", userWordArray);
            currWordIndex++;
            

            //wordsContainer.textContent = userWordArray.join(' ') + " ";
            wordsContainer.innerHTML = "";
            for(let i = 0; i < userWordArray.length; i++) {
                let coloredWord = document.createElement('span');
                coloredWord.textContent = userWordArray[i] + " ";

                // Color the word based on whether it matches the expected word
                if (wordsArray2[i] == userWordArray[i]) {
                    wordsContainer.style.background = "green";
                }
                else {
                    wordsContainer.style.background = "red";
                }

                wordsContainer.appendChild(coloredWord); // Add the word to wordsContainer
            }

            for (let i = currWordIndex; i < wordsArray2.length; i ++) {
                wordsContainer.textContent += wordsArray2[i] + " ";
            }
            typedText = "";
        } 
        //  && event.key.match(/[a-zA-Z]/)
        else if(event.key.length == 1) {
            typedText += event.key;
        }
    }
    else {
        stopTimer();
        calculateAccuracy();
        calculateSpeed();
    }
}
    // Split the text into words for comparison
    //const typedWords = typedText.split(/\s+/);  // Split by any whitespace
    //const originalWords = originalText.split(/\s+/);  // Split by any whitespace

    // print out words for debugging
    // console.log(typedWords);
    // console.log(originalWords);

    // Check if all words are typed correctly
    // let allWordsCorrect = true;
    // for (let i = 0; i < originalWords.length; i++) {
    //     if (typedWords[i] !== originalWords[i]) {
    //         allWordsCorrect = false;
    //         break;
    //     }
    // }

    // // Display a message if all words are typed correctly
    // if (allWordsCorrect && typedWords.length === originalWords.length) {

    //     document.getElementById('user-words-container').textContent = document.getElementById('words-container').textContent; // Add the key to the words-container
    //     // alert('You typed all the words correctly!');
    // }

// Load words initially based on the default selected difficulty
loadWords();

function calculateAccuracy() {  
    let correctCount = 1.0;
    for(let i = 0; i < userWordArray.length; i++) { 
        if (userWordArray[i] == wordsArray2[i]) {
            correctCount++;
        }
    }
    let x = (correctCount / wordsArray2.length) * 100;
    x = x.toFixed(2);
    accuracy.textContent = x + "%";
}
function calculateSpeed() {
    let correctCount = 1.0;
    for(let i = 0; i < userWordArray.length; i++) { 
        if (userWordArray[i] == wordsArray2[i]) {
            correctCount++;
        }
    }
    let wordsPerMinute = (correctCount / currentTime) * 60;
    speed.textContent = wordsPerMinute.toFixed(2) + " WPM";
}
