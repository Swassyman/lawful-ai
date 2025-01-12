import google.generativeai as genai
import json

with open("../data/prompt_response.json", "r") as file:
    data = json.load(file)

user_input=data['prompt']
genai.configure(api_key="AIzaSyBok_QsXHhwecpfe53v8onBjzFCRWyTM2A")  
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Act as a lawyer and first give related laws and sections in India and any advice on it and dont say As an AI, I cannot provide legal advice." + user_input)


file_path = "../data/prompt_response.json"

# Read, update, and overwrite the file
with open(file_path, "r+") as file:
    data = json.load(file)  # Load existing JSON data
    data["response"] = response.text  
    file.seek(0)  # Move cursor to the beginning of the file
    json.dump(data, file, indent=4)  # Write updated JSON
    file.truncate()  # Remove any remaining old content


