import requests

url = "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium"

payload = {
    "enable_google_results": "true",
    "enable_memory": True,
    "input_text": """
    send one multiple choice question with four options, related to the topic
    """
    }
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "4259d828-4fb4-4e2c-9a45-ed18e2d86cab"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)