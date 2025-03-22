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
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the Enter key from being pressed
    }
    checkTyping(); // Call the checkTyping function to check the typing progress
});

function checkTyping() {
    const userWordsContainer = document.getElementById('user-words-container');
    const wordsContainer = document.getElementById('words-container');
    
    // Set the height of words-container to match user-words-container
    // wordsContainer.style.height = `${userWordsContainer.offsetHeight + 19}px`;

    const typedText = userWordsContainer.textContent.trim();
    const originalText = wordsContainer.textContent.trim();

    // Split the text into words for comparison
    const typedWords = typedText.split(' ');
    const originalWords = originalText.split(' ');
}

// Load words initially based on the default selected difficulty
loadWords();
