import google.generativeai as genai
genai.configure(api_key="AIzaSyBok_QsXHhwecpfe53v8onBjzFCRWyTM2A")  
model = genai.GenerativeModel("gemini-1.5-flash")
user_input=input("Give input: ")
response = model.generate_content("Act as a lawyer and first give related laws and sections in India and any advice on " + user_input)
essay=response.text
paragraphs = essay.strip().split("\n\n")
paragraphs.pop(0)
updated_essay = "\n\n".join(paragraphs)
print(updated_essay)

