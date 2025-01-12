const filePath = 'data/prompt_response.json'; // Path to your JSON file
let jsonData = null; // Holds the loaded JSON data

// Function to load JSON data from a file
async function loadJSONFile() {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        jsonData = await response.json();
        console.log('Loaded JSON:', jsonData);
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

// Function to save JSON data back to the file (via download for local files)
function saveJSONFile(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prompt_response.json';
    link.click();
}

// Function to handle chat interaction
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    inputField.value = ''; // Clear input field
    displayTypingIndicator();

    setTimeout(() => {
        try {
            const botResponse = processUserMessage(userMessage);
            removeTypingIndicator();
            appendMessage(botResponse, 'bot');

            // Update the JSON history and save it
            if (jsonData) {
                jsonData.history = jsonData.history || [];
                jsonData.history.push({ user: userMessage, bot: botResponse });
                saveJSONFile(jsonData);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            removeTypingIndicator();
            appendMessage('Error: Unable to process your request.', 'bot');
        }
    }, 1000); // Simulate typing delay
}

// Function to process user messages
function processUserMessage(userMessage) {
    if (jsonData && jsonData.responses && jsonData.responses[userMessage]) {
        return jsonData.responses[userMessage];
    } else {
        return "Sorry, I don't have an answer for that.";
    }
}

// Function to append messages to the chat window
function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
}

// Function to display a typing indicator
function displayTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Bot is typing...";
    chatWindow.appendChild(typingIndicator);
}

// Function to remove the typing indicator
function removeTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        chatWindow.removeChild(typingIndicator);
    }
}

// Event listener for the Send button
document.getElementById('send-btn').addEventListener('click', function () {
    sendMessage();
});

// Event listener for the Enter key
document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Toggle dropdown visibility
document.getElementById('dropdown-btn').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Handle Text-to-Speech toggle
document.getElementById('tts-toggle').addEventListener('change', function () {
    const ttsEnabled = this.checked;
    if (ttsEnabled) {
        console.log('Text to Speech Enabled');
        // Add text-to-speech functionality here (e.g., SpeechSynthesis API)
    } else {
        console.log('Text to Speech Disabled');
    }
});

// Handle language selection
document.getElementById('language-select').addEventListener('change', function () {
    const selectedLanguage = this.value;
    console.log('Selected Language:', selectedLanguage);
    // Add language change functionality here
});

// Load the JSON file at the start
loadJSONFile();
