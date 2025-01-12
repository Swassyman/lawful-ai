import os
import streamlit as st
from datetime import datetime
import google.generativeai as genai
from gtts import gTTS
import pygame
# pygame.mixer.init()

genai.configure(api_key="AIzaSyBok_QsXHhwecpfe53v8onBjzFCRWyTM2A")  
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Act as a lawyer and first give related laws and sections in India and any advice on it and dont say As an AI, I cannot provide legal advice." + user_input)

with open("../data/response.txt", "w") as response_file:
    response_file.write(response)