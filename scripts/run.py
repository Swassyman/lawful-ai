from flask import Flask, request, jsonify, send_file
import os
import json
import google.generativeai as genai
from gtts import gTTS
from flask_cors import CORS
import pygame

app = Flask(__name__)
CORS(app)  # Allow all origins, adjust for security if needed

# Configure Generative AI
genai.configure(api_key="AIzaSyB2iGCt4hXcOfPetZ1TO41a0mYRyJ7hSVo")

# Function to generate chatbot response
def chatbot_response(user_input):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"Act as a lawyer and provide advice on {user_input}")
        return response.text.replace("**", "").replace("*", "")
    except Exception as e:
        return f"Error generating response: {str(e)}"

@app.route('/process', methods=['POST'])
def process_input():
    data = request.get_json()
    user_message = data.get('text', '')
    tts_enabled = data.get('tts', False)
    
    
    print("ghj")
    print(user_message)

    print(tts_enabled)
    print("ghj")

    if not user_message:
        return jsonify({"response": "No input provided"}), 400

    bot_response = chatbot_response(user_message)

    if tts_enabled:
        try:
            if not pygame.mixer.get_init():
                pygame.mixer.init()
            # Generate TTS audio
            audio_path = 'output.mp3'
            tts = gTTS(bot_response)
            tts.save(audio_path)
            pygame.mixer.music.load('output.mp3')
            pygame.mixer.music.play()
            # Return audio file URL
            return jsonify({"response": bot_response, "audio_url": f"http://127.0.0.1:5000/audio"}), 200
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return jsonify({"error": str(e)}), 500
    return jsonify({"response": bot_response})

@app.route('/audio', methods=['GET'])
def get_audio():
    audio_path = 'output.mp3'
    if os.path.exists(audio_path):
        return send_file(audio_path, mimetype='audio/mpeg')
    return jsonify({"error": "Audio file not found"}), 404

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
