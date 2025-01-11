// JavaScript to handle message sending and appending to the chat window

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    // Append the user's message to the chat window
    appendMessage(userMessage, 'user');

    // Clear input field
    inputField.value = '';

    // Show typing indicator for bot
    displayTypingIndicator();

    // Simulate bot response after a short delay
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Bot's response (can be dynamic based on user message)
        const botResponse = "This is a bot response to: " + userMessage;
        appendMessage(botResponse, 'bot');
    }, 1500);
}

function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;
    
    chatWindow.appendChild(messageElement);
    scrollToBottom(); // Scroll to the bottom after each message
}

function displayTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Bot is typing...";

    // Append typing indicator at the bottom of the chat window
    chatWindow.appendChild(typingIndicator);
    
    scrollToBottom(); // Scroll to the bottom so typing indicator is visible
}

function removeTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    if (typingIndicator) {
        chatWindow.removeChild(typingIndicator);
    }
}

// Function to ensure the chat window scrolls to the bottom
function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}
