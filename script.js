document.getElementById('diff').addEventListener('change', loadWords);

function loadWords() {
    const difficulty = document.getElementById('diff').value;

    // Fetch the corresponding words from the .txt file
    fetch(`words/${difficulty}.txt`)
        .then(response => response.text())
        .then(data => {
            const wordsArray = data.split('\n').filter(word => word.trim() !== '');
            displayWords(wordsArray);
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
    const userWordsContainer = document.getElementById('user-words-container');
    const wordsContainer = document.getElementById('words-container');
    
    // Set the height of words-container to match user-words-container
    // wordsContainer.style.height = `${userWordsContainer.offsetHeight + 19}px`;

    let typedText = userWordsContainer.textContent.trim();
    const originalText = wordsContainer.textContent.trim();

    // Only add the key if it's a letter
    if (event.key.length == 1 && event.key.match(/[a-zA-Z]/)) {
        console.log(event.key + " is a letter."); // Print out the key for debugging
        typedText += event.key;
    }

    // Split the text into words for comparison
    const typedWords = typedText.split(/\s+/);  // Split by any whitespace
    const originalWords = originalText.split(/\s+/);  // Split by any whitespace

    // print out words for debugging
    console.log(typedWords);
    console.log(originalWords);

    // Check if all words are typed correctly
    let allWordsCorrect = true;
    for (let i = 0; i < originalWords.length; i++) {
        if (typedWords[i] !== originalWords[i]) {
            allWordsCorrect = false;
            break;
        }
    }

    // Display a message if all words are typed correctly
    if (allWordsCorrect && typedWords.length === originalWords.length) {

        document.getElementById('user-words-container').textContent = document.getElementById('words-container').textContent; // Add the key to the words-container
        // alert('You typed all the words correctly!');
    }


}

// Load words initially based on the default selected difficulty
loadWords();