document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();
    const welcomeMessage = document.getElementById('welcome-message');

    // If user sends an empty message, return without doing anything
    if (userMessage === "") return;

    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }

    appendMessage(userMessage, 'user');
    inputField.value = ''; // Clear input field
    displayTypingIndicator();
    scrollChatWindowToBottom();

    // Send input to the Python backend and get response
    try {
        const response = await fetch('http://localhost:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: userMessage }),
        });
        

        const data = await response.json();
        removeTypingIndicator();

        if (data.response) {
            appendMessage(data.response, 'bot');
        } else {
            appendMessage('Error: Unable to process your request.', 'bot');
        }

        scrollChatWindowToBottom();
    } catch (error) {
        console.error('Error during communication with Python:', error);
        removeTypingIndicator();
        appendMessage('Error: Unable to process your request.', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
}

function displayTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Bot is typing...";
    chatWindow.appendChild(typingIndicator);
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
document.getElementById('dropdown-btn').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Handle Text to Speech Toggle
document.getElementById('tts-toggle').addEventListener('change', function () {
    const ttsEnabled = this.checked;
    if (ttsEnabled) {
        console.log('Text to Speech Enabled');
        // Add text-to-speech functionality here (you can use SpeechSynthesis API)
    } else {
        console.log('Text to Speech Disabled');
    }
});

// Handle Language Selection
document.getElementById('language-select').addEventListener('change', function () {
    const selectedLanguage = this.value;
    console.log('Selected Language:', selectedLanguage);
    // Add language change functionality here
});
