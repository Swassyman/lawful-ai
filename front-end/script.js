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

    // Simulate bot response after a short delay
    setTimeout(() => {
        const botResponse = "This is a bot response to: " + userMessage;
        appendMessage(botResponse, 'bot');
    }, 1000);
}

function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;
    
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}
