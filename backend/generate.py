import os
import json
from dotenv import load_dotenv
import openai

# from texttospeech import TextToSpeech

load_dotenv()


def clear_text(text):
    a = text.replace("\n", " ")
    b = a.split()
    c = " ".join(b)

    return c

def execute(question):
    prompt = question

    openai.api_key = os.getenv('OPENAI_KEY')
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=512,
        temperature=0.8,
    )

    json_object = response

    # Convert the JSON object to a JSON string
    json_string = json.dumps(json_object)

    # Parse the JSON string using json.loads()
    parsed_json = json.loads(json_string)

    text = parsed_json['choices'][0]['text']
    cleared_text = clear_text(text)
    
    return cleared_text


# Usage:

# if __name__ == "__main__":

#     a = execute("Hello")

#     print(a)

    # to_speech(a)
