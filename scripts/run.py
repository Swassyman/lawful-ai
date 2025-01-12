import streamlit as st
from datetime import datetime
import google.generativeai as genai
from gtts import gTTS
import pygame

pygame.mixer.init()

# Function to generate chatbot response
def chatbot_response(user_input):
    genai.configure(api_key="AIzaSyBok_QsXHhwecpfe53v8onBjzFCRWyTM2A")  # Add your API key here
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("In basic text format with no bold, italics or anything, Act as a lawyer and first give related laws and sections in India and any advice on " + user_input)
    essay=response.text
    paragraphs = essay.strip().split("\n\n")
    paragraphs.pop(0)
    updated_essay = "\n\n".join(paragraphs)
    return updated_essay
    

# Streamlit app
def main():
    st.set_page_config(page_title="Legal Chatbot", page_icon="⚖️", layout="wide")
    
    # Custom CSS for aesthetics
    st.markdown(
        """
        <style>
        body {
            background-color:rgb(56, 47, 47);
            font-family: 'Arial', sans-serif;
        }
        .stButton>button {
            background-color: #0073e6;
            color: white;
            font-size: 16px;
            padding: 12px 30px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .stButton>button:hover {
            background-color: #005bb5;
        }
        .user-message {
            background-color:rgb(56, 47, 47);
            border-radius: 15px;
            padding: 10px 15px;
            margin: 5px 0;
            max-width: 80%;
            align-self: flex-start;
        }
        .bot-message {
            background-color:rgb(50, 40, 40);
            border-radius: 15px;
            padding: 10px 15px;
            margin: 5px 0;
            max-width: 80%;
            align-self: flex-end;
        }
        .chat-history {
            max-height: 500px;
            overflow-y: auto;
            margin-bottom: 20px;
        }
        .message-time {
            font-size: 12px;
            color: #888;
        }
        </style>
        """, unsafe_allow_html=True)

    # Title
    st.title("Legal Chatbot ⚖️")
    st.markdown("### Your personal legal assistant")

    # Initialize session state for messages
    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Initialize session state for input
    if "user_input" not in st.session_state:
        st.session_state.user_input = ""

    # Display chat history (scrollable)
    st.write("### Chat History")
    chat_container = st.empty()  # This will be the dynamic container for chat history

    with chat_container.container():
        # Display each message in the chat history
        for message in st.session_state.messages:
            sender, text, time = message
            if sender == "user":
                st.markdown(f'<div class="user-message">{text}<div class="message-time">{time}</div></div>', unsafe_allow_html=True)
            else:
                st.markdown(f'<div class="bot-message">{text}<div class="message-time">{time}</div></div>', unsafe_allow_html=True)

    # Force auto-scroll by placing an empty element at the bottom
    st.markdown("<div style='height:50px'></div>", unsafe_allow_html=True)

    st.write("---")

    # Input from the user
    user_input = st.text_input("Type your message here:", value=st.session_state.user_input, key="input_box", max_chars=500)

    # Process input when "Send" button is clicked
    if st.button("Send"):
        if user_input.strip():  # Ignore empty messages
            # Add user message to history
            current_time = datetime.now().strftime("%H:%M:%S")
            st.session_state.messages.append(("user", user_input, current_time))

            # Get bot response and add to history
            bot_response = chatbot_response(user_input)
            st.session_state.messages.append(("bot", bot_response, current_time))

            # Clear the input box by resetting session state
            tts = gTTS(bot_response, lang='en')
            tts.save("output.mp3")
            pygame.mixer.music.load("output.mp3")
            pygame.mixer.music.play()

            st.session_state.user_input = ""

while pygame.mixer.music.get_busy():
    pass

if __name__ == "__main__":
    main()