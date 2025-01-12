from flask import Flask, request, jsonify
import json
import os
import google.generativeai as genai

from flask_cors import CORS  # To handle CORS if needed
print(dir(genai))
app = Flask(__name__)
CORS(app)  # Allow all origins, adjust for security if needed
import google.generativeai as genai



def chatbot_response(user_input):
    # Hardcoded API key
    try:
        genai.configure(api_key="AIzaSyBok_QsXHhwecpfe53v8onBjzFCRWyTM2A")

        # Directly create the model, passing the API key and model name
        model = genai.GenerativeModel("gemini-1.5-flash")

        
        # Generate content from the model
        response = model.generate_content(f"Act as a lawyer and first give related laws and sections in India and any advice on {user_input} .dont say things like As an AI, I cannot provide legal advice.Give in paragraphs.Try to sympathise with the humans like a lawyer rather than just giving information. Provide at the end of the response give references and sources in an anchor tag")
        formatted_response = response.text.replace("**", "").replace("*", "")
        paragraphs = formatted_response.split(". ")
        paragraph_text = "<p>" + "</p><p>".join(paragraphs) + "</p>"

        return paragraph_text
    except Exception as e:
        return f"Error generating response: {str(e)}"


@app.route('/process', methods=['POST'])
def process_input():
    # Log incoming data
    data = request.get_json()
    print("Received data:", data)  # This will print the incoming data to the terminal

    user_message = data.get('text', '')
    print("User message:", user_message)  # This will print the user's message

    if not user_message:
        print("No user message received.")  # Log if the message is empty
        return jsonify({"response": "No input provided"}), 400

    # Get chatbot response based on the user's message
    bot_response = chatbot_response(user_message)
    print("Bot response:", bot_response)  # This will print the bot's response

    return jsonify({"response": bot_response})

# Update JSON file with user input
@app.route('/update_json', methods=['POST'])
def update_json():
    data = request.get_json()
    file_path = "prompt_response.json"

    # Ensure the file exists or create it if not present
    if not os.path.exists(file_path):
        try:
            with open(file_path, "w") as file:
                json.dump({}, file, indent=4)  # Initialize with an empty dictionary
        except Exception as e:
            return jsonify({"error": f"Failed to create file: {str(e)}"}), 500

    try:
        with open(file_path, "w") as file:
            json.dump(data, file, indent=4)
        return jsonify({"message": "JSON file updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
