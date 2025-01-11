from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from datasets import load_dataset

# Load the dataset from Hugging Face
dataset = load_dataset("nisaar/Constitution_Of_India_Instruction_Set")
# Load pre-trained model and tokenizer
model_name = "microsoft/DialoGPT-medium"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Set the model in evaluation mode
model.eval()

# Function to generate response from the chatbot
def chat():
    print("Chatbot: Hello! Type 'quit' to end the conversation.")
    chat_history_ids = None  # Initialize chat history

    while True:
        # Get user input
        user_input = input("You: ")

        if user_input.lower() == 'quit':
            print("Chatbot: Goodbye!")
            break

        # Encode user input, add eos_token and return a tensor in the shape of the model input
        new_user_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')

        # Append the new user input tokens to the chat history (if there is one)
        bot_input_ids = new_user_input_ids if chat_history_ids is None else torch.cat([chat_history_ids, new_user_input_ids], dim=-1)

        # Generate a response from the chatbot model
        chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id, top_k=50, top_p=0.95, temperature=0.7)

        # Get the generated text from the model's output
        chat_output = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

        # Print the response
        print(f"Chatbot: {chat_output}")

if __name__ == "__main__":
    chat()
