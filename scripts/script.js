document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();
    const welcomeMessage = document.getElementById('welcome-message'); // Get the welcome message element

    // If user sends an empty message, return without doing anything
    if (userMessage === "") return;

    // Hide the welcome message if it's still visible
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }

    // Append the user's message to the chat window
    appendMessage(userMessage, 'user');

    // Clear input field
    inputField.value = '';

    // Show typing indicator for bot
    displayTypingIndicator();

    // Scroll chat window to the bottom after the message
    scrollChatWindowToBottom();

    const { exec } = require('child_process');
    const fs = require('fs');
    const path = require('path');
    
    const userInput = userMessage; // Replace this with the actual user input
    
    exec(`python3 scripts/run.py "${userInput}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      
      const responseFilePath = path.resolve(__dirname, '../data/response.txt');
    
      fs.readFile(responseFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const response = data.trim();
        console.log(`Response from Python: ${response}`);
      });
    });

    // Simulate bot response after a short delay
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();

        // Bot's response (can be dynamic based on user message)
        // const botResponse = "This is a bot response to: " + userMessage;
        appendMessage(response, 'bot');

        // Scroll chat window to the bottom after the bot's response
        scrollChatWindowToBottom();

        // Add a new law reference (bubble) after bot response
        appendLawReference("Law reference related to: " + userMessage);
    }, 1500);
}

function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');

    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;

    chatWindow.appendChild(messageElement);
}

function appendLawReference(reference) {
    const lawReferences = document.getElementById('law-references');

    const referenceBubble = document.createElement('div');
    referenceBubble.classList.add('law-bubble');
    referenceBubble.textContent = reference;

    lawReferences.appendChild(referenceBubble);
    lawReferences.scrollTop = lawReferences.scrollHeight; // Scroll to the bottom
}

function displayTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Bot is typing...";

    // Add the typing indicator before the bot's response
    chatWindow.appendChild(typingIndicator);

    // Show typing indicator (it was hidden by default)
    typingIndicator.style.display = 'block';
}

function removeTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.querySelector('.typing-indicator');

    if (typingIndicator) {
        chatWindow.removeChild(typingIndicator);
    }
}

function scrollChatWindowToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// Toggle dropdown visibility when settings button is clicked
document.getElementById('dropdown-btn').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Handle Text to Speech Toggle
document.getElementById('tts-toggle').addEventListener('change', function() {
    const ttsEnabled = this.checked;
    if (ttsEnabled) {
        console.log('Text to Speech Enabled');
        // Add text-to-speech functionality here (you can use SpeechSynthesis API)
    } else {
        console.log('Text to Speech Disabled');
    }
});


// Handle Language Selection
document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    console.log('Selected Language:', selectedLanguage);
    // Add language change functionality here
});
