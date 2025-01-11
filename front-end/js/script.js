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

    // Scroll chat window to the bottom after the message
    scrollChatWindowToBottom();

    // Simulate bot response after a short delay
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Bot's response (can be dynamic based on user message)
        const botResponse = "This is a bot response to: " + userMessage;
        appendMessage(botResponse, 'bot');

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
