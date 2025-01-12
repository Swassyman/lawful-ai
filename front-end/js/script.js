document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value.trim();
  const welcomeMessage = document.getElementById("welcome-message");

  // If user sends an empty message, return without doing anything
  if (userMessage === "") return;

  if (welcomeMessage) {
    welcomeMessage.style.display = "none";
  }

  appendMessage(userMessage, "user");
  inputField.value = ""; // Clear input field
  displayTypingIndicator();
  scrollChatWindowToBottom();

  // Handle language selection
  const selectedLanguage = document.getElementById("language-select").value;
  console.log("Selected Language:", selectedLanguage);
  // You can add functionality to change language here if needed

  // Handle Text-to-Speech (TTS) functionality
  const ttsEnabled = document.getElementById("ttsToggle").checked;
  console.log("Text-to-Speech Enabled:", ttsEnabled);

  try {
    // Send user input to Flask backend
    const response = await fetch("http://127.0.0.1:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userMessage, tts: ttsEnabled }),
    });

    const data = await response.json();
    removeTypingIndicator();

    if (data.response) {
      appendMessage(data.response, "bot");
    } else {
      appendMessage("Error: Unable to process your request.", "bot");
    }

    scrollChatWindowToBottom();
  } catch (error) {
    console.error("Error during communication with Flask:", error);
    removeTypingIndicator();
    appendMessage("Error: Unable to process your request.", "bot");
    alert("Error: " + error.message); // Show error message in a popup
  }
}

function appendMessage(message, sender) {
  const chatWindow = document.getElementById("chat-window");
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender + "-message");
  messageElement.innerHTML = message;
  chatWindow.appendChild(messageElement);
}

function displayTypingIndicator() {
  const chatWindow = document.getElementById("chat-window");
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("typing-indicator");
  typingIndicator.textContent = "Bot is typing...";
  chatWindow.appendChild(typingIndicator);
  typingIndicator.style.display = "block";
}

function removeTypingIndicator() {
  const chatWindow = document.getElementById("chat-window");
  const typingIndicator = document.querySelector(".typing-indicator");
  if (typingIndicator) {
    chatWindow.removeChild(typingIndicator);
  }
}

function scrollChatWindowToBottom() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Toggle dropdown visibility when settings button is clicked
document.getElementById("dropdown-btn").addEventListener("click", function () {
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.style.display =
    dropdownMenu.style.display === "flex" ? "none" : "flex";
});

// Handle Text-to-Speech Toggle
document.getElementById("ttsToggle").addEventListener("change", function () { 
  
  const ttsEnabled = this.checked;
  if (ttsEnabled) {
    console.log("Text to Speech Enabled");
    // Add text-to-speech functionality here (you can use SpeechSynthesis API)
  } else {
    console.log("Text to Speech Disabled");
  }
});
